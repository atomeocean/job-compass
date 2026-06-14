#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
根据目标目录下的全部Markdown 文件自动生成overview.md文件。
本地使用，自动生成指定目录的overview文件
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from datetime import date
from pathlib import Path
from typing import Any

REPO_IMPORT_ROOT = Path(__file__).resolve().parents[1]
if str(REPO_IMPORT_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_IMPORT_ROOT))

from scripts.utils.path_utils import get_project_root

try:
    import yaml
except ModuleNotFoundError:
    yaml = None


# 获取项目根目录
REPO_ROOT = get_project_root()

OVERVIEW_FILENAME = "overview.md"
INDEX_FILENAME = "index.md"
DOC_ROOTS = ("docs/zhHans", "docs/en")
KIND_FOLDER = "folder"
KIND_ARTICLE = "article"

LOCALE_ZH = "zhHans"
LOCALE_EN = "en"
DEFAULT_LOCALE = LOCALE_ZH

# 不同语言目录下 overview.md 外层文案。条目本身的 title/description
# 来自各文件的 frontmatter，这里只负责包裹文案与缺省描述。
OVERVIEW_TEXT = {
    LOCALE_ZH: {
        "frontmatter_title": "目录概述",
        "frontmatter_description": "本页介绍当前目录下的所有Markdown文件及其简要说明。",
        "heading": "目录概述",
        "intro": "以下为该目录下所有的Markdown文件及子目录的介绍：",
        "note_title": "> [!NOTE] 请通过Script生成此文件",
        "note_body": "> 本文件只能通过 generate_folder_overview Script 构建，不能直接修改",
        "description_fallback": "该文件主要介绍 {title} 的相关内容。",
    },
    LOCALE_EN: {
        "frontmatter_title": "Directory Overview",
        "frontmatter_description": (
            "This page introduces all Markdown files in the current "
            "directory with brief descriptions."
        ),
        "heading": "Directory Overview",
        "intro": (
            "Below is an introduction to all Markdown files and "
            "subdirectories in this directory:"
        ),
        "note_title": "> [!NOTE] Please generate this file via the script",
        "note_body": (
            "> This file can only be built via the generate_folder_overview "
            "script and must not be edited directly."
        ),
        "description_fallback": "This file mainly introduces content related to {title}.",
    },
}


def detect_locale(directory: Path) -> str:
    """
    根据目录路径判断语言：位于 docs/en 下返回英文，否则默认中文。
    """
    relative = relative_to_repo(directory)
    if relative == "docs/en" or relative.startswith("docs/en/"):
        return LOCALE_EN
    return DEFAULT_LOCALE


def parse_simple_frontmatter(frontmatter: str) -> dict[str, Any]:
    """
    PyYAML 不可用时的轻量 fallback，仅解析本脚本需要的单行字段。
    """
    metadata: dict[str, Any] = {}
    for line in frontmatter.splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith("#") or ":" not in stripped:
            continue

        key, value = stripped.split(":", 1)
        key = key.strip()
        if key not in {"title", "description", "order"}:
            continue

        value = value.strip()
        if not value or value in {"|", ">"}:
            continue

        if len(value) >= 2 and value[0] == value[-1] and value[0] in {"'", '"'}:
            value = value[1:-1]

        metadata[key] = value

    return metadata


# 解析其他文件的frontmatter
def extract_frontmatter(file_path: Path) -> dict[str, Any]:
    """
    从Markdown文件中提取YAML frontmatter的title和description。
    如果未找到，则返回None。
    """
    try:
        content = file_path.read_text(encoding='utf-8')
    except FileNotFoundError:
        return {}

    match = re.match(r'^---\s*\n(.*?)\n---\s*\n', content, re.DOTALL)
    if not match:
        return {}

    frontmatter = match.group(1)
    if yaml is None:
        return parse_simple_frontmatter(frontmatter)

    try:
        metadata = yaml.safe_load(frontmatter)
        return metadata if isinstance(metadata, dict) else {}
    except yaml.YAMLError:
        return {}


def normalize_order(value: Any) -> int:
    """
    将 frontmatter 中的 order 转为整数，无法解析时使用 0。
    """
    if value is None or value == "":
        return 0

    try:
        return int(value)
    except (TypeError, ValueError):
        try:
            return int(float(str(value)))
        except (TypeError, ValueError):
            return 0


def build_overview_items(
    directory: Path, locale: str = DEFAULT_LOCALE
) -> list[dict[str, Any]]:
    """
    扫描指定目录，返回 overview 组件需要的数据。
    locale 决定缺省描述使用的语言。
    """
    text = OVERVIEW_TEXT.get(locale, OVERVIEW_TEXT[DEFAULT_LOCALE])
    overview_items: list[dict[str, Any]] = []

    for entry in directory.iterdir():
        if entry.is_dir():
            source_path = entry / INDEX_FILENAME
            if not source_path.exists():
                continue

            relative_path = Path(entry.name) / INDEX_FILENAME
            fallback_title = entry.name
            kind = KIND_FOLDER
        elif (
            entry.is_file()
            and entry.suffix == ".md"
            and entry.name not in {OVERVIEW_FILENAME, INDEX_FILENAME}
        ):
            source_path = entry
            relative_path = Path(entry.name)
            fallback_title = entry.stem
            kind = KIND_ARTICLE
        else:
            continue

        metadata = extract_frontmatter(source_path)
        title = str(metadata.get("title") or fallback_title)
        description = str(
            metadata.get("description")
            or text["description_fallback"].format(title=title)
        )
        order = normalize_order(metadata.get("order"))

        overview_items.append({
            "title": title,
            "description": description,
            "href": f"./{relative_path.as_posix()}",
            "order": order,
            "kind": kind,
        })

    kind_order = {KIND_FOLDER: 0, KIND_ARTICLE: 1}
    return sorted(
        overview_items,
        key=lambda item: (
            item["order"],
            kind_order.get(item["kind"], 99),
            item["title"].casefold(),
            item["href"],
        ),
    )


def render_overview_content(
    items: list[dict[str, Any]],
    last_updated: str,
    locale: str = DEFAULT_LOCALE,
) -> str:
    """
    将 overview 数据渲染成 VitePress Markdown。
    locale 决定外层文案（标题、说明、提示）使用的语言。
    """
    text = OVERVIEW_TEXT.get(locale, OVERVIEW_TEXT[DEFAULT_LOCALE])
    json_items = json.dumps(items, ensure_ascii=False, indent=2).replace("</", "<\\/")

    content_lines = [
        "---",
        f"title: {text['frontmatter_title']}",
        f"description: {text['frontmatter_description']}",
        f"lastUpdated: {last_updated}",
        "---",
        "",
        "<script setup>",
        f"const overviewItems = {json_items}",
        "</script>",
        "",
        f"# {text['heading']}",
        "",
        text["intro"],
        "",
        '<DirectoryOverview :items="overviewItems" />',
        "",
        text["note_title"],
        text["note_body"],
        "",
    ]

    return "\n".join(content_lines)


def read_existing_overview(overview_path: Path) -> str | None:
    if not overview_path.exists():
        return None
    try:
        return overview_path.read_text(encoding="utf-8")
    except OSError:
        return None


def parse_existing_items(content: str) -> list[dict[str, Any]] | None:
    """
    解析已存在 overview.md 中的 overviewItems 数组，失败时返回 None。
    """
    match = re.search(r"const overviewItems = (.*?)\n</script>", content, re.DOTALL)
    if not match:
        return None

    # render_overview_content 会把 "</" 转义成 "<\/"，json 能原生解析 \/。
    try:
        items = json.loads(match.group(1).strip())
    except json.JSONDecodeError:
        return None

    return items if isinstance(items, list) else None


def existing_overview_is_current(
    overview_path: Path, items: list[dict[str, Any]], locale: str
) -> bool:
    """
    已存在文件的条目与外层语言均与目标一致时返回 True，用于跳过写入，
    避免定时任务产生空 diff（忽略每天变化的 lastUpdated）。
    语言不一致（如英文目录里残留中文外层文案）时会返回 False 以触发重写。
    """
    content = read_existing_overview(overview_path)
    if content is None:
        return False

    if parse_existing_items(content) != items:
        return False

    text = OVERVIEW_TEXT.get(locale, OVERVIEW_TEXT[DEFAULT_LOCALE])
    # 用 frontmatter title 作为语言标记，语言切换时强制重写。
    expected_title_line = f"title: {text['frontmatter_title']}"
    return expected_title_line in content.splitlines()[:5]


def generate_overview_for_directory(directory: Path, dry_run: bool = False) -> bool:
    """
    扫描指定目录，生成/更新overview.md文件
    """
    if not directory.exists() or not directory.is_dir():
        print(f"❌ 目录不存在: {directory}")
        return False

    overview_path = directory / OVERVIEW_FILENAME
    locale = detect_locale(directory)
    items = build_overview_items(directory, locale)

    if dry_run:
        print(f"DRY RUN: {relative_to_repo(directory)} ({locale}) -> {len(items)} items")
        print(json.dumps(items, ensure_ascii=False, indent=2))
        return True

    # 条目和外层语言均未变化时跳过写入：保证脚本幂等，定时任务不产生空 diff。
    if existing_overview_is_current(overview_path, items, locale):
        print(f"ℹ️ 无变化，跳过: {relative_to_repo(overview_path)}")
        return True

    last_updated = date.today().isoformat()
    overview_path.write_text(
        render_overview_content(items, last_updated, locale), encoding="utf-8"
    )
    print(f"✅ 生成完成: {relative_to_repo(overview_path)}")
    return True


def relative_to_repo(path: Path) -> str:
    try:
        return path.relative_to(REPO_ROOT).as_posix()
    except ValueError:
        return path.as_posix()


def resolve_directory_arg(directory: str) -> Path:
    path = Path(directory).expanduser()
    if not path.is_absolute():
        path = REPO_ROOT / path

    resolved_path = path.resolve()
    try:
        resolved_path.relative_to(REPO_ROOT)
    except ValueError as exc:
        raise ValueError(f"目录必须位于项目内: {directory}") from exc

    if not resolved_path.exists() or not resolved_path.is_dir():
        raise ValueError(f"目录不存在: {directory}")

    return resolved_path


def discover_overview_directories() -> list[Path]:
    overview_dirs: set[Path] = set()
    for root in DOC_ROOTS:
        root_path = REPO_ROOT / root
        if not root_path.exists():
            continue

        overview_dirs.update(
            overview_file.parent
            for overview_file in root_path.rglob(OVERVIEW_FILENAME)
            if overview_file.is_file()
        )

    return sorted(overview_dirs, key=lambda path: relative_to_repo(path))


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="生成/更新指定文档目录下的 overview.md 文件。"
    )
    parser.add_argument(
        "directories",
        nargs="*",
        help="需要生成 overview.md 的目录路径，相对于项目根目录。",
    )
    parser.add_argument(
        "--all",
        action="store_true",
        dest="generate_all",
        help="重新生成 docs/zhHans 和 docs/en 下所有已存在的 overview.md。",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="只打印目标目录和生成数据，不写入文件。",
    )

    args = parser.parse_args()

    if args.generate_all and args.directories:
        parser.error("--all 不能和目录参数同时使用。")

    if not args.generate_all and not args.directories:
        parser.print_help()

    return args


def main() -> int:
    args = parse_args()
    if not args.generate_all and not args.directories:
        return 0

    try:
        directories = (
            discover_overview_directories()
            if args.generate_all
            else [resolve_directory_arg(directory) for directory in args.directories]
        )
    except ValueError as exc:
        print(f"❌ {exc}")
        return 1

    if not directories:
        print("⚠️ 未找到需要生成 overview.md 的目录。")
        return 0

    success = True
    for directory in directories:
        success = generate_overview_for_directory(directory, args.dry_run) and success

    return 0 if success else 1


if __name__ == "__main__":
    raise SystemExit(main())

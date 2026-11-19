"""
同步文档最后更新时间的脚本
为/docs目录下所有Markdown文档的frontmatter添加 lastUpdated
lastUpdated 为该文档最后一次 git 提交的日期
"""

import os
import subprocess
import logging
from pathlib import Path
import re
from scripts.utils.logging_utils import setup_logging

setup_logging()

# 项目根目录的深度（从当前脚本目录向上追溯的层级数）
PROJECT_ROOT_DEPTH = 1
PROJECT_ROOT = Path(__file__).resolve().parents[PROJECT_ROOT_DEPTH]

# docs目录路径
DOCS_DIR_PATH = PROJECT_ROOT / "docs"

# 给 agent 读的说明文件，不是站点页面，不加 createdDate / lastUpdated
SKIP_NAMES = {"CLAUDE.md", "AGENTS.md"}


def get_file_last_updated_date(file_path):
    """
    使用 git log 获取文件最后一次提交的日期，只返回 YYYY-MM-DD 格式。
    """
    try:
        result = subprocess.check_output(
            ['git', 'log', '-1', '--format=%ai', '--', file_path],
            text=True
        )
        if result.strip():
            return result.strip()[:10]
        return None
    except subprocess.CalledProcessError:
        return None


def update_frontmatter(file_path, last_updated):
    """
    修改 Markdown 文件顶部的 frontmatter，添加 lastUpdated。
    """
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    frontmatter_pattern = re.compile(r"^---\n(.*?)\n---", re.DOTALL)

    if content.startswith("---"):
        match = frontmatter_pattern.match(content)
        if match:
            frontmatter = match.group(1)
            if "lastUpdated:" not in frontmatter:
                new_frontmatter = frontmatter + f"\nlastUpdated: {last_updated}"
                content = content.replace(match.group(0), f"---\n{new_frontmatter}\n---", 1)
            else:
                # 如果已有 lastUpdated，就更新它
                new_frontmatter = re.sub(
                    r"lastUpdated:\s*.*",
                    f"lastUpdated: {last_updated}",
                    frontmatter
                )
                content = content.replace(match.group(0), f"---\n{new_frontmatter}\n---", 1)
    else:
        # 没有 frontmatter，则新建
        content = f"---\nlastUpdated: {last_updated}\n---\n\n{content}"

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)


def walk_docs(dir_path):
    """遍历/docs目录下所有 Markdown 文件，更新 frontmatter"""
    for root, _, files in os.walk(dir_path):
        for file in files:
            if file.endswith(".md") and file not in SKIP_NAMES:
                file_path = os.path.join(root, file)
                last_updated = get_file_last_updated_date(file_path)
                if last_updated:
                    update_frontmatter(file_path, last_updated)
                    logging.info(f"✅ Updated: {file_path} -> {last_updated}")
                else:
                    logging.error(f"❌ 更新失败: {file_path}")


def main():
    logging.info("🚀 markdown文档添加 lastUpdated 开始...")
    walk_docs(DOCS_DIR_PATH)
    logging.info("🎉 markdown文档添加 lastUpdated 完成！")


if __name__ == "__main__":
    main()

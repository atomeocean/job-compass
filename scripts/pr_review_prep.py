#!/usr/bin/env python3
"""
为 /review 命令一次性汇总 PR 的审核材料，减少模型逐个调用 gh / 读文件的 token 开销。

用法（在仓库根目录运行）：
    python3 scripts/pr_review_prep.py <PR 号>

输出：
- PR 基本信息、CI 检查结果、已有的 review 评论（避免重复提）
- 带新文件行号的精简 diff（去掉 "No newline at end of file" 噪音，自动生成文件只列文件名）
- 面经 PR 的结构检查：md / json 配对、<InterviewDetail /> 位置、sourceType 与 <ReferenceSource> 是否一致、
  公司 index.md 和栏目 index.md 是否齐全
- 来源检查材料：来源站点 / 作者 / 链接、站点是否常见、同一作者已收录的面经（含被折叠的）、
  新增行里的推广 / 导流关键词。只做文本检查，不访问来源链接。

只用标准库，不需要 PYTHONPATH。PR 分支的文件内容通过 `git fetch origin pull/<N>/head` 读取，不切换分支。
"""
import json
import re
import subprocess
import sys
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent.parent
MD_PREFIX = "docs/zhHans/interview-experience/"
JSON_PREFIX = "docs/assets/json/interview-experience/"
SECTION_INDEX = MD_PREFIX + "index.md"
FOLDED_DIR = "folded-entry"
BOT_LOGINS = {"app/github-actions", "github-actions", "github-actions[bot]"}

# 常见、正常的面经来源域名；不在其中的只提示人工看一眼，不等于违规
KNOWN_SOURCE_DOMAINS = (
    "1point3acres.com", "xiaohongshu.com", "xhslink.com", "glassdoor.com", "leetcode.com",
    "leetcode.cn", "reddit.com", "teamblind.com", "linkedin.com", "zhihu.com", "nowcoder.com",
    "medium.com", "github.com",
)

# 推广 / 导流信号（docs/zhHans/guide/rules/promotion.md），命中只是提示，需要人工判断
PROMO_PATTERNS = [
    (re.compile(r"微信|威信|薇信|\b(?:vx|wx|v信)\b", re.I), "微信"),
    (re.compile(r"\bQQ\b|扣扣"), "QQ"),
    (re.compile(r"拉群|加群|进群|群号|群聊|二维码"), "拉群 / 二维码"),
    (re.compile(r"私信|私聊|加我|滴滴我|dd我|戳我|主页联系|找我拿", re.I), "引到私下渠道"),
    (re.compile(r"付费内推|内推费|代面|代考|代写|简历修改|求职中介|辅导|陪跑|训练营|付费课程|题库|上岸班"), "收费服务"),
    (re.compile(r"prachub|t\.me/|discord\.gg|telegram", re.I), "已知导流站 / 外部群"),
]

GENERATED = re.compile(r"(^|/)overview\.md$|^docs/_")


def run(cmd: list[str], check: bool = True) -> str:
    r = subprocess.run(cmd, cwd=ROOT, capture_output=True, text=True)
    if check and r.returncode != 0:
        sys.exit(f"命令失败：{' '.join(cmd)}\n{r.stderr.strip()}")
    return r.stdout


def show_at_head(path: str) -> str | None:
    r = subprocess.run(["git", "show", f"FETCH_HEAD:{path}"], cwd=ROOT, capture_output=True, text=True)
    return r.stdout if r.returncode == 0 else None


def section(title: str) -> None:
    print(f"\n## {title}")


# ---------- diff ----------

def parse_diff(diff: str) -> dict[str, list[str]]:
    """按文件切分 diff，返回 {path: 带行号的行}；新文件行号标在 '+' 行前。"""
    files: dict[str, list[str]] = {}
    current = None
    new_line = 0
    for line in diff.splitlines():
        if line.startswith("diff --git "):
            current = line.split(" b/", 1)[1]
            files[current] = []
            continue
        if current is None or line.startswith(("index ", "--- ", "+++ ", "new file mode", "deleted file mode",
                                               "similarity index", "rename from", "rename to")):
            continue
        if line.startswith("\\ No newline at end of file"):
            continue
        m = re.match(r"@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@", line)
        if m:
            new_line = int(m.group(1))
            files[current].append("   ...")
            continue
        if line.startswith("+"):
            files[current].append(f"{new_line:>4}+ {line[1:]}")
            new_line += 1
        elif line.startswith("-"):
            files[current].append(f"    - {line[1:]}")
        else:
            files[current].append(f"{new_line:>4}  {line[1:]}")
            new_line += 1
    return files


def added_lines(rows: list[str]) -> list[tuple[int, str]]:
    out = []
    for row in rows:
        m = re.match(r"\s*(\d+)\+ (.*)", row)
        if m:
            out.append((int(m.group(1)), m.group(2)))
    return out


# ---------- 面经检查 ----------

def reference_links(md: str) -> list[dict]:
    block = re.search(r"<ReferenceSource[\s\S]*?/>", md)
    if not block:
        return []
    items = []
    for obj in re.findall(r"\{([^{}]*)\}", block.group(0)):
        fields = dict(re.findall(r"(\w+)\s*:\s*['\"]([^'\"]*)['\"]", obj))
        if fields:
            items.append(fields)
    return items


def interview_detail_issue(md: str) -> str | None:
    lines = [l for l in md.split("\n---\n", 1)[-1].splitlines() if l.strip()]
    h1 = next((i for i, l in enumerate(lines) if l.startswith("# ")), None)
    if h1 is None:
        return "没有 H1"
    if "<InterviewDetail />" not in md:
        return "缺少 <InterviewDetail />"
    if h1 + 1 >= len(lines) or lines[h1 + 1].strip() != "<InterviewDetail />":
        return "<InterviewDetail /> 不在 H1 正下方"
    return None


def same_author_pages(author: str, exclude: set[str]) -> list[str]:
    if not author or author.startswith("匿名"):
        return []
    hits = []
    for p in (ROOT / JSON_PREFIX).rglob("*.json"):
        rel = p.relative_to(ROOT).as_posix()
        if rel in exclude:
            continue
        try:
            src = json.loads(p.read_text(encoding="utf-8")).get("source") or {}
        except (json.JSONDecodeError, OSError, AttributeError):
            continue
        if isinstance(src, dict) and src.get("author") == author:
            tag = "（已折叠）" if f"/{FOLDED_DIR}/" in rel else ""
            hits.append(rel + tag)
    return hits


def check_interview(paths: list[str], diff_files: dict[str, list[str]]) -> None:
    slugs = set()
    for p in paths:
        if p.startswith(MD_PREFIX) and p.endswith(".md") and not p.endswith(("/index.md", "/overview.md")):
            slugs.add(p[len(MD_PREFIX):-3])
        elif p.startswith(JSON_PREFIX) and p.endswith(".json"):
            slugs.add(p[len(JSON_PREFIX):-5])
    if not slugs:
        return

    section("面经结构检查")
    pr_jsons = {JSON_PREFIX + s + ".json" for s in slugs}
    for slug in sorted(slugs):
        md_path, json_path = MD_PREFIX + slug + ".md", JSON_PREFIX + slug + ".json"
        md, js = show_at_head(md_path), show_at_head(json_path)
        issues = []
        print(f"\n### {slug}")
        if md is None:
            issues.append(f"缺少 Markdown：{md_path}")
        if js is None:
            issues.append(f"缺少 JSON：{json_path}")

        data = {}
        if js is not None:
            try:
                data = json.loads(js)
            except json.JSONDecodeError as e:
                issues.append(f"JSON 解析失败：{e}")

        company_dir = slug.split("/")[0]
        if company_dir != FOLDED_DIR:
            idx = MD_PREFIX + company_dir + "/index.md"
            if show_at_head(idx) is None:
                issues.append(f"缺少公司 index.md：{idx}")
            elif not (ROOT / idx).exists() and SECTION_INDEX not in paths:
                issues.append(f"新公司 {company_dir}，但没改栏目 {SECTION_INDEX} 的 interviewItems")
            if data.get("company") and data["company"] != company_dir:
                issues.append(f"JSON company={data['company']!r} 与目录 {company_dir!r} 不一致")

        refs = reference_links(md) if md else []
        source_type = data.get("sourceType", "unknown")
        src = data.get("source") if isinstance(data.get("source"), dict) else {}
        if md is not None:
            if (issue := interview_detail_issue(md)):
                issues.append(issue)
            if source_type == "repost":
                if not refs:
                    issues.append("sourceType=repost，但 Markdown 没有 <ReferenceSource>")
                if not src:
                    issues.append("sourceType=repost，但 JSON 没有 source")
                elif src.get("link") and src["link"] not in md:
                    issues.append("JSON source.link 没出现在 Markdown 里")
            elif source_type == "original" and refs:
                issues.append("sourceType=original，但 Markdown 有 <ReferenceSource>")

        print(f"- sourceType: {source_type}")
        for label, value in (("site", src.get("site")), ("author", src.get("author")), ("link", src.get("link"))):
            if value:
                print(f"- source.{label}: {value}")
        for r in refs:
            if r.get("link") and r.get("link") != src.get("link"):
                print(f"- ReferenceSource: {r.get('site', '')} / {r.get('author', '')} / {r['link']}")

        links = {u for u in [src.get("link")] + [r.get("link") for r in refs] if u}
        for u in sorted(links):
            host = (urlparse(u).hostname or "").lower()
            if not any(host == d or host.endswith("." + d) for d in KNOWN_SOURCE_DOMAINS):
                print(f"- ⚠ 非常见来源域名 {host}：人工判断是否为商业 / 付费站")
        others = same_author_pages(src.get("author", ""), pr_jsons)
        if others:
            print(f"- 同一作者已收录 {len(others)} 篇：" + "；".join(others[:8]))

        promo = []
        for p in (md_path, json_path):
            for n, text in added_lines(diff_files.get(p, [])):
                for pat, label in PROMO_PATTERNS:
                    if pat.search(text):
                        promo.append(f"{p}:{n} [{label}] {text.strip()[:100]}")
                        break
        print("- 推广关键词：" + ("无" if not promo else ""))
        for hit in promo:
            print(f"  - {hit}")

        print("- 结构问题：" + ("无" if not issues else ""))
        for i in issues:
            print(f"  - {i}")


# ---------- main ----------

def main() -> None:
    if len(sys.argv) != 2 or not sys.argv[1].isdigit():
        sys.exit("用法：python3 scripts/pr_review_prep.py <PR 号>")
    pr = sys.argv[1]

    meta = json.loads(run(["gh", "pr", "view", pr, "--json",
                           "number,title,author,state,baseRefName,headRefName,body,files,reviews,url"]))
    run(["git", "fetch", "--quiet", "origin", f"pull/{pr}/head"])
    paths = [f["path"] for f in meta["files"]]
    author = meta["author"]["login"]

    print(f"# PR #{meta['number']} {meta['title']}")
    print(f"- 作者：{author}  状态：{meta['state']}  {meta['headRefName']} → {meta['baseRefName']}")
    print(f"- {meta['url']}")
    body = (meta.get("body") or "").strip()
    if body:
        print(f"- 描述：{body[:400]}")

    section("CI 检查")
    checks = run(["gh", "pr", "checks", pr], check=False).strip()
    print("\n".join("- " + "  ".join(l.split("\t")[:2]) for l in checks.splitlines()) or "- （无）")

    section("已有 review / 行内评论（不要重复提）")
    shown = 0
    for r in meta.get("reviews", []):
        if r.get("body", "").strip():
            print(f"- {r['author']['login']} [{r['state']}]: {r['body'].strip()[:200]}")
            shown += 1
    inline = run(["gh", "api", f"repos/{{owner}}/{{repo}}/pulls/{pr}/comments", "--jq",
                  '.[] | "\\(.path):\\(.line // .original_line) \\(.user.login): \\(.body[0:160])"'],
                 check=False).strip()
    for l in inline.splitlines():
        print(f"- {l}")
        shown += 1
    if not shown:
        print("- （无）")

    section("硬性约束")
    hard = []
    if author not in BOT_LOGINS:
        for p in paths:
            if p.startswith("docs/_"):
                hard.append(f"改了 CI 同步目录：{p}")
            elif p.endswith("overview.md"):
                hard.append(f"手改了自动生成的 overview：{p}")
    print("\n".join(f"- {h}" for h in hard) or "- 无")

    diff_files = parse_diff(run(["gh", "pr", "diff", pr]))
    check_interview(paths, diff_files)

    section("Diff（行号为 PR 分支上的新文件行号）")
    for path, rows in diff_files.items():
        if GENERATED.search(path):
            print(f"\n### {path}（自动生成，省略）")
            continue
        print(f"\n### {path}")
        print("\n".join(rows))


if __name__ == "__main__":
    main()

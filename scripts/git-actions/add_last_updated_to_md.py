import subprocess
import re

def get_modified_md_files():
    """
    获取本次 PR 修改的 Markdown 文件（新增或修改）
    """
    print("➡️ 调用 get_modified_md_files() ...")
    result = subprocess.run(
        ["git", "diff", "--diff-filter=AM", "--name-only", "origin/main...HEAD", "--", "docs/"],
        capture_output=True, text=True
    )
    print(f"git diff 输出:\n{result.stdout}")
    files = result.stdout.strip().split("\n") if result.stdout.strip() else []
    md_files = [f for f in files if f.endswith(".md")]
    print(f"筛选出的新增/修改 md 文件: {md_files}")
    return md_files

def get_commit_date():
    """
    获取最新提交日期 (yyyy-mm-dd)
    """
    print("➡️ 调用 get_commit_date() ...")
    result = subprocess.run(
        ["git", "log", "-1", "--format=%cd", "--date=short"],
        capture_output=True, text=True
    )
    commit_date = result.stdout.strip()
    print(f"最新提交日期: {commit_date}")
    return commit_date

def ensure_last_updated(content: str, updated: str) -> str:
    """
    解析 front-matter，添加或更新 lastUpdated 字段
    """
    print("➡️ 调用 ensure_last_updated() ...")
    fm_pattern = re.compile(r"^---\s*\n(.*?)\n---\s*\n?", re.S)
    match = fm_pattern.match(content)

    if match:
        print("✅ 检测到 frontmatter")
        frontmatter = match.group(1)

        if re.search(r"^lastUpdated:.*$", frontmatter, re.M):
            # 已有 lastUpdated，替换成新的日期
            print("📝 frontmatter 中已有 lastUpdated，更新为最新日期")
            new_frontmatter = re.sub(
                r"^lastUpdated:.*$",
                f"lastUpdated: {updated}",
                frontmatter,
                flags=re.M
            )
        else:
            # 没有 lastUpdated，追加
            print("📝 frontmatter 中没有 lastUpdated，添加")
            new_frontmatter = frontmatter.strip() + f"\nlastUpdated: {updated}"

        return f"---\n{new_frontmatter}\n---\n" + content[match.end():]

    else:
        # 没有 frontmatter，创建一个
        print("⚠️ 文件没有 frontmatter，新建一个")
        return f"---\nlastUpdated: {updated}\n---\n\n{content}"

def add_last_updated(file_path, commit_date):
    print(f"➡️ 处理文件: {file_path}")
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    new_content = ensure_last_updated(content, commit_date)

    if new_content != content:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"✅ 已更新 lastUpdated: {file_path}")
    else:
        print(f"ℹ️ 文件无需修改: {file_path}")

def main():
    print("🚀 脚本开始执行")
    md_files = get_modified_md_files()
    if not md_files:
        print("ℹ️ 没有新增或修改的 md 文件")
        return

    commit_date = get_commit_date()
    for f in md_files:
        add_last_updated(f, commit_date)

    print("🏁 脚本执行结束")

if __name__ == "__main__":
    main()

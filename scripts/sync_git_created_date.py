"""
同步文档创建日期的脚本
为/docs目录下所有Markdown文档的frontmatter添加创建日期
创建日期为该文档第一条git提交记录的日期（支持追踪文件重命名）
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


def get_file_created_date(file_path):
    """
    使用 git log 获取文件创建日期，只返回 YYYY-MM-DD 格式。
    采用git log --follow 和 --diff-filter=A混合的筛选模式
    追踪重命名，并只取第一次添加(A)的提交。
    """
    try:
        result = subprocess.check_output(
            ['git', 'log', '--follow', '--diff-filter=A', '--format=%ai', '--', file_path],
            text=True
        )
        if result.strip():
            # 只取最早的一条
            return result.strip().split("\n")[-1][:10]
        return None
    except subprocess.CalledProcessError:
        return None


def update_frontmatter(file_path, created_date):
    """
    只修改 Markdown 文件顶部的 frontmatter。
    """
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    frontmatter_pattern = re.compile(r"^---\n(.*?)\n---", re.DOTALL)

    if content.startswith("---"):
        # 已有 frontmatter，检查是否已有 createdDate
        match = frontmatter_pattern.match(content)
        if match:
            frontmatter = match.group(1)
            if "createdDate:" not in frontmatter:
                new_frontmatter = frontmatter + f"\ncreatedDate: {created_date}"
                content = content.replace(match.group(0), f"---\n{new_frontmatter}\n---", 1)
    else:
        # 没有 frontmatter，则新建
        content = f"---\ncreatedDate: {created_date}\n---\n\n{content}"

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)


def walk_docs(dir_path):
    """遍历/docs目录下所有 Markdown 文件，更新 frontmatter"""
    for root, _, files in os.walk(dir_path):
        for file in files:
            if file.endswith(".md") and file not in SKIP_NAMES:
                file_path = os.path.join(root, file)
                created_date = get_file_created_date(file_path)
                if created_date:
                    update_frontmatter(file_path, created_date)
                    logging.info(f"✅ Updated: {file_path} -> {created_date}")
                else:
                    logging.error(f"❌ 更新失败: {file_path}")


def main():
    logging.info("🚀 markdown文档添加创建日期开始...")
    walk_docs(DOCS_DIR_PATH)
    logging.info("🎉 markdown文档添加创建日期完成！")


if __name__ == "__main__":
    main()

import os
import yaml
import requests
import sys
from pathlib import Path

def extract_email_and_filename(file_path):
    # 从 Markdown 文章中提取 email 和 filename
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
        # 提取 markdown中的frontmatter
        frontmatter = content.split('---')[1]
        data = yaml.safe_load(frontmatter)
        email = data.get('email')
        # 去掉文件的路径和扩展名
        filename = os.path.splitext(os.path.basename(file_path))[0]
        return email, filename


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("错误: 未提供修改的文件列表")
        sys.exit(1)
    main(sys.argv[1])

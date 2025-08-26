#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from bs4 import BeautifulSoup
import os

"""
将HTML文件转换为Markdown文件
使用BeautifulSoup解析HTML内容，并提取纯文本。
输出文件名与输入文件相同，但后缀改为 .md。
"""

def html_to_text(html_content: str) -> str:
    """
    将 HTML 内容转换为纯文本
    """
    soup = BeautifulSoup(html_content, "html.parser")
    text = soup.get_text(separator="\n", strip=True)
    paragraphs = text.split('\n')
    return '\n\n'.join(paragraphs)

def convert_html_file(input_file: str):
    """
    读取 HTML 文件，提取纯文本，并保存为 .md 文件（内容为纯文本，不是 Markdown 格式）
    """
    # 读取 HTML 文件
    with open(input_file, "r", encoding="utf-8") as f:
        html_content = f.read()

    # 转换成纯文本
    text = html_to_text(html_content)

    # 输出文件名（同名，后缀改为 .md）
    base, _ = os.path.splitext(input_file)
    output_file = base + ".md"

    # 保存为 Markdown 文件
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(text)

    print(f"✅ 已生成 Markdown 文件: {output_file}")


if __name__ == "__main__":
    # 示例：读取 input.html 并输出 input.md
    convert_html_file("input.html")
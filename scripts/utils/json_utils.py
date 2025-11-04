"""
JSON工具类脚本，用于处理JSON格式数据
"""

import json
import logging
from pathlib import Path
from typing import Union, Optional, Any

from scripts.utils.logging_utils import setup_logging

setup_logging()

def read_json_file(
        file_path: Union[str, Path]
) -> Optional[Any]:
    """
    通用JSON文件读取函数
    :param file_path: JSON文件路径
    :return: JSON对象(dict) 或 JSON数组(list[dict])，出错返回None
    """
    setup_logging()
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        logging.error(f"Error: 文件未找到: {file_path}")
    except json.JSONDecodeError:
        logging.error(f"Error: JSON解析错误: {file_path}")
    except Exception as e:
        logging.error(f"Error: 读取JSON文件时出错: {e}")
    return None

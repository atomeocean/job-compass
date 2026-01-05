#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
下载visa_solution_company_json信息到本地Json目录下
"""

from scripts.utils.rsync_downloader import sync_remote_folder
from scripts.utils.path_utils import get_project_root
# 配置信息需要本地创建config.py文件
from scripts.utils.config import (
    REMOTE_1030_VISA_SOLUTION_COMPANY_JSON_DIR
)

# 获取项目根目录
PROJECT_ROOT = get_project_root()

def fetch_visa_solution_company_json():
    """
    下载visa_solution_company_json信息
    """
    remote_folder = REMOTE_1030_VISA_SOLUTION_COMPANY_JSON_DIR
    local_folder = PROJECT_ROOT/ 'docs'/ 'assets'/ 'json'/ 'visa-solution-company'

    success = sync_remote_folder(
        remote_folder,
        local_folder
    )
    return success


def main():
    fetch_visa_solution_company_json()


if __name__ == "__main__":
    main()
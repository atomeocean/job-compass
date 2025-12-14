#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from scripts.utils.rsync_downloader import sync_remote_folder
from scripts.utils.path_utils import get_project_root

# 获取项目根目录
PROJECT_ROOT = get_project_root()

def fetch_visa_solution_company_json():
    """
    下载visa_solution_company_json信息
    """
    remote_folder = '/home/atmBot/logbook/job-compass/visa-solution-company'
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
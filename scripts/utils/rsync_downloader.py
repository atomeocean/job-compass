#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
rsync文件夹同步公共模块
"""

import os
import subprocess
from pathlib import Path
from typing import Union, Optional, List
from scripts.utils.config import (
    REMOTE_SERVER_1030_HOST,
    REMOTE_SERVER_1030_PORT,
    REMOTE_SERVER_1030_USER,
    SSH_PRIVATE_KEY_PATH_1030
)


class RsyncDownloader:
    """使用 rsync 从远程服务器同步文件夹"""

    def __init__(
            self,
            private_key_path: str = SSH_PRIVATE_KEY_PATH_1030,
            remote_host: str = REMOTE_SERVER_1030_HOST,
            remote_port: int = REMOTE_SERVER_1030_PORT,
            remote_user: str = REMOTE_SERVER_1030_USER,
    ):
        """
        初始化 rsync 下载器

        Args:
            private_key_path: SSH 私钥路径
            remote_host: 远程服务器地址
            remote_port: SSH 端口
            remote_user: 远程用户名
        """
        self.private_key_path = os.path.expanduser(private_key_path)
        self.remote_host = remote_host
        self.remote_port = remote_port
        self.remote_user = remote_user

        # 默认排除的macos文件模式
        self.default_excludes = [
            '._*',           # macOS 资源分叉文件
            '.DS_Store',     # macOS 文件夹设置
            '.AppleDouble',  # AppleDouble 文件
            '.LSOverride',   # macOS 图标位置文件
        ]

    def sync_folder(
            self,
            remote_folder: str,
            local_folder: Union[str, Path],
            delete: bool = True,
            excludes: Optional[List[str]] = None,
            additional_options: Optional[List[str]] = None,
            verbose: bool = True,
    ) -> bool:
        """
        同步远程文件夹到本地

        Args:
            remote_folder: 远程文件夹路径
            local_folder: 本地文件夹路径
            delete: 是否删除本地多余文件（保持与远程一致）
            excludes: 额外的排除模式列表，会与默认排除合并
            additional_options: 额外的 rsync 选项
            verbose: 是否显示详细输出

        Returns:
            bool: 同步是否成功
        """
        # 创建本地目录
        local_folder = Path(local_folder)
        local_folder.mkdir(parents=True, exist_ok=True)

        # 合并排除规则
        all_excludes = self.default_excludes.copy()
        if excludes:
            all_excludes.extend(excludes)

        # 构建 rsync 命令
        rsync_cmd = [
            'rsync',
            '-az',  # -a=archive模式, -z=压缩传输
        ]

        if verbose:
            rsync_cmd.append('-v')  # 详细输出
            rsync_cmd.append('--progress')  # 显示进度

        if delete:
            rsync_cmd.append('--delete')  # 删除本地多余文件

        # 添加排除规则
        for pattern in all_excludes:
            rsync_cmd.extend(['--exclude', pattern])

        # 添加额外选项
        if additional_options:
            rsync_cmd.extend(additional_options)

        # SSH 配置
        rsync_cmd.extend([
            '-e', f'ssh -p {self.remote_port} -i {self.private_key_path}',
        ])

        # 源和目标（远程路径末尾加 / 表示同步内容而非文件夹本身）
        remote_path = f'{self.remote_user}@{self.remote_host}:{remote_folder}/'
        rsync_cmd.extend([remote_path, local_folder])

        # 执行同步
        if verbose:
            print(f"⬇️ 使用rsync同步文件夹...")
            print(f"   远程: {remote_path}")
            print(f"   本地: {local_folder}")

        try:
            result = subprocess.run(
                rsync_cmd,
                check=True,
                capture_output=True,
                text=True
            )

            if verbose and result.stdout:
                print(result.stdout)

            if verbose:
                print("✅ 文件夹同步完成！")

            return True

        except subprocess.CalledProcessError as e:
            print(f"❌ rsync 同步失败: {e}")
            if e.stderr:
                print(f"错误输出: {e.stderr}")
            return False

        except FileNotFoundError:
            print("❌ 未找到 rsync 命令。请确保已安装 rsync:")
            print("   macOS: brew install rsync")
            print("   Ubuntu/Debian: sudo apt-get install rsync")
            print("   CentOS/RHEL: sudo yum install rsync")
            return False


# 便捷函数
def sync_remote_folder(
        remote_folder: str,
        local_folder: Union[str, Path],
        **kwargs
) -> bool:
    """
    便捷函数：使用默认配置同步远程文件夹

    Args:
        remote_folder: 远程文件夹路径
        local_folder: 本地文件夹路径
        **kwargs: 传递给 RsyncDownloader.sync_folder 的其他参数

    Returns:
        bool: 同步是否成功
    """
    downloader = RsyncDownloader()
    return downloader.sync_folder(remote_folder, local_folder, **kwargs)
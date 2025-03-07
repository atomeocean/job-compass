---
title: GitHub注册与本地配置指南
---

# GitHub 注册与本地配置指南

本指南将详细介绍如何注册 GitHub 账号，并在本地配置 Git 环境，以便能够使用 GitHub 进行代码管理。指南包括 macOS 和 Windows 两种操作系统的配置步骤。

[[toc]]

## 注册 GitHub 账号

1. 打开浏览器，访问 [GitHub 官网](https://github.com/)
2. 点击页面右上角的 Sign up 按钮
3. 输入你的用户名、邮箱地址和密码
4. 完成人机测试，并点击 Continue 按钮
5. 根据提示完成邮箱验证
6. 完成注册后，你将自动登录到 GitHub

## 本地配置

### macOS 配置

1. 安装 Git
    - 打开终端 (Terminal)，输入以下命令安装 Git：
        > brew install git
    - 如果你没有安装 Homebrew，请先安装 Homebrew：
        > /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    - 输入以下命令，验证安装是否成功
        > git --version
2. 配置 Git
    - 打开终端 (Terminal)
    - 设置用户名：
        > git config --global user.name "你的用户名"
    - 设置邮箱：
        > git config --global user.email "你的邮箱"
    - 检查配置是否成功：
        > git config --list
3. 生成 SSH 密钥
    - 生成 SSH 密钥：
        > ssh-keygen -t rsa -b 4096 -C "你的GitHub账户邮箱"
    - 按回车接受默认文件路径（~/.ssh/id_ed25519）
    - 可设置密码（或留空直接回车）
    - 运行以下命令启动 SSH 代理并添加密钥
        > eval "$(ssh-agent -s)"  
         ssh-add ~/.ssh/id_rsa
    - 查看并复制公钥
        > cat ~/.ssh/id_rsa.pub
    - 进入 GitHub 账户，打开 [SSH Keys](https://github.com/settings/keys) 页面，点击 New SSH Key，粘贴公钥并保存
    - Terminal中运行以下命令测试 SSH 连接：
        > ssh -T git@github.com

### Windows 配置

1. 安装 Git
   - 下载适用于本地Windows版本的 Git 安装包：[Git for Windows](https://git-scm.com/downloads/win)
   - 运行安装程序，选择默认选项完成安装
   - 在安装过程中，选择 Use Git from the Windows Command Prompt 选项
   - 打开命令提示符（Command Prompt）或 Git Bash，输入以下命令验证安装是否成功
       > git --version
2. 配置 Git
   - 打开命令提示符（Command Prompt）或 Git Bash
   - 设置用户名：
       > git config --global user.name "你的用户名"
   - 设置邮箱：
       > git config --global user.email "你的邮箱"
   - 检查配置是否成功：
       > git config --list
3. 生成 SSH 密钥
   - 打开 Git Bash 并执行以下命令：
       > ssh-keygen -t rsa -b 4096 -C "你的邮箱"
   - 按 Enter 选择默认存储位置，设置或跳过密码
   - 运行以下命令启动 SSH 代理并添加密钥
       > eval "$(ssh-agent -s)"  
        ssh-add ~/.ssh/id_rsa
   - 运行以下命令查看并复制 SSH 公钥
       > cat ~/.ssh/id_rsa.pub
   - 进入 GitHub 账户，打开 [SSH Keys](https://github.com/settings/keys) 页面，点击 New SSH Key，粘贴公钥并保存
   - 运行以下命令测试 SSH 连接
       > ssh -T git@github.com

## 参考

- [GitHub 官方文档](https://docs.github.com/en)
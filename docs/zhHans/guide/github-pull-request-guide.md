---
title: GitHub网页发布PR指南
description: 本指南详细介绍如何在GitHub网页端发布Pull Request，包括提交修改、设置 Reviewer 和 Assignees 等步骤。
outline: deep
createdDate: 2025-03-08
lastUpdated: 2025-09-03
---
# GitHub 网页端发布 Pull Request (PR) 指南

本指南将详细介绍当用户在GitHub网页端做出内容改动后，如何将更改的内容合并到目标仓库中

[[toc]]

## Commit 内容修改

1. 完成文件内容修改后，点击窗口右上方的 **Commit changes...** 按钮
2. 在第一个输入框 (Commit message) 中填写简短的提交信息，例如 "Add github-guide.md"
3. 在第二个输入框中填写更详细的描述（可选）
4. 选择提交的分支
   - 若还未创建本次内容更新的分支，选择 **Create a new branch for this commit and start a pull request** 选项，并在下方输入框填写一个分支名称，一般以小写字母和连字符'-'构成
   - 如果在已有分支中进行内容修改，选择 **Commit directly to the your-branch-name branch**
5. 点击 **Propose changes** 按钮，自动跳转至 Pull Request 发布页

## 发布 Pull Request (PR)

1. 填写 Pull Request 信息
    - 在标题输入框中填写 PR 的标题
    - 在描述框中详细说明你的更改内容（例如为什么需要这个更改，更改的具体内容等）
2. 设置 Reviewer
    - 在页面右侧一栏的 Reviewers 中，点击 **齿轮**⚙️ 图标，选择一位用户作为本次 PR 的审核员
3. 设置 Assignees
    - 在页面右侧一栏的 Assignees 中，点击 **齿轮**⚙️ 图标，选择一位用户作为本次 PR 的作者，通常情况下直接点击 **assign yourself**，将作者设置为自己
4. 关联其他内容 (选填)
    - 如果需要，可以在右侧栏中关联 Issue 或添加标签（Labels）、项目（Projects）等
5. 提交 Pull Request
    - 在确认内容无误后，点击下方 **Create pull request** 按钮
    - 你的 PR 将会被创建，并显示在仓库上方的 Pull requests 选项卡中
6. 等待审核
    - PR 创建后，GitHub 会自动通知 Reviewer 或协作者
    - 他们可能会对你的更改提出修改建议，或者直接批准并合PR的请求
7. 合并 Pull Request
    - 当 Reviewer 批准合并PR的请求后，在下方按钮中选择 **Squash and merge** 选项，点击合并PR
8. 关闭分支
    - 当 PR 合并后，点击 **Delete branch** 按钮关闭当前分支


## 视频教程

<VideoLinks bilibili="https://www.bilibili.com/video/BV1AiQpYuE1k/" youtube="https://youtu.be/Jp7aMDVXvwM" />
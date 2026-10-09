---
title: 使用 Claude Code 贡献
description: 用 Claude Code 参与 Job Compass 贡献：项目内置的指引文件、skills 和 /progress 命令，以及仓库自带的 hooks 会在你本机做什么、会把哪些内容发送到哪里、如何关闭
outline: deep
order: 3
relatedArticles:
  - title: 贡献指南
    href: /guide/contribution-guide/
  - title: 贡献技巧
    href: /guide/contribution-guide/tips
  - title: Claude Code 官方文档
    href: https://docs.claude.com/en/docs/claude-code/overview
createdDate: 2026-10-09
lastUpdated: 2026-10-09
---
# 使用 Claude Code 贡献

本仓库为 [Claude Code](https://claude.com/claude-code) 做了一些预先配置。在这个仓库里打开 Claude Code，它会自动读取项目规范、提供写作用的 skills，并运行仓库自带的 hooks。

## 项目指引文件

Claude Code 会自动读取仓库里的 `CLAUDE.md`，按其中的规范工作，不需要你额外说明：

| 文件 | 内容 |
|---|---|
| `CLAUDE.md` | 项目总览、目录结构、不能手改的文件、Markdown 写作规范 |
| `docs/zhHans/job-postings/CLAUDE.md` 等 | 各内容目录的文件结构和 JSON 格式约定 |
| `docs/.vitepress/theme/CLAUDE.md` | 主题代码的注意事项 |
| `scripts/CLAUDE.md` | Python 脚本的运行方式和用途 |

## Skills

`.claude/skills/` 下是常用的内容写作流程。直接描述你要做的事，Claude 会自动选用对应的 skill，也可以用 `/名称` 手动调用：

| Skill | 用途 |
|---|---|
| `find-docs` | 查找某个主题已有哪些页面，或推荐新页面应该放在哪里 |
| `idea-to-article` | 把零散想法整理成一篇新文章的骨架 |
| `web-source-to-article` | 把小红书、一亩三分地等外部链接整理成文章，并注明来源 |
| `web-source-to-interview` | 把外部链接里的面经整理成面经页面和对应的 JSON |
| `organize-interview-exp` | 把粘贴的面经全文原样整理成面经页面 |
| `translate-to-en` | 为中文页面生成 `docs/en/` 下的英文版本 |
| `gen-description` | 生成或更新页面 frontmatter 里的 `description` |
| `related-articles-frontmatter` | 把文末的「相关文章」列表转成 frontmatter 里的 `relatedArticles` |

## /progress 命令

`/progress` 显示当前分支的进度速览：

- **进度笔记**：你自己写的笔记，只记 git 记不下来的东西，比如决策、待确认项、踩过的坑
- **Git 状态**：相对 `main` 的提交、未提交的改动
- **最近的会话**：最近几次会话的第一句提问

用 `/progress save` 让 Claude 根据当前会话更新进度笔记。笔记保存在 `.claude/state/progress/<分支名>.md`，只存在你本地，不会提交到仓库。

## Hooks

Hooks 是 Claude Code 在特定时机自动运行的命令。本仓库在 `.claude/settings.json` 里配置了 3 个 hook，对应的脚本在 `scripts/claude_hooks/`，只用 Python 标准库，需要本机装有 `python3`。

| 时机 | 脚本 | 做什么 |
|---|---|---|
| 会话开始 | `session_progress.py` | 把 `/progress` 的进度速览注入新会话，Claude 一开始就知道当前分支做到哪了。**只在本地运行，不发送任何内容** |
| 你提交提问时 | `send_prompt_notification.py` | 把提问内容发送到 webhook |
| Claude 回复结束时 | `send_response_summary.py` | 把 Claude 最后一条回复的正文发送到 webhook |

### 会发送哪些内容

后两个 hook 默认对所有贡献者开启，发送到 `scripts/claude_hooks/webhook.py` 里常量 `CLAUDE_HOOK_WEBHOOK_URL` 指定的地址，也就是 AtomeOcean 的服务器。每条消息包含：

- 你在本仓库里每一条提问的**完整原文**
- Claude 每次回复结束时最后一条回复的**完整正文**
- 仓库文件夹名（例如 `job-compass`）、使用的模型名称、时间

除此之外不会主动读取或发送你的文件、代码改动或会话里的其他记录。但如果 Claude 的回复里引用了代码或文件内容，这部分会作为回复正文的一部分被发送。

在这个仓库里使用 Claude Code 时，**不要在提问里粘贴密码、密钥、个人联系方式等敏感信息**。

### 如何关闭 hooks

在仓库根目录新建（或编辑）`.claude/settings.local.json`，加入：

```json
{
  "disableAllHook": true
}
```

这个文件不会提交到仓库，只对你本机生效。注意它会关闭**全部** hooks，会话开始时的进度速览也会一起关闭，但 `/progress` 命令仍然可以手动使用。

::: danger 不要修改 webhook.py 来关闭发送
`scripts/claude_hooks/webhook.py` 是提交到仓库里的文件。如果你在本地修改它，修改会出现在 `git status` 里，很容易随 PR 一起提交。请用上面的 `settings.local.json` 方法。
:::

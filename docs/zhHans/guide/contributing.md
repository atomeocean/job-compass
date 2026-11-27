---
title: 参与贡献
description: Job Compass 贡献入口汇总：按分享面经、撰写内容、本地开发、使用 AI 编程代理等情况选择入口，以及多语言目录、自动生成内容和提交 PR 的注意事项
outline: deep
---
# 参与贡献

按你的情况选择入口：

- **分享面经（不需要写代码）**：TBD
- **撰写或修改内容**：阅读站内的[贡献指南](/guide/contribution-guide/)和[社区规则](/guide/rules/)。不熟悉 GitHub 的话，可以参考 [GitHub 网页发布 PR 指南](/guide/github-pull-request-guide)，全程在网页上完成。
- **本地开发**：见仓库 README 的[本地运行](https://github.com/atomeocean/job-compass#本地运行)。
- **使用 AI 编程代理**（Claude Code、Codex、Cursor 等）：项目规则统一写在 [AGENTS.md](https://github.com/atomeocean/job-compass/blob/main/AGENTS.md)，请先让代理读取。

新页面可以从仓库 [`templates/`](https://github.com/atomeocean/job-compass/tree/main/templates) 中的模板开始。

## 多语言目录

- 简体中文 `docs/zhHans/` 是主内容，新内容请优先添加在这里。
- 其他语言（`docs/en/` 等）是可选的翻译，目前只覆盖部分页面。
- 翻译时，文件路径需与中文版一一对应：

```
docs/
├── zhHans/
│   └── guide/
│       └── usage.md
└── en/
    └── guide/
        └── usage.md
```

## 请不要手动修改

以下内容由 CI 自动生成或维护，手动修改会被覆盖：

- `docs/_data/` 等以 `_` 开头的目录
- 所有 `overview.md`（如需调整显示内容，请修改对应页面 frontmatter 的 `title` / `description`）
- 新页面 frontmatter 中的 `createdDate` / `lastUpdated`

## 提交 PR

- 填写 PR 模板中的 **PR Description** 部分。
- 在 PR 右侧的 Assignees 中指派负责人（通常点击 **assign yourself** 即可）。未指派的 PR 无法通过检查。

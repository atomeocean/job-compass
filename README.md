# Atomeocean Job Compass

[![Website](https://img.shields.io/badge/website-jobcompass.atomeocean.com-blue)](https://jobcompass.atomeocean.com/)
[![License](https://img.shields.io/github/license/atomeocean/job-compass)](LICENSE)
[![Discord](https://img.shields.io/badge/Discord-join-5865F2?logo=discord&logoColor=white)](https://logbook.atomeocean.com/about-us/contact-us/discord-tutorial.html)

Job Compass is an open-source job-seeking guide for the U.S. job market, started by the
Atomeocean team. It collects company profiles, job postings, interview experiences and career
guides as Markdown pages, published as a [VitePress](https://vitepress.dev) site. Content is
primarily in Simplified Chinese, with a partial English version.

Atomeocean Job Compass 是一个开源求职指南，由 Atomeocean 团队发起，致力于帮助求职者更高效地探索美国职场。
站内所有页面都是 Markdown 文件，由 [VitePress](https://vitepress.dev) 生成。

- 🔗 官网：[jobcompass.atomeocean.com](https://jobcompass.atomeocean.com/)
- 💬 社区：[加入 Discord](https://logbook.atomeocean.com/about-us/contact-us/discord-tutorial.html)
- 🌟 如果这个项目对你有帮助，欢迎 Star ⭐ 支持！

## 🛠 参与贡献

按你的情况选择入口：

- **分享面经（不需要写代码）**：TBD
- **撰写或修改内容**：阅读站内的[贡献指南](https://jobcompass.atomeocean.com/guide/contribution-guide/)和[社区规则](https://jobcompass.atomeocean.com/guide/rules/)。不熟悉 GitHub 的话，可以参考 [GitHub 网页发布 PR 指南](https://jobcompass.atomeocean.com/guide/github-pull-request-guide)，全程在网页上完成。
- **本地开发**：见下方[本地运行](#本地运行)。
- **使用 AI 编程代理**（Claude Code、Codex、Cursor 等）：项目规则统一写在 [AGENTS.md](AGENTS.md)，请先让代理读取。

新页面可以从 [`templates/`](templates/) 中的模板开始。

### 多语言目录

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

### 请不要手动修改

以下内容由 CI 自动生成或维护，手动修改会被覆盖：

- `docs/_data/` 等以 `_` 开头的目录
- 所有 `overview.md`（如需调整显示内容，请修改对应页面 frontmatter 的 `title` / `description`）
- 新页面 frontmatter 中的 `createdDate` / `lastUpdated`

### 提交 PR

- 填写 PR 模板中的 **PR Description** 部分。
- 在 PR 右侧的 Assignees 中指派负责人（通常点击 **assign yourself** 即可）。未指派的 PR 无法通过检查。

## 本地运行

环境要求：Node.js 24（与 CI 一致）。

```shell
npm install

npm run docs:dev            # 启动本地开发服务器
npm run docs:build          # 生产构建
npm run docs:preview        # 预览构建结果
npm run validate:interview  # 校验面经 JSON 数据
```

> [!NOTE]
> 构建配置开启了 `ignoreDeadLinks`，构建通过并不代表链接都有效，请手动检查新增链接。

`scripts/` 下的 Python 工具脚本需要另外安装依赖：`pip install -r requirements.txt`。

## 许可证

见 [LICENSE](LICENSE)。

## Repo 分析

![Alt](https://repobeats.axiom.co/api/embed/edf6247e5c92f3186756a323bcf08dc00e46f6f6.svg "Repobeats analytics image")

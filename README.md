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

贡献入口、多语言目录、不要手动修改的内容和提交 PR 的要求，见站内的[参与贡献](https://jobcompass.atomeocean.com/guide/contributing)页面（源文件：[`docs/zhHans/guide/contributing.md`](docs/zhHans/guide/contributing.md)）。

使用 AI 编程代理（Claude Code、Codex、Cursor 等）时，项目规则统一写在 [AGENTS.md](AGENTS.md)，请先让代理读取。

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

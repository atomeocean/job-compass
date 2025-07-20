# Atomeocean Job Compass

Atomeocean Job Compass是一个开源求职工具，由Atomeocean团队发起，致力于帮助求职者更高效地探索美国职场。

## 特点

- 📃 皆为 Markdown：
  - 使用 Markdown 和 Markdown 拓展语法记录和组织求职相关信息，每一个页面都是 Markdown 文件。
- 🚀 由 [VitePress](https://vitepress.dev) 驱动：
  - 基于Vite的强大静态文档页面生成器，它生成了我们知识库的页面，提供了简单易用的主题和工具。

🔗 官网地址：[Job Compass](https://jobcompass.atomeocean.com/)

加入我们的Discord[讨论组](https://discord.gg/TvS5yupU)

🌟 如果你觉得这个项目对你有帮助，欢迎 Star ⭐ 支持！

## 🛠 参与贡献

1. 从根目录中进入`docs/`
2. 中文内容请在zhHans目录添加
3. 英文内容请在en目录添加。

多语言文件路径规范
需确保 zhHans 和 en 目录下的文件路径结构完全一致，示例:
```
docs/
   ├── zhHans/
   │    └── guide/
   │         └── usage.md
   └── en/
        └── guide/
             └── usage.md
```

## 运行方式

### 本地运行

参考package.json中的scripts

```shell
npm run docs:dev
```

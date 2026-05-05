---
title: 直招公司信息辅助文档
createdDate: 2025-03-19
lastUpdated: 2026-05-05
---

# 直招公司信息辅助工具

本工具帮助你将直招公司的信息添加到 Job Compass，包括公司名称、地址、联系方式、行业分类等。

## 📋 快速开始

在添加公司信息前，请确保 **Job Compass 已存在该公司的面试经验文档**。可以在[面试经验板块](/interview-experience/overview.md)搜索确认。

### 三步完成添加

| 步骤 | 操作 | 产出 |
|:---:|---|---|
| 1 | [查找公司信息](/guide/direct-hire-company-utils/company-info-guide.md#1-查找公司信息) | 获取官网、LinkedIn 等来源 |
| 2 | [填充信息模板](/guide/direct-hire-company-utils/company-info-guide.md#4-创建公司的json文件) | 创建 JSON + Markdown 文件 |
| 3 | [提交 PR](/guide/direct-hire-company-utils/company-info-guide.md#7-提交pr) | 让内容上线 |

## 📁 最终文件结构

```
docs/zhHans/direct-hire-company/
├── new-york/                    # 州文件夹（小写，连字符）
│   └── san-francisco/           # 城市文件夹（小写，连字符）
│       ├── index.md             # 城市页面
│       ├── amazon.json          # 公司数据（JSON）
│       └── amazon.md            # 公司页面（Markdown）
```

## 🛠️ 需要用到的模板

| 模板类型 | 用途 | 复制即用 |
|---|---|---|
| [州文件夹 index.md](/guide/direct-hire-company-utils/company-info-template.md#state-folder-index-md-file) | 新建州时使用 | ✅ 一键复制 |
| [城市文件夹 index.md](/guide/direct-hire-company-utils/company-info-template.md#city-folder-index-md-file) | 新建城市时使用 | ✅ 一键复制 |
| [公司 JSON 模板](/guide/direct-hire-company-utils/company-info-json-template.md) | 存储公司数据 | ✅ 一键复制 |
| [公司 Markdown 模板](/guide/direct-hire-company-utils/company-info-template.md#company-file) | 公司展示页面 | ✅ 一键复制 |

## 📖 示例演示

想看完整的添加流程？查看 [Amazon 添加示例](/guide/direct-hire-company-utils/company-info-example.md)，逐步演示从创建州文件夹到提交 PR 的全过程。

## ❓ 常见问题

| 问题 | 解决 |
|---|---|
| 找不到州文件夹 | 在 `docs/zhHans/direct-hire-company/` 下按[指南创建](/guide/direct-hire-company-utils/company-info-guide.md#2-检查仓库中是否已有该公司所在州的文件夹) |
| JSON 格式报错 | 检查 [JSON 语法](/guide/json-cheatsheet.html)，确保字段名和引号正确 |
| 组件不显示数据 | 检查 `state`、`city`、`companyJsonFileName` 三个参数是否与实际文件夹/文件名匹配 |
| 更多问题 | 查看 [常见问题解答](/guide/direct-hire-company-utils/company-info-faq.md) |

## 🔗 相关资源

- [完整添加示例（Amazon）](/guide/direct-hire-company-utils/company-info-example.md)
- [常见问题解答](/guide/direct-hire-company-utils/company-info-faq.md)
- [Markdown 语法速查](/guide/markdown-cheatsheet.html)
- [JSON 语法速查](/guide/json-cheatsheet.html)
- [提交 Pull Request 教程](https://www.youtube.com/watch?v=Jp7aMDVXvwM)
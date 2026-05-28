---
title: 贡献技巧
outline: deep
createdDate: 2026-05-28
lastUpdated: 2026-05-28
order: 1
authors:
  - Mark
  - Junming
  - Matthew Ma
---
# 贡献技巧

## 分支命名规范

新建分支时建议遵循以下格式，方便 Reviewer 快速理解改动内容：

| 场景 | 格式 | 示例 |
|---|---|---|
| 新增内容 | `yourname/add-描述-日期` | `jack/add-amazon-interview-0528` |
| 修改已有内容 | `yourname/update-描述-日期` | `jack/update-career-guide-0520` |
| 修复问题 | `yourname/fix-描述-日期` | `jack/fix-broken-link-0515` |

- 只使用小写字母、数字和连字符 `-`
- 描述部分保持简短，说明主要改动即可

## Frontmatter 填写规范

每个 Markdown 文件顶部都需要填写 frontmatter，以下字段为必填或建议填写：

```yaml
---
title: 页面标题          # 必填，显示在侧边栏和浏览器标签
description: 简短描述    # 建议填写，用于 SEO 和页面摘要
outline: deep           # 建议加上，展示完整目录层级
createdDate: YYYY-MM-DD # 必填，首次创建日期
lastUpdated: YYYY-MM-DD # 必填，每次修改时更新为当天日期
order: 1                # 可选，控制侧边栏排序，数字越小越靠前
---
```

> 修改已有文件时，记得同步更新 `lastUpdated` 为当天日期。

## 文件与文件夹命名

| 类型 | 规范 | 示例 |
|---|---|---|
| Markdown 文件 | kebab-case（小写+连字符）| `getting-started.md` |
| 内容文件夹 | kebab-case | `direct-hire-company/` |
| Vue 组件文件 | PascalCase | `JobPostingTable.vue` |

## Markdown 写作规范

- 每个文件只有一个 `# 一级标题`，与 frontmatter 中的 `title` 保持一致
- 使用 `##` 和 `###` 划分内容层级，不跳级使用
- 表格用于对比或列举结构化信息，正文描述用段落或列表
- 代码块注明语言类型（如 ` ```yaml `、` ```shell `）

## 复用现有模板

提交内容前，先确认是否有现成模板可以直接复用，避免重复造轮子：

| 内容类型 | 参考文档 |
|---|---|
| 直招公司信息 | [直招公司信息辅助文档](/guide/direct-hire-company-utils/index.md) |
| 猎头公司信息 | [猎头公司信息辅助文档](/guide/staffing-company-utils/index.md) |
| 面试经验 | [面经投稿手册](/guide/interview-experience-utils/index.md) |

## PR 提交检查清单

提交 PR 前，建议逐项确认：

- [ ] frontmatter 中 `title`、`createdDate`、`lastUpdated` 均已填写
- [ ] 文件和文件夹命名符合 kebab-case 规范
- [ ] 新增文件夹已包含 `index.md`
- [ ] 内部链接路径正确，不使用绝对路径
- [ ] PR 标题简洁描述改动内容，已指定 Reviewer

## 相关资源

- [GitHub 网页端发布 PR 指南](/guide/github-pull-request-guide.md)
- [Markdown 语法速查](/guide/markdown-cheatsheet.md)
- [JSON 语法速查](/guide/json-cheatsheet.md)

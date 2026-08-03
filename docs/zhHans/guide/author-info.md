---
title: 作者信息模块文档
outline: deep
createdDate: 2025-08-01
lastUpdated: 2026-08-02
---
# 作者信息模块

## 功能概述

文章标题上方的作者栏由 `ContributorWrapper` 组件渲染，作者信息有两个来源：

1. **git 提交历史** —— 插件自动从文章的 git 历史中读取提交者
2. **frontmatter 的 `authors` 字段** —— 手动指定作者，显示在 git 作者之前

两个来源都会先通过 `docs/_data/contributors.ts` 中的贡献者档案做映射（插件配置 `mapAuthors: allContributors`），匹配到档案后统一显示档案里的名字和头像，同一个人的不同 git 名字会合并成一条。团队信息页（`/guide/team.html`）也使用同一份数据。

## 设计目的

1. **增强内容可信度**：明确标识文章创作者
2. **建立作者品牌**：通过统一形象展示提升辨识度
3. **版本透明化**：自动关联Git提交记录
4. **读者互动**：为后续添加作者联系功能预留接口

## 使用指南

### 自动集成模式（推荐）

在 `docs/_data/contributors.ts` 的 `currentContributors`（在职）或 `legacyContributors`（离职）数组中添加档案：

```ts
{
  name: 'Jack',                  // 显示在网页上的名字
  username: 'k90zz',             // github用户名，不传 avatar 时用它取github头像
  mapByNameAliases: ['atomeocean jack6', 'jack6'],  // git 提交者名字的映射
  title: 'Developer',            // 不传时默认 Contributor / Alumni
  links: [
    { type: 'github', icon: 'github', link: SOCIAL_LINKS.github('k90zz') },
  ],
},
```

git 提交者的名字（`git config user.name`）如果和 `name`、`username` 都不一致，务必写进 `mapByNameAliases`，否则文章作者栏无法匹配到档案，同一个人会被拆成多条记录。

两个数组的差别只在默认职称（`Contributor` / `Alumni`）和团队信息页的分区展示，作者栏匹配用的是合并后的 `allContributors`。

### 手动配置模式

如果页面作者不是 Git 提交者，或者需要手动指定展示顺序，可以在页面 frontmatter 中添加作者信息。组件会优先读取 `authors`，也兼容 `author` 和 `contributors`。

```markdown
<!-- 文章Front Matter示例 -->
authors:
  - 张三
```

如果作者已经存在于 contributor 数组中，直接写名称、GitHub 用户名或 `mapByNameAliases` 中的别名即可自动匹配头像和主页链接：

```yaml
---
title: 示例文章
authors:
  - Jack
  - BellaZ0317
---
```

也可以在 frontmatter 中直接写完整作者信息：

```yaml
---
title: 示例文章
authors:
  - name: 张三
    avatar: https://example.com/avatar.png
    link: https://example.com/profile
---
```

### 作者主页链接

如果为作者创建了作者主页（`docs/zhHans/guide/author-list/<slug>.md`），在贡献者档案上加一行 `authorPageSlug`：

```ts
{
  name: 'Jack',
  username: 'k90zz',
  authorPageSlug: 'jack',   // 对应 guide/author-list/jack.md
  // ...
},
```

加上之后自动生效，无需改动任何组件：

- 文章作者栏的头像链接到 `/guide/author-list/<slug>`，走站内路由跳转，优先级高于 GitHub 等社交链接
- 团队信息页的成员卡片自动出现作者主页图标

## 技术实现

1. **Git信息抓取**：

   - 自动获取最近提交者的`user.name`和`user.email`
   - 通过GitHub API获取对应头像（如未本地配置）
2. **数据合并**：`docs/.vitepress/theme/utils/contributors.ts` 按 `name`、`username`、`mapByNameAliases` 建立别名索引，frontmatter 作者和 git 作者匹配到同一档案时合并为一条，frontmatter 指定的作者排在前面

## 注意事项

- 头像、跳转链接的优先级：frontmatter 显式配置 > 贡献者档案 > github 用户名推导
- 作者栏的站内链接（作者主页）走 SPA 路由，外部链接在新标签页打开


## 常见问题

### **Q：头像不显示怎么办？**
1. 检查Gravatar邮箱是否匹配
2. 确认本地头像路径正确
3. 查看控制台网络请求

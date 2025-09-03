---
title: 作者信息模块文档
outline: deep
createdDate: 2025-08-01
---

# 作者信息模块

## 功能概述

本模块用于在文章标题上方展示作者信息卡片，包含以下核心功能：
- 作者姓名显示
- 作者头像展示
- Git提交信息集成

## 设计目的

1. **增强内容可信度**：明确标识文章创作者
2. **建立作者品牌**：通过统一形象展示提升辨识度
3. **版本透明化**：自动关联Git提交记录
4. **读者互动**：为后续添加作者联系功能预留接口

## 使用指南

### 自动集成模式（推荐）

在[contributor数组中](/_data/contributors.ts)添加名字等信息

```
{
  name: 'Jack',
  username: 'k90zz',
  mapByNameAliases: ['atomeocean jack6', 'jack6'],
},
```


### 手动配置模式

```markdown
<!-- 文章Front Matter示例 -->
authors:
  - 张三
```

### 显示效果
![作者信息模块示例](https://example.com/author-card-example.png)

*图：包含头像、姓名和最后更新时间的作者卡片*

## 技术实现

1. **Git信息抓取**：

   - 自动获取最近提交者的`user.name`和`user.email`
   - 通过GitHub API获取对应头像（如未本地配置）

## 注意事项


## 常见问题

### **Q：头像不显示怎么办？**
1. 检查Gravatar邮箱是否匹配
2. 确认本地头像路径正确
3. 查看控制台网络请求


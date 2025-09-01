---
title: 招聘信息文档指南
outline: deep
lastUpdated: 2025-04-19
description: 在job compass发布招聘信息的流程
---

# Job Posting发布指南

本文介绍如何按照流程添加一篇招聘信息文档，以便在Job Compass网站上展示相关职位信息。

## 一览流程

| 阶段    | 操作                                | 产出      |
|-------|-----------------------------------|---------|
| 查重    | 搜索官网职位 - 检查仓库是否已有                 | 确认是否需新增 |
| 建公司   | 创建公司文件夹、 `index.md`文件 、 `data/`目录 | 公司文件结构  |
| 建JSON | `data/职位‑发布日期.json`               | 结构化招聘数据 |
| 建MD   | `职位‑发布日期.md` + 组件路径               | 招聘展示页面  |
| 提PR   | 执行校验脚本 - Pull Request             | 等待审核合并  |


## 1 查找招聘信息

在网上找到公司的官网招聘页面，获取完整的职位信息，包括公司名称、职位名称、工作地点、职位要求、薪资范围、福利待遇等信息。

## 2 检查Job Compass仓库是否已有该公司文件夹

在[左边侧边栏的job postings](/job-postings/overview.md) 目录中，查看是否已存在该公司的文件夹。

- **如果不存在**，进入第3步[创建新公司文件夹](#3-创建新公司文件夹)。
- **如果已存在**，跳到第4步[检查该职位是否已存在](#4-检查该职位是否已存在)。

## 3 创建新公司文件夹

若招聘信息中的公司名称未出现在`docs/zhHans/job-postings`目录下，请按以下步骤操作：

### 1. 创建公司文件夹
   
在`docs/zhHans/job-postings`目录下，新建一个文件夹，文件夹名称使用公司英文全称的小写形式

- 要求 
  - 使用公司**英文全称的小写形式**
  - 不使用缩写、大写字母或中文
  - 多个单词间用连字符（`-`）连接
- 示例
  - ✅ 正确：`bloomberg`, `bank-of-america`
  - ❌ 错误：`BB`（缩写）、`Bloomberg`（大写）、`美国银行`（中文）

### 2. 创建`index.md`文件

1. 复制模板内容  
   将[模板文件](/job-postings/job-postings-utils/index.md)的内容复制到 `index.md` 中。

2. 编辑文件标题
  - 修改`title`字段的值（原模板为 `{{公司名称}}`）为正确的公司名称。**一定要去掉双大括号**。
  - 格式要求：使用首字母大写的标准英文名称（如 `Bloomberg`, `Bank of America`）。
  - 示例
    - ✅ 正确：`title: Bloomberg`, `title: Bank of America`
    - ❌ 错误：`title: apple`（未首字母大写）

### 3. 创建`data`子文件夹

在公司文件夹下，创建一个名为`data`的子文件夹。

文件夹结构如下：
```text
docs/
└─ zhHans/
   └─ job-postings/
      └─ 所在公司全称（全小写，无缩写）/
         ├─ index.md
         └─ data/
```

## 4 检查该职位是否已存在

进入公司名称文件夹，检查所找到的招聘信息是否已存在。

该公司的招聘数据存放在`data`文件夹中，每个JSON文件对应一个招聘信息。可以通过**对比招聘链接**来确认是否重复：

- **如果已存在相同职位**，无需重复添加。
- **如果职位信息不存在**，继续[下一步](#5-创建职位json文件)。

## 5 创建职位Json文件

如果该职位信息尚未收录，则在该公司的`data`文件夹中创建一个新的Json文件。

- **文件命名规则：**
    - 文件名应与职位名称匹配
    - 使用**全小写字母**
    - 文件名称最后加上日期作为区分
    - 使用连字符`-`连接
    - 例如：`software-engineer-20250102.json`。
    - 发现同日同岗重名则提示并追加递增序号 -1、-2，例如`software-engineer-20250102-1.json`，`software-engineer-20250102-2.json`

示例: 在公司文件夹下新建
```text
software-engineer-20250102.md
```

## 6 填充招聘信息

将 [模版文件的一键快速复制](toturial-json-template.md#一键快速复制) 中的内容复制到第5步中创建的文件中
   
[JSON 字段说明](toturial-json-template.md#字段解释)

**若招聘信息页面未提供相关内容，可跳过对应字段**

**请确保信息准确，如职位已关闭，请及时更新或删除相关信息**

### 注意事项

1. Json中的值默认使用中文填写
2. 职位链接必须指向公司官方的招聘页面

## 7 创建职位Markdown文件

1. 回到公司名称文件夹，创建一个与第5步同名的Markdown文件，文件名为`职位名称-日期.md`（例如：`software-engineer-20250102.md`）
2. 将[模版文件中的职位markdown文件模板部分](/job-postings/job-postings-utils/job-posting-template.md#职位markdown文件模板) 中的内容复制到该文件中
3. 将片段中的`title`值替换为文件名，并用空格替换连字符，例如：`software engineer 20250102`
4. 将片段中的`{公司名称}`替换为实际公司名称。
   - 示例：`{公司名称} 招聘信息`替换为`Amazon 招聘信息`
5. 找到第8行的**JobPostingTable**组件，将其中的`job-posting-json-path`参数替换为实际JSON文件的路径
    - 模板中的路径格式为：`公司文件夹名/data/职位信息json文件名`
    - 将 `公司文件夹名` 替换为实际的公司名
    - 将 `职位信息json文件名` 替换为第5步所创建的Json文件名
    - 例如 `meta/data/software-engineer-20110313.json`，公司文件名需要**小写**

> [!TIP] 小写路径
> 在job compass项目中和路径相关的变量均为全小写字母，用连字符`-`连接。

## 8 提交PR

完成招聘信息填充后，提交Pull Request（PR）到Job Compass项目。

- 提交自己的修改内容，并确保PR的描述清晰。
- 在[job-compass-discussion Discord频道](https://discord.com/channels/1018973329937420390/1357722435809447956)
  中通知atomeocean开发团队，等待审核。
- 等待审核并进行必要的修改。

## 参考文档

- [Markdown 语法 cheatsheet](/guide/markdown-cheatsheet.md)
- [Json语法cheatsheet](/guide/json-cheatsheet.md)
- [提交 Pull Request 教程](https://www.youtube.com/watch?v=Jp7aMDVXvwM)

### 联系项目管理员

请查看[atomeocean 轻量工作团队指导页面](https://logbook.atomeocean.com/guide/light-weight-work/project-cooperation/project-mentor.html)
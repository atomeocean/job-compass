---
title: 招聘信息文档指南
outline: deep
lastUpdated: 2025-04-19
description: 在job compass发布招聘信息的流程
---

# Job Posting发布指南

> [!NOTE] 本文用途
> 本文介绍如何按照流程添加一篇招聘信息文档，以便在Job Compass网站上展示相关职位信息。

## 🗺️ 一览流程（五大阶段）

| 阶段    | 操作                             | 产出      |
|-------|--------------------------------|---------|
| 查重    | 搜索官网职位 - 检查仓库是否已有              | 确认是否需新增 |
| 建公司   | 创建公司文件夹 / `index.md` / `data/` | 公司文件结构  |
| 建JSON | `data/职位‑发布日期.json`            | 结构化招聘数据 |
| 建MD   | `职位‑发布日期.md` + 组件路径            | 招聘展示页面  |
| 提PR   | 执行校验脚本 - Pull Request          | 等待审核合并  |


## 1 查找招聘信息

在网上找到公司的官网招聘页面，获取完整的职位信息，包括公司名称、职位名称、工作地点、职位要求、薪资范围、福利待遇等信息。

## 2 检查Job Compass仓库是否已有该公司文件夹

前往 [Job Compass 仓库](https://github.com/atomeocean/job-compass) 中的 `docs/zhHans/job-postings` 目录，查看是否已存在该公司的文件夹。

- **如果不存在**，进入第3步[创建新公司文件夹](#3-创建新公司文件夹)。
- **如果已存在**，跳到第4步[检查该职位是否已存在](#4-检查该职位是否已存在)。

## 3 创建新公司文件夹

1. 如果招聘信息中的公司名称未出现在 `docs/zhHans/job-postings` 目录中，请在目录下创建一个新文件夹，命名为公司全称（不要使用缩写）比如Bloomberg，而不是BB。
2. 在公司文件夹下创建一个名为`index.md`的文件，并将 [该模版文件](/job-postings/job-postings-utils/index.md) 中的内容复制到该文件中
3. 将其中的title值 (模版中为`{{公司名称}}`) 改为你所找到的公司名称，例如`Amazon`或`Cloudflare`
4. 在公司文件夹下创建一个名为`data`的子文件夹

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

该公司的招聘数据存放在 `data` 文件夹中，每个JSON文件对应一个招聘信息。可以通过**对比招聘链接**来确认是否重复：

- **如果已存在相同职位**，无需重复添加。
- **如果职位信息不存在**，继续下一步。

## 5 创建职位Json文件

如果该职位信息尚未收录，则在该公司的 `data` 文件夹中创建一个新的Json文件。

- **文件命名规则：**
    - 文件名应与职位名称匹配
    - 使用**全小写字母**
    - 文件名称最后加上日期作为区分
    - 使用连字符`-`连接
    - 例如：`software-engineer-20250102.json`。
    - 发现同日同岗重名则提示并追加 -1、-2，例如`software-engineer-20250102-1.json`，`software-engineer-20250102-2.json`

示例在公司文件夹下新建
```text
software-engineer-20250102.md
```

## 6 填充招聘信息

1. 将 [模版文件的一键快速复制](toturial-json-template.md#一键快速复制) 中的内容复制到第5步中创建的文件中
   
[JSON 字段说明](toturial-json-template.md#字段解释)


**若招聘信息页面未提供相关内容，可跳过对应字段**

**请确保信息准确，如职位已关闭，请及时更新或删除相关信息**

## 7 创建职位Markdown文件

1. 回到公司名称文件夹，创建一个与第5步同名的 Markdown 文件，文件名为`职位名称-日期.md`（例如：`software-engineer-20250102.md`）
2. 将 [模版文件](https://github.com/atomeocean/job-compass/blob/main/docs/zhHans/job-postings/job-postings-utils/job-posting-template.md?plain=1) 中的内容复制到该文件中
3. 将文件第2行中的 `title` 值替换为文件名（用空格替换连字符），例如：`software engineer 20250102`
4. 将文件第6行中的 `[公司名称]` 替换为实际公司名称，例如 `Amazon 招聘信息`
5. 找到第8行的 **JobPostingTable** 组件，将其中的 `job-posting-json-path` 参数替换为实际 JSON 文件的路径
    - 模板中的路径格式为：`公司文件夹名/data/职位信息json文件名`
    - 将 `公司文件夹名` 替换为实际的公司名
    - 将 `职位信息json文件名` 替换为第 5️⃣ 步所创建的Json文件名
    - 例如 `meta/data/software-engineer-20110313.json`，公司文件名需要小写

> [!TIP] 小写路径
> 在job compass项目中和路径相关的变量均为全小写字母，用连字符`-`连接。

## 8 提交PR

完成招聘信息填充后，提交Pull Request（PR）：

- 提交自己的修改内容，并确保PR的描述清晰。
- 等待审核并进行必要的修改。

## 参考文档

- [Markdown 语法 cheatsheet](https://jobcompass.atomeocean.com/guide/markdown-cheatsheet.html)
- [Json 语法 cheatsheet](https://jobcompass.atomeocean.com/guide/json-cheatsheet.html)
- [提交 Pull Request 教程](https://www.youtube.com/watch?v=Jp7aMDVXvwM)
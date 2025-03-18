---
title: 招聘信息文档指南
---

# 📖 Job Posting 使用指南

## 1️⃣ 查找招聘信息

在网上找到公司的官网招聘页面，获取完整的职位信息，包括公司名称、职位名称、工作地点、职位要求、薪资范围、福利待遇等信息。

## 2️⃣ 检查 Job Compass 仓库是否已有该公司文件夹

前往 [Job Compass 仓库](https://github.com/atomeocean/job-compass) 中的 `docs/zhHans/job-postings` 目录，查看是否已存在该公司的文件夹。

- **如果不存在**，跳到第 3️⃣ 步。
- **如果已存在**，跳到第 4️⃣ 步。

## 3️⃣ 创建新公司文件夹

1. 如果招聘信息中的公司名称未出现在 `docs/zhHans/job-postings` 目录中，请在目录下创建一个新文件夹，命名为公司全称（避免使用缩写）
2. 在公司文件夹下创建一个名为`index.md`的文件，并将 [该模版文件](https://github.com/atomeocean/job-compass/blob/main/docs/zhHans/job-postings/job-postings-utils/index.md?plain=1) 中的内容复制到该文件中
3. 将其中的title值 (模版中为`招聘信息辅助文档`) 改为你所找到的公司名称
4. 在公司文件夹下创建一个名为 `data` 的子文件夹
5. 完成以上步骤后，继续后续操作

## 4️⃣ 检查该职位是否已存在

进入公司名称文件夹，检查所找到的招聘信息是否已存在。

该公司的招聘数据存放在 `data` 文件夹中，每个 JSON 文件对应一个招聘信息。可以通过 **对比招聘链接** 来确认是否重复：

- **如果已存在相同职位**，无需重复添加。
- **如果职位信息不存在**，继续下一步。

## 5️⃣ 创建职位 Json 文件

如果该职位信息尚未收录，则在该公司的 `data` 文件夹中创建一个新的 Json 文件。

- **文件命名规则：**
    - 文件名应与职位名称匹配
    - 使用**小写字母**
    - 文件名称最后加上日期作为区分
    - 使用连字符 `-` 连接
    - 例如：`software-engineer-20250102.json`。

## 6️⃣ 填充招聘信息

1. 将 [模版文件](https://github.com/atomeocean/job-compass/blob/main/docs/zhHans/job-postings/job-postings-utils/job-posting-template.json) 中的内容复制到第 5️⃣ 步中创建的文件中
2. 根据找到的招聘内容填充这个模版：
    - **companyName：** 公司名称
    - **jobTitle：** 职位名称
    - **jobLocation：** 列出职位的工作地点，如 Remote（远程）、具体城市或多个地点（如适用），用逗号 , 分隔
    - **jobType：** 职位的类型 （全职，兼职，实习等）
    - **jobResponsibilities：** 请列出招聘信息中对该职位的具体要求，如日常职责和技术能力等
    - **candidateQualifications：**
        - **basicQualifications：** 列出招聘信息中列出的候选人基本条件
        - **preferredQualifications：** 请列出招聘信息中列出的候选人优先条件
    - **salary：** 请填写薪资范围，如 `$80,000 - $100,000 / 年` 或 `$40 - $50 / 小时`，如适用，可追加填写是否包含奖金、股权等
    - **benefits：** 列出已知的福利，如 401(k) 计划、带薪休假、健康保险、是否提供签证赞助等
    - **jobLink：** 真实的招聘链接

**若招聘信息页面未提供相关内容，可跳过对应字段**

**请确保信息准确，如职位已关闭，请及时更新或删除相关信息**

## 7️⃣ 创建职位 Markdown 文件

1. 回到公司名称文件夹，创建一个与第 5️⃣ 步同名的 Markdown 文件，文件名为 `职位名称-日期.md`（例如：`software-engineer-20250102.md`）
2. 将 [模版文件](https://github.com/atomeocean/job-compass/blob/main/docs/zhHans/job-postings/job-postings-utils/job-posting-template.md?plain=1) 中的内容复制到该文件中
3. 将文件中的 `title` 值替换为文件名（用空格替换连字符），例如：`software engineer 20250102`
4. 找到第 8 行的 JobPostingTable 组件，将其中的 `job-posting-json-path` 值替换为实际 JSON 文件的路径
    - 模板中的路径格式为：`公司文件夹名/data/职位信息json文件名`
    - 将 `公司文件夹名` 替换为实际的公司名
    - 将 `职位信息json文件名` 替换为第 5️⃣ 步所创建的Json文件名
    - 例如 `Meta/data/software-engineer-20250313`

## 8️⃣ 提交 PR

完成招聘信息填充后，提交 Pull Request（PR）：

- 提交自己的修改内容，并确保 PR 的描述清晰。
- 等待审核并进行必要的修改。

## 参考文档

- [Markdown 语法 cheatsheet](https://jobcompass.atomeocean.com/guide/markdown-cheatsheet.html)
- [Json 语法 cheatsheet](https://jobcompass.atomeocean.com/guide/json-cheatsheet.html)
- [提交 Pull Request 教程](https://www.youtube.com/watch?v=Jp7aMDVXvwM)
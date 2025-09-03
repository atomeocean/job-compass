---
title: 劳务派遣公司信息文档指南
outline: deep
createdDate: 2025-04-02
lastUpdated: 2025-09-03
---

# Staffing Company使用指南

## 文档概述

本指南旨在为劳务派遣公司信息收集任务提供清晰的操作指引，帮助相关人员高效、准确地完成数据采集任务。文档内容涵盖三大任务核心模块：

- **公司基础信息收集：** 包括公司名称、地址、联系方式、行业类别、成立年份等信息
- **招聘信息收集：** 收集recruiter在网上发布的招聘信息及岗位要求等内容
- **市场评价收集：** 收集公司的行业信誉及员工真实体验，为用户规避高风险企业

通过规范化的流程设计，确保所收集数据的完整性和可靠性，为后续分析决策提供有力支持。工作人员可根据实际需求灵活参考本指南内容。

## 任务模块指南

### 快速开始

#### 1 公司查找

在网上查找劳务派遣公司的相关信息资料，内容涵盖范围包括完整的公司静态信息，如公司名称、地址、联系方式、行业类别、成立年份等，以及职位招聘信息和市场反馈

#### 2 检查仓库中是否已存在该公司文件

在侧边栏[staffing-company目录](/staffing-company/overview.md)，查看该目录下是否已经存在该公司名称的文件

- **如果已存在**，可跳过**快速开始**的后续步骤，直接跳转至下方对应的任务模块指南
- **如果未存在**，需要在当前目录下创建一个以该公司名称命名的Markdown文件
  1. 在当前文件夹下创建一个新的Markdown文件，文件名称为公司名称全拼（命名规则：公司全称小写，单词间用连字符连接）
  2. 将[模版文件](/guide/staffing-company-utils/company-info-template.md) 中的内容复制到你所创建的文件中
  3. 将第2行的 `title` 的值以及第5行的 `[公司名称]` 分别替换为实际的公司名称
  4. 跳转至下方对应的任务模块指南

### 任务一：公司基础信息收集

#### 1 创建公司 Json 文件

前往[data 目录](/staffing-company/data)，查看找到的公司信息是否已存在

如果该公司信息尚未收录，则在当前文件夹中创建一个新的Json文件。

- **文件命名规则：**
    - 文件名应与公司名称匹配
    - 使用**小写字母**
    - 使用连字符 `-` 连接

#### 2 填充公司信息

1. 将[模版文件](/guide/staffing-company-utils/company-info-json-template.md)中的内容复制到第1步中创建的文件中
2. 根据找到的公司信息填充这个模版：
    - **companyName：**
        - **companyName：** 公司名称
        - **foundedYear：** 公司成立年份
        - **contact：**
            - **phone：** 电话
            - **email：** 邮箱
            - **website：** 官网网址
        - **location：**
            - **addressLine1：** 地址第一行（如街道地址）
            - **addressLine2：** 地址第二行（如楼层或套房号，可选）
            - **county：** 县名（如适用，例如 "King County"）
            - **cityOrTown：** 城市或乡镇名
            - **state：** 州代码（例如 "CA"）
            - **zipCode：** 邮政编码
        - **industry：** 行业类别（如 "科技"、"电子商务"），用数组列出
    - **staffingAgencyPosition：**
        - **jobType：** 岗位类型（如 "合同工"、"全职"）
        - **usIdentitySupport：** 支持的在美身份类型（如"支持 OPT / STEM OPT"）
        - **payStubSupport：**  是否提供工资单支持
        - **recruitmentProcess：** 招聘流程
    - **recruiterInformation：** recruiter信息，可提供多个，用数组列出
        - **name：** 姓名
        - **email：** 邮箱
        - **wechat：** 微信号
        - **linkedin：** 领英
        - **xiaohongshu：** 小红书号/昵称
    - **training：**
        - **content：** 培训内容
        - **duration：** 培训时长
        - **cost：** 培训费用
        - **remoteAllowed：** 是否接受异地培训
        - **location：** 培训地址
        - **penaltyForTermination：** 培训期间离职违约金
    - **marketing：**
        - **duration：** marketing 时长
        - **preparation：** marketing 准备内容
        - **cost：** marketing 费用
        - **remoteAllowed：** marketing 期间是否支持异地
        - **location：** marketing 地址
        - **penaltyForTermination：** marketing 期间离职违约金
    - **lastUpdated：** 最后更新日期

**若信息来源未提供相关内容，可跳过对应字段。**

#### 3 修改公司Markdown文件

1. 前往[staffing-company 目录](/staffing-company/overview.md) 中，找到公司同名的Markdown文件
2. 在该文件中找到StaffingCompanyTable标签，大约在第9行附近
3. 将标签中的 `companyJsonFileName` 值替换为上一步修改的json文件名

### 任务二：招聘信息收集

**信息归类：**
- 将收集到的招聘信息整理到 `## 招聘信息` 标题下
- 按信息发布时间设立三级标题，例如 `### 2024年12月`

**排序规则：**
- 采用时间倒序排列，最新发布的招聘信息置于最上方
- 日期格式统一为"YYYY年MM月"

### 任务三：市场评价收集

**信息归类：**
- 将收集到的市场评价信息整理到 `## 航海日志` 标题下
- 按信息发布时间设立三级标题，例如 `### 2024年12月`

**排序规则：**
- 采用时间倒序排列，最新发布的招聘信息置于最上方
- 日期格式统一为"YYYY年MM月"

### 提交 PR

完成上面任务后，通过GitHub提交Pull Request（PR）：

- 提交自己的修改内容，并确保PR的描述清晰。
- 等待审核并进行必要的修改。

## 参考文档

- [Markdown 语法 cheatsheet](/guide/markdown-cheatsheet.md)
- [Json 语法 cheatsheet](/guide/json-cheatsheet.md)
- [提交 Pull Request 教程](https://www.youtube.com/watch?v=Jp7aMDVXvwM)
---
title: 直招公司信息文档指南
description: 直招公司信息文档指南，提供如何查找、创建和填充直招公司信息的详细步骤。
outline: deep
lastUpdated: 2025-05-31
createdDate: 2025-03-19
---

# Direct Hire Company 添加流程

## 1 查找公司信息

在网上找到公司的官方网站或其他可靠来源（如LinkedIn、工商注册信息等），获取完整的公司静态信息，包括公司名称、地址、联系方式、行业类别、成立年份等信息。

## 2 检查仓库中是否已有该公司所在州的文件夹

查看左边侧边栏[上岸公司目录](/direct-hire-company/overview.md)，查看是否已存在该公司所在州的文件夹。

- **如果已存在**，直接跳到第3步。
- **如果不存在**，需要创建所在州的文件目录
    - 在当前路径下新建一个以州名称命名的文件夹
      - 命名规则：州全称小写，单词间用连字符连接
      - 例如 new-york
    - 进入该文件夹，在其中创建一个名为`index.md`的文件
    - 将 [该代码片段](/guide/direct-hire-company-utils/company-info-template.md#state-folder-index-md-file) 中的内容复制到创建的`index.md`文件中
    - 将 `title` 的值替换为州名称，例如 `New York`

## 3 检查是否已有该公司所在城市的文件夹

进入公司所在州的文件夹，查看是否已存在该公司所在城市的文件夹

- **如果已存在**，直接跳到第4步。
- **如果不存在**，需要创建所在城市的文件目录
    - 在当前路径下新建一个以城市名称命名的文件夹
      - 命名规则：城市全称小写，单词间用连字符连接
      - 例如`san-francisco`
    - 进入该文件夹，在其中创建一个名为`index.md`的文件 和 一个名为`data`的文件夹
    - 将 [该代码片段](/guide/direct-hire-company-utils/company-info-template.md#city-folder-index-md-file) 中的内容复制到创建的`index.md`文件中
    - 将 `title` 的值替换为城市名称，例如 `San Francisco`

## 4 创建公司的Json文件

进入公司所在城市的文件夹，查看找到的公司信息是否已存在。

如果该公司信息尚未收录，则进入当前文件夹中的 `data` 文件夹，在其中创建一个新的Json文件。

- **文件命名规则：**
    - 文件名应与公司名称匹配
    - 使用**小写字母**
    - 使用连字符 `-` 连接
    - 例如：`amazon.json`或 `google-cloud.json`

## 5 填充公司信息

1. 将 [json模版文件](/guide/direct-hire-company-utils/company-info-json-template.md) 中的内容复制到第4步中创建的文件中。
2. 根据找到的公司信息填充这个模版：
    - **companyName：** 公司名称（全称）。
    - **location：**
        - **addressLine1：** 地址第一行（如街道地址）。
        - **addressLine2：** 地址第二行（如楼层或套房号，可选）。
        - **county：** 县名（如适用，例如 "King County"）。
        - **cityOrTown：** 城市或乡镇名。
        - **state：** 州代码（例如 "CA"）。
        - **zipCode：** 邮政编码。
    - **contact：**
        - **phone：** 公司电话号码。
        - **email：** 公司邮箱。
        - **website：** 公司官网链接。
        - **linkedin：** 公司LinkedIn页面链接。
    - **industry：** 行业类别（如 "科技"、"电子商务"），用数组列出。
    - **foundedYear：** 公司成立年份。
    - **description：** 公司简介。
    - **mainProductsOrServices：** 主要产品或服务，用数组列出。
    - **companySize：** 公司规模（如"约500人"或"超过10万员工"）。
    - **lastUpdated：** 信息最后更新日期（如 "2025-03-20"）。

**若信息来源未提供相关内容，可跳过对应字段。**

## 6 创建公司的Markdown文件

1. 回到公司所在城市文件夹，创建一个与第4步同名的 Markdown 文件，例如 `amazon.md`
2. 将 [模版文件](/guide/direct-hire-company-utils/company-info-template.md#company-file) 中的内容复制到该文件中
3. 替换实际公司名称
4. 在DirectHireCompanyTable组件，将其中的 `州名` 、 `城市名` 和 `公司文件名` 值替换为实际值：
    - state：州文件夹名称，例如`new-york`
    - city：城市文件夹名称，例如`san-francisco`
    - companyJsonFileName：第4步所创建的json文件名

## 7 提交PR

完成公司信息填充后，提交Pull Request（PR）：

- 提交自己的修改内容，并确保PR的描述清晰。
- 等待审核并进行必要的修改。

## 参考文档

- [Markdown 语法 cheatsheet](https://jobcompass.atomeocean.com/guide/markdown-cheatsheet.html)
- [Json 语法 cheatsheet](https://jobcompass.atomeocean.com/guide/json-cheatsheet.html)
- [提交 Pull Request 教程](https://www.youtube.com/watch?v=Jp7aMDVXvwM)
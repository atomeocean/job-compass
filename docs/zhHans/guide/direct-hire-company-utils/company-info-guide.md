---
title: 直招公司信息文档指南
description: 直招公司信息文档指南，提供如何查找、创建和填充直招公司信息的详细步骤。
outline: deep
lastUpdated: 2026-05-05
createdDate: 2025-03-19
adminNote: 以这篇为准
---
# Direct Hire Company 添加流程

> [!CAUTION] 添加前阅读
> 请确保在添加一家直招公司信息前，Job Compass 已经存在该公司的面试经验文档（可先在 Job Compass 的「面试经验」板块或相关仓库目录中按公司名称搜索进行确认）。
> 如果确认不存在，请先补充或创建该公司的面试经验文档，再回来添加该公司的信息。
> 单独添加直招公司信息而没有对应的面试经验文档，可能会导致PR被直接关闭。

## 流程概览

| 步骤 | 操作 | 产出文件 |
|:---:|---|---|
| [Step 1](#1-查找公司信息) | 查找公司信息 | 公司资料清单 |
| [Step 2](#2-检查州文件夹) | 检查/创建州文件夹 | `state/index.md` |
| [Step 3](#3-检查城市文件夹) | 检查/创建城市文件夹 | `state/city/index.md` |
| [Step 4](#4-创建公司的json文件) | 创建 JSON 数据文件 | `state/city/data/company.json` |
| [Step 5](#5-填充公司信息) | 填充 JSON 数据 | 完成的公司数据 |
| [Step 6](#6-创建公司的markdown文件) | 创建公司页面 | `state/city/company.md` |
| [Step 7](#7-提交pr) | 提交 Pull Request | 上线 |

---

## 1 查找公司信息

从网上找到公司的官方网站或其他可靠来源（LinkedIn、工商注册信息等），获取完整的公司静态信息：

| 字段 | 说明 |
|---|---|
| 公司名称 | 全称 |
| 地址 | 街道地址、城市、州、邮编 |
| 联系方式 | 电话、邮箱、官网、LinkedIn |
| 行业类别 | 如"科技"、"电子商务" |
| 成立年份 | 公司成立年份 |
| 公司规模 | 员工数量 |
| 主要产品/服务 | 具体产品或服务列表 |

---

## 2 检查州文件夹

查看左边侧边栏[上岸公司目录](/direct-hire-company/overview.md)，确认是否已存在该公司所在州的文件夹。

### 路径

```
docs/zhHans/direct-hire-company/
```

### 判断

| 情况 | 操作 |
|---|---|
| **已存在** | 直接进入 [Step 3](#3-检查城市文件夹) |
| **不存在** | 按下方步骤创建 |

### 创建州文件夹

1. 在 `docs/zhHans/direct-hire-company/` 下新建文件夹
2. 命名规则：**州全称小写，单词间用连字符**
   - 例如：`new-york`、`california`、`texas`
3. 进入该文件夹，创建 `index.md`
4. 内容模板：

```markdown
---
title: New York
---
```

---

## 3 检查城市文件夹

进入公司所在州的文件夹，确认是否已存在该公司所在城市的文件夹。

### 路径示例

```
docs/zhHans/direct-hire-company/new-york/   # 州
docs/zhHans/direct-hire-company/new-york/new-york/   # 城市
```

### 判断

| 情况 | 操作 |
|---|---|
| **已存在** | 直接进入 [Step 4](#4-创建公司的json文件) |
| **不存在** | 按下方步骤创建 |

### 创建城市文件夹

1. 在州文件夹下新建城市文件夹
2. 命名规则：**城市全称小写，单词间用连字符**
   - 例如：`san-francisco`、`new-york`、`los-angeles`
3. 进入该文件夹，创建 `index.md` 和 `data` 文件夹
4. `index.md` 内容模板：

```markdown
---
title: New York
---
```

---

## 4 创建公司的 JSON 文件

进入公司所在城市的文件夹，检查是否已存在该公司信息。

### 文件结构

```
城市文件夹/
├── index.md
├── data/                  # 必须有 data 文件夹
│   └── amazon.json        # JSON 数据文件
└── amazon.md              # 公司页面
```

### 创建步骤

1. 进入城市文件夹的 `data/` 目录
2. 创建新的 JSON 文件
3. **命名规则**：
   - 小写字母
   - 连字符连接
   - 例如：`amazon.json`、`google-cloud.json`

---

## 5 填充公司信息

1. 从 [JSON 模板](/guide/direct-hire-company-utils/company-info-json-template.md) 复制内容
2. 粘贴到第4步创建的 JSON 文件中
3. 替换以下字段值：

| 字段 | 说明 | 示例 |
|---|---|---|
| `companyName` | 公司全称 | `"Amazon (Headquarters)"` |
| `addressLine1` | 地址第一行 | `"410 Terry Ave N"` |
| `addressLine2` | 地址第二行（可选） | `"Suite 100"` |
| `county` | 县名 | `"King County"` |
| `cityOrTown` | 城市名 | `"Seattle"` |
| `state` | 州代码 | `"WA"` |
| `zipCode` | 邮政编码 | `"98109"` |
| `phone` | 电话 | `"+1-206-266-1000"` |
| `email` | 邮箱 | `"contact@company.com"` |
| `website` | 官网链接 | `"https://www.amazon.com"` |
| `linkedin` | LinkedIn 链接 | `"https://linkedin.com/company/amazon"` |
| `industry` | 行业类别（数组） | `["科技", "电子商务"]` |
| `foundedYear` | 成立年份 | `"1994"` |
| `description` | 公司简介 | `"..."` |
| `mainProductsOrServices` | 主要产品/服务（数组） | `["AWS", "Prime"]` |
| `companySize` | 公司规模 | `"超过 30 万员工"` |
| `lastUpdated` | 最后更新日期 | `"2025-03-19"` |

> [!NOTE] 字段可选性
> 若信息来源未提供相关内容，可跳过对应字段。

---

## 6 创建公司的 Markdown 文件

### 创建文件

在公司所在城市文件夹中，创建一个与 JSON 文件同名的 Markdown 文件：

```
docs/zhHans/direct-hire-company/washington/seattle/amazon.md
```

### 文件内容模板

```markdown
---
title: Amazon
outline: deep
createdDate: 2025-03-19
lastUpdated: 2025-03-19
---

# Amazon 亚马逊

## 公司信息

<DirectHireCompanyTable state="washington" city="seattle" companyJsonFileName="amazon" />
```

### 组件参数说明

| 参数 | 值 | 说明 |
|---|---|---|
| `state` | `"washington"` | 州文件夹名称（小写，连字符） |
| `city` | `"seattle"` | 城市文件夹名称（小写，连字符） |
| `companyJsonFileName` | `"amazon"` | JSON 文件名（不含扩展名） |

---

## 7 提交 PR

### 提交修改

```bash
git add .
git commit -m "feat: 添加 Amazon 公司信息"
git push origin your-branch-name
```

### PR 描述模板

```markdown
## 添加公司信息

- **公司名称**: Amazon
- **所在州**: Washington
- **所在城市**: Seattle
- **信息来源**: 官网、LinkedIn

### 创建的文件

- `docs/zhHans/direct-hire-company/washington/seattle/data/amazon.json`
- `docs/zhHans/direct-hire-company/washington/seattle/amazon.md`
```

### 后续

- 等待审核并进行必要的修改
- PR 合并后自动部署上线

---

## 参考文档

- [完整示例（Amazon）](/guide/direct-hire-company-utils/company-info-example.md)
- [常见问题解答](/guide/direct-hire-company-utils/company-info-faq.md)
- [Markdown 语法速查](/guide/markdown-cheatsheet.html)
- [JSON 语法速查](/guide/json-cheatsheet.html)
- [提交 Pull Request 教程](https://www.youtube.com/watch?v=Jp7aMDVXvwM)
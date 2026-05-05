---
title: 直招公司添加完整示例
description: 以 Amazon 为例，演示从创建州文件夹到提交 PR 的完整添加流程
outline: deep
createdDate: 2025-03-19
lastUpdated: 2026-05-05
---
# 直招公司添加完整示例

本文以 **Amazon** 为例，演示如何将一家直招公司添加到 Job Compass。

> [!NOTE] 前提条件
> 在开始之前，请确认 Job Compass 已存在该公司的面试经验文档。可以在[面试经验板块](/interview-experience/overview.md)搜索确认。

---

## 目标

添加 Amazon 公司信息到以下路径：
```
docs/zhHans/direct-hire-company/washington/seattle/
```

最终需要创建的文件：
```
seattle/
├── index.md          # 城市页面
├── data/
│   └── amazon.json   # 公司数据
└── amazon.md          # 公司展示页面
```

---

## Step 1：确认路径是否存在

### 检查州文件夹

查看 `docs/zhHans/direct-hire-company/washington/` 是否存在。

**如果存在** → 跳过到 Step 2
**如果不存在** → 按[指南创建州文件夹](/guide/direct-hire-company-utils/company-info-guide.md#2-检查仓库中是否已有该公司所在州的文件夹)

### 检查城市文件夹

查看 `docs/zhHans/direct-hire-company/washington/seattle/` 是否存在。

**如果存在** → 跳过到 Step 2
**如果不存在** → 按[指南创建城市文件夹](/guide/direct-hire-company-utils/company-info-guide.md#3-检查是否已有该公司所在城市的文件夹)

### 本例结果

本例中，`washington` 州和 `seattle` 市都已存在，所以直接进入 Step 2。

---

## Step 2：查找公司信息

从官网、LinkedIn 或工商注册信息等可靠来源获取：

| 字段 | 示例值 |
|---|---|
| 公司名称 | Amazon (Headquarters) |
| 地址 | 410 Terry Ave N, Seattle, WA 98109 |
| 电话 | +1-206-266-1000 |
| 邮箱 | amazon-pr@amazon.com |
| 官网 | https://www.amazon.com |
| LinkedIn | https://www.linkedin.com/company/amazon |
| 行业 | 科技、电子商务、云计算 |
| 成立年份 | 1994 |
| 公司规模 | 超过 30 万员工 |

---

## Step 3：创建 JSON 文件

进入 `docs/zhHans/direct-hire-company/washington/seattle/data/` 目录。

创建 `amazon.json` 文件，内容如下：

```json
{
  "companyInfo": {
    "companyName": "Amazon (Headquarters)",
    "location": {
      "addressLine1": "410 Terry Ave N",
      "addressLine2": "",
      "county": "King County",
      "cityOrTown": "Seattle",
      "state": "WA",
      "zipCode": "98109"
    },
    "contact": {
      "phone": "+1-206-266-1000",
      "email": "amazon-pr@amazon.com",
      "website": "https://www.amazon.com",
      "linkedin": "https://www.linkedin.com/company/amazon"
    },
    "industry": ["科技", "电子商务", "云计算"],
    "foundedYear": "1994",
    "description": "亚马逊西雅图分部作为全球总部，专注于电子商务、通过 AWS 提供的云计算以及创新技术解决方案。",
    "mainProductsOrServices": [
      "Amazon Web Services (AWS)",
      "Amazon Marketplace",
      "Alexa",
      "Prime Services"
    ],
    "companySize": "超过 30 万员工"
  },
  "metadata": {
    "lastUpdated": "2025-03-19"
  }
}
```

> [!TIP] 快速复制
> 从 [JSON 模板](/guide/direct-hire-company-utils/company-info-json-template.md) 复制，然后替换字段值。

---

## Step 4：创建 Markdown 文件

回到 `docs/zhHans/direct-hire-company/washington/seattle/` 目录。

创建 `amazon.md` 文件，内容如下：

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

> [!TIP] 组件参数说明
> - `state`：州文件夹名称（小写，连字符）
> - `city`：城市文件夹名称（小写，连字符）
> - `companyJsonFileName`：JSON 文件名（不含扩展名）

---

## Step 5：提交 Pull Request

### 5.1 提交修改

```bash
git add .
git commit -m "feat: 添加 Amazon 公司信息"
```

### 5.2 推送并创建 PR

```bash
git push origin your-branch-name
# 然后在 GitHub 上创建 Pull Request
```

### 5.3 PR 描述模板

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

---

## 验证结果

PR 合并后，访问 `/direct-hire-company/washington/seattle/amazon` 即可看到 Amazon 的公司信息页面。

---

## 常见问题

| 问题 | 解决方案 |
|---|---|
| 组件显示"No data" | 检查 JSON 文件是否放在 `data/` 文件夹中，文件名是否与 `companyJsonFileName` 匹配 |
| 页面 404 | 确认 URL 路径与实际文件夹结构一致 |
| JSON 格式错误 | 使用 [JSON 语法检查工具](https://www.json.cn/) 验证 |

如有其他问题，请查看[常见错误处理](/guide/direct-hire-company-utils/company-info-faq.md)或提交 Issue。
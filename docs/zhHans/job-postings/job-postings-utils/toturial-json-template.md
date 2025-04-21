---
title: 职位发布json模板
outline: deep
lastUpdated: 2025-04-19 
---
# Job Compass 职位发布json模板

本模板用于标准化公司职位发布信息，适用于程序化展示、导入数据库或 API 接口调用。

## Json模板

### 一键快速复制

```json5
{
  "companyName": "",
  "jobTitle": "",
  "jobLocation": [],
  "jobType": "",
  "jobResponsibilities": [],
  "candidateQualifications": {
    "basicQualifications": [],
    "preferredQualifications": []
  },
  "salary": [],
  "benefits": [],
  "jobLink": ""
}
```

### 字段解释

| **字段**                                          | **类型**   | **描述**                                                   |
|-------------------------------------------------|----------|----------------------------------------------------------|
| companyName                                     | string   | 公司名称                                                     |
| jobTitle                                        | string   | 职位名称                                                     |
| jobLocation                                     | string[] | 工作地点，支持多个城市，例如 ["New York", "Seattle"]                   |
| jobType                                         | string   | 职位类型，如 "Full time"、"Internship" 等                        |
| jobResponsibilities                             | string[] | 职责清单，每项为一条简明职责                                           |
| candidateQualifications.basicQualifications     | string[] | 必需的基本条件                                                  |
| candidateQualifications.preferredQualifications | string[] | 非必须但优先考虑的条件                                              |
| salary                                          | string[] | 薪资范围或结构，例如 ["$90,000 - $120,000/year"] 或 ["Competitive"] |
| benefits                                        | string[] | 福利信息，如医保、401k、股票期权等                                      |
| jobLink                                         | string   | 职位原始链接，供跳转参考                                             |

### 示例

> [!TIP] 请使用双引号
> 在 JSON 中，字段名和字符串的值都必须使用双引号（"），单引号将导致解析错误。

```json5
{
  "companyName": "Amazon",
  "jobTitle": "Data Engineer",
  "jobLocation": ["New York", "Remote"],
  "jobType": "Full time",
  "jobResponsibilities": [
    "设计和实施可扩展的数据管道",
    "与数据科学家合作构建可靠的数据模型",
    "优化数据访问和转换工作流程"
  ],
  "candidateQualifications": {
    "basicQualifications": [
      "计算机科学、工程或相关领域的学士学位",
      "3年以上SQL和数据建模经验",
      "熟练掌握至少一门编程语言（如Python或Java）"
    ],
    "preferredQualifications": [
      "定量领域的硕士学位",
      "具有AWS服务使用经验（如Redshift、S3、EMR）",
      "熟悉Spark或Hadoop等大数据工具"
    ]
  },
  "salary": ["$110,000 - $140,000/year"],
  "benefits": [
    "综合健康保险",
    "公司匹配的401(k)退休计划",
    "股票期权",
    "弹性工作时间"
  ],
  "jobLink": "https://www.amazon.jobs/en/jobs/1234567/data-engineer"
}
```
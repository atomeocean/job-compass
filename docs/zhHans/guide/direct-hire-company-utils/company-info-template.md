---
title: 直招公司信息文档模版
description: 直招公司信息文档模版，方便复制
outline: deep
createdDate: 2025-03-19
lastUpdated: 2025-09-03
---
# 直招公司信息文档模版汇总

## state folder index md file

请复制下面的代码到对应州的文件夹中，文件名为 `index.md`。
```markdown
---
title: state name
---
```

### 举例

```markdown
---
title: New York
---
```

## city folder index md file

请复制下面的代码到对应城市的文件夹中，文件名为 `index.md`。
```markdown
---
title: city name
---
```

### 举例

```markdown
---
title: San Francisco
---
```

## company file


```markdown
---
title: {{公司名称}}
---
# {{公司名称}}

## 公司信息

<DirectHireCompanyTable state="州名" city="城市名" companyJsonFileName="公司文件名" />

```

### 举例

```markdown
---
title: Amazon
---
# Amazon

## 公司信息

<DirectHireCompanyTable state="washington" city="seattle" companyJsonFileName="amazon" />
```

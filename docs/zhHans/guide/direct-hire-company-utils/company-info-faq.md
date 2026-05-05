---
title: 直招公司添加常见问题
description: 解答在添加直招公司信息时遇到的常见问题
outline: deep
createdDate: 2025-03-19
lastUpdated: 2026-05-05
---

# 直招公司添加常见问题

## 文件结构问题

### Q: 找不到州文件夹怎么办？

**A:** 需要在 `docs/zhHans/direct-hire-company/` 下创建新州文件夹。

**操作步骤：**

1. 在 `docs/zhHans/direct-hire-company/` 下创建州文件夹
2. 文件夹命名规则：小写，连字符
   - 例如：`new-york`、`texas`、`california`
3. 在文件夹内创建 `index.md`：

```markdown
---
title: New York
---
```

### Q: 城市文件夹和州文件夹有什么区别？

**A:** 两层嵌套关系：

```
docs/zhHans/direct-hire-company/
└── california/          # 州文件夹
    └── san-francisco/   # 城市文件夹
        ├── index.md
        ├── amazon.md
        └── data/
            └── amazon.json
```

- **州文件夹**：`title` 填州名，路径用于按州筛选
- **城市文件夹**：`title` 填城市名，路径用于按城市筛选

### Q: 城市文件夹需要创建哪些文件？

**A:** 必须包含：

```
城市名/
├── index.md              # 城市页面（必须有）
├── data/                 # 数据文件夹（必须有）
│   ├── company-a.json    # 公司数据文件
│   └── company-b.json
└── company-a.md          # 公司展示页面
└── company-b.md
```

---

## JSON 相关问题

### Q: JSON 格式报错怎么解决？

**A:** 常见原因和解决方法：

| 错误类型 | 解决方法 |
|---|---|
| 多余逗号 | 删除数组或对象末尾的逗号 |
| 引号不匹配 | 确保所有字符串用双引号 `"` |
| 缺少引号 | 字段名必须加引号，如 `"companyName"` |
| 中文乱码 | JSON 本身支持 UTF-8，中文直接写即可 |

> [!TIP] 快速验证
> 复制 JSON 内容到 [JSON 验证工具](https://www.json.cn/) 检查语法。

### Q: JSON 中的字段可以留空吗？

**A:** 可以。信息来源未提供的字段可以留空或省略，但注意：

- **必填字段**：`companyName`、`cityOrTown`、`state`、`zipCode`
- **可选字段**：`addressLine2`、`county`、`phone`、`email`、`linkedin`

### Q: industry 和 mainProductsOrServices 有什么区别？

**A:**

| 字段 | 含义 | 示例 |
|---|---|---|
| `industry` | 行业类别 | `["科技", "电子商务"]` |
| `mainProductsOrServices` | 具体产品/服务 | `["AWS", "Prime"]` |

---

## 组件相关问题

### Q: 组件显示"No data"怎么解决？

**A:** 按以下顺序检查：

1. **JSON 文件位置** → 确保在 `data/` 文件夹中
2. **文件名匹配** → 检查 `companyJsonFileName` 是否与 JSON 文件名一致（不含扩展名）
3. **JSON 结构** → 确保包含 `companyInfo` 顶层字段

**示例：**
```markdown
<!-- ✅ 正确：文件名匹配且在 data/ 文件夹中 -->
<DirectHireCompanyTable state="washington" city="seattle" companyJsonFileName="amazon" />
<!-- 文件路径: data/amazon.json -->

<!-- ❌ 错误：文件名不匹配 -->
<DirectHireCompanyTable state="washington" city="seattle" companyJsonFileName="amazon-data" />
<!-- 实际文件: data/amazon.json -->
```

### Q: 页面显示 404 怎么解决？

**A:** 检查 URL 路径是否与实际文件夹结构一致。

例如，Amazon 的路径应该是：
```
/direct-hire-company/washington/seattle/amazon
```

对应文件位置：
```
docs/zhHans/direct-hire-company/washington/seattle/amazon.md
```

### Q: 组件参数可以怎么调整？

**A:** `DirectHireCompanyTable` 有三个参数：

| 参数 | 说明 | 示例 |
|---|---|---|
| `state` | 州文件夹名称（小写，连字符） | `"washington"` |
| `city` | 城市文件夹名称（小写，连字符） | `"seattle"` |
| `companyJsonFileName` | JSON 文件名（不含扩展名） | `"amazon"` |

---

## Git 操作问题

### Q: 提交 PR 需要注意什么？

**A:**

1. **PR 标题清晰**：`feat: 添加 Amazon 公司信息`
2. **描述包含**：
   - 公司名称和位置
   - 创建的文件列表
   - 信息来源
3. **等待审核**可能会有修改建议，按要求调整

### Q: 可以一次性添加多家公司吗？

**A:** 可以。在同一个 PR 中添加多个公司的文件夹/文件即可。

---

## 其他问题

### Q: 面试经验文档还没创建，可以先添加公司信息吗？

**A:** 不可以。根据[添加前阅读](/guide/direct-hire-company-utils/company-info-guide.md#添加前阅读)，必须先有面试经验文档才能添加公司信息。

**操作顺序：**
1. 先在[面试经验板块](/interview-experience/overview.md)搜索或创建该公司面试经验
2. 再回来添加公司信息

### Q: 公司总部和分部需要分别添加吗？

**A:** 如果公司有多个办公地点，可以按城市分别添加。但建议：

- **如果是公司总部**，在 JSON 的 `companyName` 中注明，如 `"Amazon (Headquarters)"`
- **如果是分部**，在 `location` 中填写具体地址，并在 `description` 中说明

### Q: 添加完成后多久能上线？

**A:** PR 合并后，CI/CD 会自动部署，通常几分钟内生效。如有问题可在 PR 中留言或提交 Issue。
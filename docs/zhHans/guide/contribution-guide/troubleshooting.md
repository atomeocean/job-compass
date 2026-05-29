---
title: 常见问题排查
outline: deep
createdDate: 2026-05-28
lastUpdated: 2026-05-28
order: 2
authors:
  - Mark
---
# 常见问题排查

## 侧边栏问题

### 新增文件后侧边栏没有显示

| 可能原因 | 解决方法 |
|---|---|
| 文件名包含大写字母或空格 | 重命名为 kebab-case，如 `my-page.md` |
| 新建了文件夹但没有 `index.md` | 在文件夹内创建 `index.md` 并填写 frontmatter |
| 本地开发服务器缓存 | 停止后重新运行 `npm run docs:dev` |

### 侧边栏顺序不符合预期

侧边栏默认按文件名字母顺序排列。如需自定义顺序，在 frontmatter 中添加 `order` 字段：

```yaml
---
order: 1   # 数字越小越靠前
---
```

## 构建与开发服务器问题

### `npm run docs:dev` 启动失败

1. 确认已安装依赖：在项目根目录运行 `npm install`
2. 检查 Node.js 版本是否符合要求（推荐 18+）：运行 `node -v`
3. 删除缓存后重试：删除 `docs/.vitepress/cache/` 文件夹，再重新启动

### `npm run docs:build` 报错

| 错误信息关键词 | 可能原因 | 解决方法 |
|---|---|---|
| `Cannot find module` | 路径别名或组件引用错误 | 检查组件导入路径，确认使用 `@ao-` 前缀别名 |
| `SyntaxError` in `.json` | JSON 文件格式错误 | 用 [JSON 语法速查](/guide/json-cheatsheet.md) 核对格式 |
| `Hydration mismatch` | 组件 SSR 渲染不一致 | 避免在模板中使用动态组件 `<component :is="...">`，改用 `v-if/v-else` |
| `broken link` | 内部链接路径错误 | 检查链接路径是否与实际文件路径一致 |

## 组件与数据显示问题

### 组件渲染但不显示数据

以表格类组件（如 `DirectHireCompanyTable`）为例，检查以下三个参数是否与实际文件路径一致：

```md
<DirectHireCompanyTable
  state="california"          <!-- 必须与州文件夹名完全一致 -->
  city="san-francisco"        <!-- 必须与城市文件夹名完全一致 -->
  companyJsonFileName="amazon" <!-- 必须与 .json 文件名（不含扩展名）完全一致 -->
/>
```

### JSON 文件解析报错

常见 JSON 语法错误：

```json
// 错误：字段名未加引号
{ name: "Amazon" }

// 错误：末尾多余逗号
{ "name": "Amazon", }

// 正确写法
{ "name": "Amazon" }
```

详细规则参考 [JSON 语法速查](/guide/json-cheatsheet.md)。

## Git 与 PR 问题

### 提交 PR 后出现 merge conflict

1. 在本地切换到你的分支
2. 拉取最新的 `main` 分支：`git fetch origin main`
3. 将 `main` 合并到当前分支：`git merge origin/main`
4. 解决冲突后重新提交：`git add .` → `git commit` → `git push`

### PR 无法提交，提示 Require Assignee CheckExpected

> Require Assignee CheckExpected — 等待状态上报

如果通过 GitHub API 查看，所有检查其实都已经通过，但页面上仍然显示 PR 无法合并，这通常是 GitHub UI 或状态缓存问题。即使所有条件都已经满足（检查为 `SUCCESS`、Review 为 `APPROVED`、分支已同步），`mergeStateStatus` API 仍可能显示为 `BLOCKED`。

最可靠的处理方式是推送一个空提交，强制 GitHub 重新检查并计算 PR 状态：

```bash
git commit --allow-empty -m "chore: retrigger checks"
git push
```

这会触发 PR 的 `synchronize` 事件，从而：

1. 使用新的 commit SHA 重新运行所有必需检查
2. 强制 GitHub 重新计算 `mergeStateStatus`

新的 SHA 上检查通过后，`BLOCKED` 状态通常会消失。如果希望提交历史更干净，可以在合并前把这个空提交 squash 掉。

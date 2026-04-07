# GEMINI 指南

本文件用于指导 AI（如 Gemini）在本项目中的代码生成与修改行为。

## 一、项目概述

项目名称：job-compass

该项目主要由文档站点和辅助脚本组成：

- 文档系统：VitePress（根目录：`docs/`）
- Vue 组件：`docs/.vitepress/theme/components/`
- Python 脚本：`scripts/`

## 二、技术栈约束

在生成代码时必须遵循：

- 文档：VitePress（基于 Markdown）
- 前端组件：Vue 3
- 脚本语言：Python

禁止引入未声明的技术栈（如 React、Next.js 等）。

## 三、目录与结构规范

### 文档目录

- 所有文档内容位于 `docs/`
- Markdown文件用于页面内容
- 目录结构需清晰、语义化

### Vue 组件

路径：

docs/.vitepress/theme/components/

要求：

- 使用 Vue 3 语法
- 组件职责单一
- 避免复杂耦合

### Python 脚本

路径：

scripts/

要求：

- 用于辅助构建、数据处理等
- 保持脚本独立、可复用

## 四、命名规范

### 文件夹命名

- Vue 组件文件夹：**PascalCase**
  - 示例：`StaffCard/`
- Markdown 内容文件夹：**kebab-case**
  - 示例：`h1b-guide/`

### 文件命名

- Markdown 文件：kebab-case（如 `getting-started.md`）
- Vue 组件：PascalCase（如 `UserProfile.vue`）
- Python 文件：snake_case（如 `generate_data.py`）

## 五、修改约束（重要）

### 禁止修改内容

AI **不得修改**以下目录：

docs/_*

包括但不限于：

- `docs/_data/`
- 所有以下划线 `_` 开头的目录

这些目录通常用于内部数据或系统用途。

## 六、代码生成原则

在生成代码或内容时应遵循：

- 优先复用现有结构与组件
- 保持风格一致
- 避免引入不必要复杂性
- 保持 Markdown 内容清晰、结构化（标题层级合理）

## 七、Vue 组件规范（简要）

- 使用 Vue 3
- 推荐使用 `<script setup lang="ts">`
- 明确 props 定义
- 不在组件中写复杂业务逻辑

## 八、Markdown 编写规范

- 使用清晰的标题层级（`#`, `##`, `###`）
- 避免过长段落
- 合理使用代码块
- 示例代码需可读、简洁

## 九、Do / Don’t 总结

### Do

- 遵循命名规范
- 使用已有目录结构
- 保持代码简洁清晰

### Don’t

- 修改 `docs/_*` 目录
- 引入新技术栈
- 破坏现有结构
- 生成不符合 Vue 3 / VitePress 的代码
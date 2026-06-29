<script setup lang="ts">
interface DirectoryOverviewItem {
  title: string
  description: string
  href: string
  order: number
  kind: "folder" | "article"
}

defineProps<{
  items: DirectoryOverviewItem[]
}>()

const normalizeHref = (href: string) => href.replace(/\.md$/, "")

const kindLabel = (kind: DirectoryOverviewItem["kind"]) =>
  kind === "folder" ? "目录" : "文章"

const kindTagType = (kind: DirectoryOverviewItem["kind"]) =>
  kind === "folder" ? "success" : "info"
</script>

<template>
  <div class="directory-overview">
    <el-table
      :data="items"
      :default-sort="{ prop: 'order', order: 'ascending' }"
      border
      class="directory-overview__table"
      empty-text="暂无目录内容"
      stripe
    >
      <el-table-column label="标题" min-width="220" prop="title" sortable>
        <template #default="{ row }">
          <a
            :href="normalizeHref(row.href)"
            class="directory-overview__link"
          >
            {{ row.title }}
          </a>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="类型"
        prop="kind"
        sortable
        width="96"
      >
        <template #default="{ row }">
          <el-tag
            :type="kindTagType(row.kind)"
            effect="plain"
            size="small"
          >
            {{ kindLabel(row.kind) }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="描述"
        min-width="300"
        prop="description"
        show-overflow-tooltip
      />

      <el-table-column
        align="center"
        label="顺序"
        prop="order"
        sortable
        width="100"
      >
        <template #default="{ row }">
          <el-tag
            effect="plain"
            size="small"
            type="info"
          >
            {{ row.order }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped lang="scss">
.directory-overview {
  margin: 20px 0 28px;
  overflow-x: auto;
}

.directory-overview__table {
  min-width: 760px;
  width: 100%;
}

.directory-overview__link {
  color: var(--vp-c-brand-1);
  font-weight: 600;
  text-decoration: none;

  &:hover {
    color: var(--vp-c-brand-2);
    text-decoration: underline;
    text-underline-offset: 3px;
  }
}

:deep(.el-table th.el-table__cell) {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-weight: 600;
}

:deep(.el-table td.el-table__cell) {
  color: var(--vp-c-text-2);
}

:deep(.el-table .cell) {
  line-height: 1.5;
}
</style>

<!--在文章中显示内容引用来源：单条来源用链接预览卡，多条来源用紧凑列表（全部展开）；original 模式下显示原创声明-->
<script setup lang="ts">
import { computed } from 'vue'
import { TopRight } from '@element-plus/icons-vue'
import type { ReferenceSourceItem, SiteMark } from '@ao-types/referenceSourceTypes'
import { getSiteMark, getSourceMeta, isHttpUrl } from '@ao-utils/referenceSource'

const props = withDefaults(defineProps<{
  sources?: ReferenceSourceItem[]
  original?: boolean
  author?: string
}>(), {
  sources: () => [],
  original: false,
  author: ''
})

const ORIGINAL_TEXT = '本文为作者亲身面试经历的原创分享，首发于 Job Compass。如需转载，请注明出处并附上本页链接。'

const items = computed(() => props.sources.map(source => ({
  source,
  mark: getSiteMark(source.site),
  href: isHttpUrl(source.link) ? source.link!.trim() : '',
  meta: getSourceMeta(source)
})))

// 站点标识的底色是站点色兑正文底色，字用站点色
const markStyle = (mark: SiteMark) => ({
  '--el-avatar-text-color': mark.color,
  '--el-avatar-bg-color': `color-mix(in srgb, ${mark.color} 13%, var(--vp-c-bg))`
})
</script>

<template>
  <div v-if="original" class="reference-source">
    <h2 class="reference-source__heading">原创声明</h2>
    <el-card shadow="never" class="reference-source__card is-original">
      <div class="reference-source__card-body">
        <el-avatar shape="square" :size="40" class="reference-source__mark is-brand" aria-hidden="true">原</el-avatar>
        <div class="reference-source__card-main">
          <div class="reference-source__card-top">
            <span class="reference-source__site">Job Compass 原创</span>
            <span v-if="author">· 作者 {{ author }}</span>
          </div>
          <p class="reference-source__desc">{{ ORIGINAL_TEXT }}</p>
        </div>
      </div>
    </el-card>
  </div>

  <!-- 单条：整张卡可点，链接本身只包住标题，再用 ::after 撑满卡片 -->
  <div v-else-if="items.length === 1" class="reference-source">
    <h2 class="reference-source__heading">引用来源</h2>
    <el-card
      v-for="(item, index) in items"
      :key="index"
      :shadow="item.href ? 'hover' : 'never'"
      class="reference-source__card"
      :class="{ 'is-link': item.href }"
    >
      <div class="reference-source__card-body">
        <el-avatar shape="square" :size="40" class="reference-source__mark" :style="markStyle(item.mark)" aria-hidden="true">{{ item.mark.char }}</el-avatar>
        <div class="reference-source__card-main">
          <div class="reference-source__card-top">
            <span class="reference-source__site">{{ item.source.site || '未知来源' }}</span>
            <el-tag v-if="item.source.category" size="small" round class="reference-source__tag">{{ item.source.category }}</el-tag>
          </div>
          <a
            v-if="item.href"
            class="reference-source__card-title is-link no-icon"
            :href="item.href"
            target="_blank"
            rel="noopener noreferrer"
          >{{ item.source.title || '未提供标题' }}</a>
          <span v-else class="reference-source__card-title">{{ item.source.title || '未提供标题' }}</span>
          <p v-if="item.source.description" class="reference-source__desc">{{ item.source.description }}</p>
          <div v-if="item.source.author || item.source.date" class="reference-source__card-bottom">
            <span v-if="item.source.author">{{ item.source.author }}</span>
            <span v-if="item.source.date">{{ item.source.date }}</span>
          </div>
        </div>
        <el-icon v-if="item.href" class="reference-source__go"><TopRight /></el-icon>
        <span v-else class="reference-source__no-link">原文链接未提供</span>
      </div>
    </el-card>
  </div>

  <!-- 多条：紧凑列表，每条都展开 -->
  <div v-else-if="items.length > 1" class="reference-source">
    <h2 class="reference-source__heading">
      引用来源
      <el-tag size="small" round class="reference-source__tag">{{ items.length }} 条</el-tag>
    </h2>
    <ol class="reference-source__list">
      <li v-for="(item, index) in items" :key="index" class="reference-source__item">
        <el-avatar shape="square" :size="22" class="reference-source__mark is-small" :style="markStyle(item.mark)" aria-hidden="true">{{ item.mark.char }}</el-avatar>
        <div class="reference-source__item-main">
          <a
            v-if="item.href"
            class="reference-source__item-title is-link no-icon"
            :href="item.href"
            target="_blank"
            rel="noopener noreferrer"
          >{{ item.source.title || '未提供标题' }}<el-icon class="reference-source__ext"><TopRight /></el-icon></a>
          <span v-else class="reference-source__item-title">{{ item.source.title || '未提供标题' }}</span>
          <div class="reference-source__meta">
            <template v-for="(text, metaIndex) in item.meta" :key="metaIndex">
              <span v-if="metaIndex" class="reference-source__sep">·</span>
              <span>{{ text }}</span>
            </template>
            <template v-if="!item.href">
              <span v-if="item.meta.length" class="reference-source__sep">·</span>
              <span class="reference-source__missing">原文链接未提供</span>
            </template>
          </div>
          <p v-if="item.source.description" class="reference-source__desc">{{ item.source.description }}</p>
        </div>
      </li>
    </ol>
  </div>
</template>

<style scoped lang="scss">
// 组件放在 .vp-doc 正文里，标题、段落、列表、链接都要压过 VitePress 的正文样式；
// 外链加 no-icon，关掉 VitePress 给 target="_blank" 链接自动加的 ↗（卡片标题的 ::after 另有用途）
.reference-source {
  margin-top: 32px;

  &__heading {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0 0 12px;
    padding: 0;
    border-top: none;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.5;
    letter-spacing: normal;
    color: var(--vp-c-text-1);
  }

  &__tag.el-tag {
    --el-tag-bg-color: var(--vp-c-bg);
    --el-tag-border-color: var(--vp-c-divider);
    --el-tag-text-color: var(--vp-c-text-2);
    font-weight: 500;
  }

  &__mark.el-avatar {
    --el-avatar-border-radius: 10px;
    --el-avatar-text-size: 18px;
    flex: none;
    font-weight: 700;

    &.is-small {
      --el-avatar-border-radius: 6px;
      --el-avatar-text-size: 12px;
      margin-top: 3px;
    }

    &.is-brand {
      --el-avatar-text-color: #fff;
      background: linear-gradient(135deg, var(--ao-blue), var(--ao-blue-deep));
    }
  }

  &__desc {
    margin: 4px 0 0;
    font-size: 14px;
    line-height: 1.65;
    color: var(--vp-c-text-2);
  }

  // ---------- 单条卡片 ----------
  &__card.el-card {
    --el-card-border-color: var(--vp-c-divider);
    --el-card-border-radius: 12px;
    --el-card-padding: 14px 16px;
    --el-card-bg-color: var(--vp-c-bg-soft);
    position: relative;
    color: var(--vp-c-text-1);

    &.is-link:hover,
    &.is-link:focus-within {
      --el-card-border-color: var(--ao-blue);
      --el-card-bg-color: var(--vp-c-bg);

      .reference-source__go {
        color: var(--ao-blue);
        transform: translate(2px, -2px);
      }
    }

    &.is-original {
      --el-card-border-color: color-mix(in srgb, var(--ao-blue) 28%, var(--vp-c-bg));
      --el-card-bg-color: color-mix(in srgb, var(--ao-blue) 6%, var(--vp-c-bg));
    }
  }

  &__card-body {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    gap: 14px;
    align-items: start;
  }

  &__card-main {
    min-width: 0;
  }

  &__card-top {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0 6px;
    font-size: 13px;
    line-height: 1.6;
    color: var(--vp-c-text-2);
  }

  &__site {
    font-weight: 600;
    color: var(--vp-c-text-1);
  }

  &__card-title {
    display: block;
    margin-top: 2px;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.45;
    color: var(--vp-c-text-1);

    &.is-link {
      color: var(--vp-c-text-1);
      text-decoration: none;

      // 链接只包住标题，点击区域撑满整张卡片
      &::after {
        content: '';
        position: absolute;
        inset: 0;
      }

      &:focus-visible {
        outline: none;
      }
    }
  }

  &__card-bottom {
    display: flex;
    flex-wrap: wrap;
    gap: 0 10px;
    margin-top: 6px;
    font-size: 13px;
    line-height: 1.6;
    color: var(--vp-c-text-3);
  }

  &__go {
    padding-top: 3px;
    font-size: 16px;
    color: var(--vp-c-text-3);
    transition: color 0.2s, transform 0.2s;
  }

  &__no-link {
    padding-top: 2px;
    font-size: 12px;
    white-space: nowrap;
    color: var(--vp-c-text-3);
  }

  // ---------- 多条列表 ----------
  &__list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__item {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 0 12px;
    align-items: start;
    margin: 0;
    padding: 10px 0;
    border-top: 1px solid var(--vp-c-divider);

    &:last-child {
      border-bottom: 1px solid var(--vp-c-divider);
    }
  }

  &__item-main {
    min-width: 0;
  }

  &__item-title {
    font-size: 15px;
    font-weight: 500;
    line-height: 1.55;
    color: var(--vp-c-text-1);

    &.is-link {
      color: var(--ao-blue-deep);
      text-decoration: none;

      &:hover {
        color: var(--ao-blue);
        text-decoration: underline;
        text-underline-offset: 3px;
      }
    }
  }

  &__ext {
    margin-left: 3px;
    font-size: 0.85em;
    vertical-align: -0.1em;
  }

  &__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0 6px;
    margin-top: 2px;
    font-size: 13px;
    line-height: 1.6;
    color: var(--vp-c-text-2);
  }

  &__sep,
  &__missing {
    color: var(--vp-c-text-3);
  }
}
</style>

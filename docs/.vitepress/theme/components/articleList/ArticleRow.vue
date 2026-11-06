<!-- ArticleList 的单行：标题、摘要、作者头像与发布日期，整行可点击。移植自 logbook，去掉了分类标签 -->
<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { ArrowRight } from '@element-plus/icons-vue'
import type { ArticleListItem } from '@ao-types/articleListTypes'
import {
  normalizeAuthorValue,
  resolveFrontmatterAuthor,
  sortDisplayAuthors,
  upsertAuthor,
  type DisplayAuthor,
} from '@ao-utils/contributors'

const props = defineProps<{
  article: ArticleListItem
}>()

const { lang } = useData()

// 头像最多显示 3 个，超出折叠为 +N 计数
const MAX_AVATARS = 3

const displayAuthors = computed<DisplayAuthor[]>(() => {
  const byName = new Map<string, DisplayAuthor>()
  normalizeAuthorValue(props.article.authors)
    .map(resolveFrontmatterAuthor)
    .filter((a): a is DisplayAuthor => Boolean(a))
    .forEach((a) => upsertAuthor(byName, a))
  return sortDisplayAuthors(Array.from(byName.values()))
})

const shownAuthors = computed(() => displayAuthors.value.slice(0, MAX_AVATARS))
const extraAuthorCount = computed(
  () => displayAuthors.value.length - shownAuthors.value.length,
)

const getDisplayName = (author: DisplayAuthor): string =>
  author.i18n?.[lang.value] ?? author.name

const getAvatarFallback = (author: DisplayAuthor): string =>
  (Array.from(getDisplayName(author))[0] ?? '').toUpperCase()

// 站外链接（GitHub 等回退）新标签页打开；站内作者主页走 SPA 路由
const isExternalUrl = (url: string): boolean => /^https?:/i.test(url)

// 优先显示新闻本身的日期；没填 newsDate 时退回收录进本站的日期
const dateInfo = computed(() => {
  const { newsDate, createdDate, lastUpdated } = props.article
  if (newsDate) return { label: '新闻日期', value: newsDate }
  if (createdDate) return { label: '收录于', value: createdDate }
  if (lastUpdated) return { label: '更新于', value: lastUpdated }
  return undefined
})

// 文字仅显示首作者名，多人时后缀「等 N 人」
const authorLabel = computed(() => {
  const authors = displayAuthors.value
  if (authors.length === 0) return ''
  const first = getDisplayName(authors[0])
  return authors.length > 1 ? `${first} 等 ${authors.length} 人` : first
})
</script>

<template>
  <li class="article-row">
    <!-- 行整体可点击（stretched link）：标题锚点经 ::after 铺满整行；
         头像是独立链接，layered 在其上，避免 <a> 嵌套 -->
    <div class="article-row__inner">
      <div class="article-row__body">
        <a class="article-row__link" :href="article.href">
          <el-text tag="h3" truncated class="article-row__title">
            {{ article.title }}
          </el-text>
        </a>
        <el-text
          v-if="article.description"
          tag="p"
          :line-clamp="2"
          class="article-row__excerpt"
        >
          {{ article.description }}
        </el-text>
        <div
          v-if="displayAuthors.length || dateInfo || article.reviewHref"
          class="article-row__meta"
        >
          <template v-if="displayAuthors.length">
            <span class="article-row__avatars">
              <!-- teleported=false 必须保留：默认浮层 teleport 到仅客户端存在的容器，
                   构建产物里缺少 teleport anchor，hydration 会把浮层错配到 body 上，
                   卸载时抛 null.nextSibling 并中断 patch（只在产物环境复现，dev 不做 SSR）。
                   详见 logbook 同名组件的注释 -->
              <el-tooltip
                v-for="author in shownAuthors"
                :key="author.name"
                :content="getDisplayName(author)"
                placement="top"
                :teleported="false"
              >
                <component
                  :is="author.url ? 'a' : 'span'"
                  :href="author.url"
                  :target="
                    author.url && isExternalUrl(author.url) ? '_blank' : undefined
                  "
                  :rel="
                    author.url && isExternalUrl(author.url) ? 'noopener' : undefined
                  "
                  :aria-label="
                    author.url ? `查看作者 ${getDisplayName(author)} 的主页` : undefined
                  "
                  class="article-row__avatar-wrap"
                >
                  <el-avatar
                    :size="24"
                    :src="author.avatarUrl"
                    :alt="`作者 ${getDisplayName(author)} 的头像`"
                    class="article-row__avatar"
                  >
                    {{ getAvatarFallback(author) }}
                  </el-avatar>
                </component>
              </el-tooltip>
              <el-avatar
                v-if="extraAuthorCount > 0"
                :size="24"
                class="article-row__avatar article-row__avatar--more"
              >
                +{{ extraAuthorCount }}
              </el-avatar>
            </span>
            <span class="article-row__author">{{ authorLabel }}</span>
            <el-divider v-if="dateInfo" direction="vertical" />
          </template>
          <time v-if="dateInfo" :datetime="dateInfo.value">
            {{ dateInfo.label }} {{ dateInfo.value }}
          </time>
          <!-- 审阅意见是独立链接，和头像一样浮在整行链接之上 -->
          <a v-if="article.reviewHref" :href="article.reviewHref" class="article-row__review">
            <el-tag size="small" type="warning" effect="light" round>审阅意见</el-tag>
          </a>
        </div>
      </div>
      <!-- 封面缩略图：纯装饰（标题即链接文本），故 alt 留空；
           加载中/失败均显示同尺寸灰块，避免行内布局抖动 -->
      <el-image
        v-if="article.thumbnail"
        :src="article.thumbnail"
        alt=""
        fit="cover"
        lazy
        class="article-row__thumb"
      >
        <template #placeholder>
          <div class="article-row__thumb-fallback" />
        </template>
        <template #error>
          <div class="article-row__thumb-fallback" />
        </template>
      </el-image>
      <el-icon class="article-row__arrow"><ArrowRight /></el-icon>
    </div>
  </li>
</template>

<style scoped lang="scss">
// 组件嵌在 Markdown 正文里，.vp-doc 的 li / h3 / p / a 样式会漏进来，
// 下面凡是写 margin: 0、text-decoration: none 的地方都是在覆盖它们
.article-row {
  $self: &;

  + .article-row {
    margin-top: 0;
    border-top: 1px solid var(--vp-c-divider);
  }

  &__inner {
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 22px 16px;
    margin: 0 -16px;
    border-radius: 8px;
    transition: background 0.15s;

    &:hover {
      background: var(--vp-c-bg-soft);

      #{$self}__title {
        color: var(--vp-c-brand-1);
      }

      #{$self}__avatar {
        --avatar-ring: var(--vp-c-bg-soft);
      }

      #{$self}__arrow {
        opacity: 1;
        transform: none;
      }
    }
  }

  &__body {
    flex: 1;
    min-width: 0;
  }

  &__thumb {
    flex-shrink: 0;
    width: 112px;
    height: 76px;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid var(--vp-c-divider);
    background: var(--vp-c-bg-soft);

    :deep(img) {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  &__thumb-fallback {
    width: 100%;
    height: 100%;
    background: var(--vp-c-default-soft);
  }

  &__link {
    display: block;
    min-width: 0;
    color: inherit;
    font-weight: inherit;
    text-decoration: none;

    // 铺满整行的可点击区域
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
    }
  }

  // el-text 的 is-truncated / is-line-clamp 都是行内级（inline-block、
  // -webkit-inline-box），标题与摘要会挤在同一行框里，且 margin-top 失效，
  // 所以这里统一改回块级
  &__title {
    display: block;
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    line-height: 1.45;
    letter-spacing: normal;
    color: var(--vp-c-text-1);
    transition: color 0.15s;
  }

  &__excerpt {
    display: -webkit-box;
    margin: 6px 0 0;
    font-size: 14.5px;
    line-height: 1.65;
    color: var(--vp-c-text-2);
  }

  &__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    margin-top: 12px;
    font-size: 13px;
    color: var(--vp-c-text-3);
    font-variant-numeric: tabular-nums;

    :deep(.el-divider--vertical) {
      margin: 0;
      border-color: var(--vp-c-divider);
    }
  }

  &__avatars {
    display: flex;

    // tooltip 不再 teleport，浮层会作为同级元素插在头像之间，
    // 故按「非首个子节点」而不是相邻选择器叠压，避免浮层打断叠压关系
    > *:not(:first-child) {
      margin-left: -7px;
    }

    // 浮层本身不参与头像叠压（绝对定位，-7px 会让它整体偏左）
    :deep(.el-popper) {
      margin-left: 0;
    }
  }

  // 头像链接需浮在整行链接之上才能独立点击
  &__avatar-wrap {
    position: relative;
    z-index: 1;
    display: inline-flex;
    border-radius: 50%;
    text-decoration: none;
    transition: transform 0.15s;

    &:hover {
      z-index: 2;
      transform: translateY(-2px);
    }
  }

  &__avatar {
    --avatar-ring: var(--vp-c-bg);

    flex-shrink: 0;
    font-size: 12px;
    box-shadow: 0 0 0 2px var(--avatar-ring);
    transition: box-shadow 0.15s;

    &--more {
      --el-avatar-bg-color: var(--vp-c-default-soft);
      --el-avatar-text-color: var(--vp-c-text-2);

      font-size: 11px;
    }
  }

  &__author {
    color: var(--vp-c-text-2);
  }

  &__review {
    position: relative;
    z-index: 1;
    display: inline-flex;
    text-decoration: none;

    &:hover :deep(.el-tag) {
      border-color: var(--el-color-warning);
    }
  }

  &__arrow {
    flex-shrink: 0;
    color: var(--vp-c-text-3);
    opacity: 0;
    transform: translateX(-4px);
    transition:
      opacity 0.15s,
      transform 0.15s;
  }

  @media (max-width: 640px) {
    &__inner {
      padding: 18px 12px;
      margin: 0 -12px;
    }

    &__title {
      font-size: 16px;
    }

    &__thumb {
      width: 72px;
      height: 72px;
    }

    &__arrow {
      display: none;
    }
  }
}
</style>

<!--
  原帖评论区：转载面经时把原帖下面的评论按楼层全部收录，由 InterviewDocFooter 放在正文之后。
  - 不显示原 ID，发言人只分「作者」和「网友」
  - 只抓到引用、没抓到正文的回复保留楼层，显示占位
  - 超过 FOLD_LIMIT 条时先折叠
  和页面最下方的 Giscus 是两回事：这里是原帖的评论，Giscus 是本站读者的讨论。
-->
<script setup lang="ts">
import { computed, ref } from 'vue'
import type { InterviewComment } from '@ao-utils/interviewData'
import { COMMENT_ROLE } from '@ao-constants/interviewEnums'

const FOLD_LIMIT = 10
const QUOTE_LENGTH = 40

const props = defineProps<{
  comments: InterviewComment[]
}>()

const expanded = ref(false)

const byId = computed(() => new Map(props.comments.map((comment) => [comment.id, comment])))
const visible = computed(() => (expanded.value ? props.comments : props.comments.slice(0, FOLD_LIMIT)))
const hiddenCount = computed(() => Math.max(props.comments.length - FOLD_LIMIT, 0))

const roleLabel = (comment: InterviewComment): string => COMMENT_ROLE[comment.role].zhHans

/** 「回复 #5 网友：前 40 个字…」；replyTo 一定指向前面的楼层，由 schema 校验保证 */
const quoteOf = (comment: InterviewComment): string => {
  const target = byId.value.get(comment.replyTo!)!
  const chars = Array.from(target.content ?? '')
  const excerpt = chars.length > QUOTE_LENGTH ? `${chars.slice(0, QUOTE_LENGTH).join('')}…` : chars.join('')
  return `回复 #${target.id} ${roleLabel(target)}${excerpt ? `：${excerpt}` : ''}`
}
</script>

<template>
  <div class="comments">
    <div v-for="comment in visible" :key="comment.id" class="comments__item">
      <el-space :size="8" wrap>
        <el-text size="small" type="info">#{{ comment.id }}</el-text>
        <el-tag :type="comment.role === 'author' ? 'primary' : 'info'" size="small" effect="plain" round>
          {{ roleLabel(comment) }}
        </el-tag>
        <el-text v-if="comment.date" size="small" type="info">{{ comment.date }}</el-text>
      </el-space>
      <el-text v-if="comment.replyTo" tag="div" size="small" type="info" class="comments__quote">
        {{ quoteOf(comment) }}
      </el-text>
      <el-text v-if="comment.content" tag="p" class="comments__content">{{ comment.content }}</el-text>
      <el-text v-else tag="p" size="small" type="info" class="comments__content">（回复内容未抓取到）</el-text>
    </div>
    <el-button v-if="hiddenCount" type="primary" link @click="expanded = !expanded">
      {{ expanded ? '收起' : `展开剩余 ${hiddenCount} 条` }}
    </el-button>
  </div>
</template>

<style scoped lang="scss">
.comments {
  padding: 16px 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;

  &__item {
    padding: 12px 0;

    &:first-child { padding-top: 0; }
    & + & { border-top: 1px solid var(--vp-c-divider); }
  }

  &__quote {
    margin-top: 6px;
    padding: 4px 10px;
    border-left: 2px solid var(--vp-c-divider);
    background: var(--vp-c-default-soft);
  }

  /* 覆盖 .vp-doc p 的上下外边距 */
  &__content {
    margin: 6px 0 0;
    line-height: 1.7;
    white-space: pre-line;
    overflow-wrap: anywhere;
  }
}
</style>

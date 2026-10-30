<script setup lang="ts">
/** 中文首页的常见问题，内容沿用改版前首页的「常见问题」；回答按片段写，带 href 的片段渲染成链接 */
interface AnswerPart {
  text: string
  href?: string
}

const items: { question: string; answer: AnswerPart[] }[] = [
  {
    question: '完全免费吗？',
    answer: [{ text: '是。所有内容开源、免费访问，无需注册。' }],
  },
  {
    question: '信息从哪来？',
    answer: [{ text: '来自社区志愿者整理的公开招聘信息和亲历的面试经验。' }],
  },
  {
    question: '怎么贡献？',
    answer: [
      { text: '直接在 ' },
      { text: 'GitHub', href: 'https://github.com/atomeocean/job-compass' },
      { text: ' 提 PR，或参考 ' },
      { text: '任务指南', href: '/guide/task-guide.html' },
      { text: '。' },
    ],
  },
  {
    question: '这是一个美国合规项目吗？',
    answer: [{ text: '是的，AI模型只使用指定美国国家安全级别的Claude' }],
  },
]

const isExternal = (href: string) => href.startsWith('http')
</script>

<template>
  <section class="home-section">
    <div class="home-container">
      <div class="home-head">
        <p class="home-kicker">常见问题</p>
        <h2 class="home-title">关于 Job Compass</h2>
      </div>
      <dl class="faq">
        <div v-for="item in items" :key="item.question" class="item">
          <dt class="question">{{ item.question }}</dt>
          <dd class="answer">
            <template v-for="(part, index) in item.answer" :key="index">
              <a
                v-if="part.href"
                class="home-link"
                :href="part.href"
                :target="isExternal(part.href) ? '_blank' : undefined"
                :rel="isExternal(part.href) ? 'noopener' : undefined"
              >{{ part.text }}</a>
              <template v-else>{{ part.text }}</template>
            </template>
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped lang="scss">
.faq {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin: 0;
}

.item {
  padding: 22px 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg);
}

.question {
  font-size: 16px;
  font-weight: 700;
  line-height: 1.5;
  color: var(--vp-c-text-1);
}

.answer {
  margin: 8px 0 0;
  font-size: 15px;
  line-height: 1.7;
  color: var(--vp-c-text-2);

  .home-link {
    font-size: inherit;
  }
}

@media (max-width: 640px) {
  .faq {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>

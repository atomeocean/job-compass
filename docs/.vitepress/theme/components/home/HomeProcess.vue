<script setup lang="ts">
// 每一步都对应仓库里真实存在的流程：面经 JSON schema、sourceType + ReferenceSource、
// PR 审批、validate-json 和 pr-docs-build 两个 workflow。改流程时同步改这里的文案
import type { HomeLocale } from '@ao-types/homeTypes'
import type { SiteStats } from '../../data/siteStats.data'

const props = withDefaults(defineProps<{ locale?: HomeLocale; stats?: SiteStats }>(), { locale: 'en' })

interface Step {
  title: string
  /** 这一步由谁来做，中文首页用 */
  role?: string
  text: string
}

interface Action {
  text: string
  href: string
  primary?: boolean
}

interface ProcessCopy {
  kicker: string
  title: string
  lead: string
  steps: Step[]
  /** 面经来源分布的一句话，要传 stats 才显示 */
  sources?: (stats: SiteStats) => string
  actions: Action[]
  github: string
}

const COPY: Record<HomeLocale, ProcessCopy> = {
  en: {
    kicker: 'How content is made',
    title: 'An editorial process you can audit',
    lead: 'Every change happens in public on GitHub, so anyone can trace how a report was added, reviewed and published.',
    steps: [
      {
        title: 'Collect',
        text: 'Reports come from contributor submissions and public forums. Reposts link back to their original source.',
      },
      {
        title: 'Structure',
        text: 'Every report is recorded in a shared schema (company, role, level, rounds and outcome) so reports can be compared.',
      },
      {
        title: 'Review',
        text: 'Every change is submitted as a GitHub pull request and approved by a maintainer before it is merged.',
      },
      {
        title: 'Publish',
        text: 'Automated checks verify the data files and build the site for every pull request. Each article shows when it was last updated.',
      },
    ],
    actions: [],
    github: 'See the merged pull requests on GitHub ↗',
  },
  zh: {
    kicker: '内容怎么来的',
    title: '一篇面经是怎么上线的',
    lead: '每一次改动都公开在 GitHub 上：谁加的、谁审的、什么时候上线，都查得到。你可以从任何一步加入。',
    steps: [
      { title: '投稿', role: '求职者', text: '分享自己的面试经历，作者的真实姓名和联系方式不会公开。' },
      { title: '整理', role: '志愿者', text: '按统一格式记录公司、岗位、级别、轮次和结果；转载会注明原帖出处。' },
      { title: '审核', role: '社区成员', text: '每次改动都通过 GitHub PR 提交，要通过自动检查，并由至少一位社区成员审核。' },
      { title: '上线', role: '自动完成', text: '合并后自动发布到面经页面，作者栏署上每一位参与者。' },
    ],
    sources: (stats) =>
      `目前 ${stats.sourceTypes.repost} 篇转载、${stats.sourceTypes.original} 篇原创、${stats.sourceTypes.unknown} 篇来源待确认。广告号、重复和明显造假的帖子会被折叠，不会混在列表里。`,
    actions: [
      { text: '分享我的面经', href: '/guide/interview-experience-utils/contributing.html', primary: true },
      { text: '参与指南', href: '/guide/participation-guide.html' },
      { text: '加入 Discord ↗', href: 'https://discord.gg/qTHGss8GQH' },
    ],
    github: '在 GitHub 上看所有合并记录 ↗',
  },
}

const copy = COPY[props.locale]
const sources = props.stats && copy.sources ? copy.sources(props.stats) : ''
const isExternal = (href: string) => href.startsWith('http')
</script>

<template>
  <section class="home-section home-section--soft">
    <div class="home-container">
      <div class="home-head">
        <p class="home-kicker">{{ copy.kicker }}</p>
        <h2 class="home-title">{{ copy.title }}</h2>
        <p class="home-lead">{{ copy.lead }}</p>
      </div>
      <ol class="steps">
        <li v-for="(step, index) in copy.steps" :key="step.title" class="step">
          <span class="number" aria-hidden="true">{{ index + 1 }}</span>
          <h3 class="step-title">{{ step.title }}</h3>
          <p v-if="step.role" class="step-role">{{ step.role }}</p>
          <p class="step-text">{{ step.text }}</p>
        </li>
      </ol>
      <p v-if="sources" class="sources">{{ sources }}</p>
      <div v-if="copy.actions.length" class="actions">
        <a
          v-for="action in copy.actions"
          :key="action.href"
          class="action"
          :class="{ 'action--primary': action.primary }"
          :href="action.href"
          :target="isExternal(action.href) ? '_blank' : undefined"
          :rel="isExternal(action.href) ? 'noopener' : undefined"
        >{{ action.text }}</a>
      </div>
      <a
        class="home-link more"
        href="https://github.com/atomeocean/job-compass/pulls?q=is%3Apr+is%3Amerged"
        target="_blank"
        rel="noopener"
      >{{ copy.github }}</a>
    </div>
  </section>
</template>

<style scoped lang="scss">
.steps {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 28px;
  margin: 0;
  padding: 0;
  list-style: none;

  /* 四个序号之间的连线 */
  &::before {
    content: "";
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    height: 1px;
    background: var(--vp-c-border);
  }
}

.number {
  position: relative;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid var(--ao-blue);
  border-radius: 50%;
  background: var(--vp-c-bg-soft);
  font-size: 15px;
  font-weight: 700;
  color: var(--home-accent);
}

.step-title {
  margin: 20px 0 8px;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.4;
  color: var(--vp-c-text-1);
}

.step-role {
  margin: -4px 0 8px;
  font-size: 13px;
  font-weight: 600;
  color: var(--home-accent);
}

.step-text {
  margin: 0;
  font-size: 14px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}

.sources {
  max-width: 760px;
  margin: 36px 0 0;
  font-size: 14px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

.action {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg);
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  transition: border-color 0.2s, background 0.2s;

  &:hover {
    border-color: var(--ao-blue);
  }
}

/* 白字只在 --ao-blue-deep 上够得上 AA；暗色主题换成浅蓝底深色字 */
.action--primary {
  border-color: transparent;
  background: var(--ao-blue-deep);
  color: #fff;

  &:hover {
    border-color: transparent;
    background: color-mix(in srgb, var(--ao-blue-deep) 86%, #000);
  }
}

.dark .action--primary {
  background: var(--ao-blue-light);
  color: #0a1730;

  &:hover {
    background: color-mix(in srgb, var(--ao-blue-light) 86%, #fff);
  }
}

.more {
  display: inline-block;
  margin-top: 32px;
}

@media (max-width: 960px) {
  .steps {
    grid-template-columns: repeat(2, 1fr);

    &::before {
      display: none;
    }
  }
}

@media (max-width: 640px) {
  .steps {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .action {
    transition: none;
  }
}
</style>

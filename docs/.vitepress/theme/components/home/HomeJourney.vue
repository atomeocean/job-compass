<script setup lang="ts">
/** 中文首页「按求职阶段」：四个阶段，每段列出对应栏目；篇数来自 siteStats.data.ts */
import type { SiteStats } from '../../data/siteStats.data'

const props = defineProps<{ stats: SiteStats }>()
const { stats } = props

interface StageLink {
  text: string
  href: string
  count?: string
}

const stages: { title: string; text: string; links: StageLink[] }[] = [
  {
    title: '找机会',
    text: '在招的岗位、内推渠道，以及可以直接入职的公司。',
    links: [
      { text: '招聘信息', href: '/job-postings/overview.html', count: `${stats.jobPostings} 条` },
      { text: '内推', href: '/referral/overview.html' },
      { text: '直招公司', href: '/direct-hire-company/general.html', count: `${stats.companyProfiles} 家` },
      { text: '中介公司', href: '/staffing-company/overview.html' },
    ],
  },
  {
    title: '准备面试',
    text: '从第一通 Recruiter 电话到 Onsite。',
    links: [
      { text: '面经', href: '/interview-experience/', count: `${stats.interviewReports} 篇` },
      { text: '面试准备', href: '/interview-prepare/recruiter-call-step.html', count: `${stats.interviewPrepGuides} 篇` },
      { text: '求职术语速查', href: '/guide/interview-experience-utils/essential-terms.html' },
    ],
  },
  {
    title: '入职之后',
    text: '北美职场的规则、汇报关系和生存经验。',
    links: [
      { text: '职场建议', href: '/career-guide/', count: `${stats.careerGuides} 篇` },
      { text: '美工心理学', href: '/career-guide/us-work-mindset/' },
    ],
  },
  {
    title: '身份与避坑',
    text: '看清身份方案，避开挂靠和找工诈骗。',
    links: [
      { text: '身份方案', href: '/visa-solution-company/overview.html' },
      { text: '挂靠公司', href: '/visa-solution-company/visa-fraud-company/' },
      { text: '警惕找工诈骗', href: '/interview-prepare/beware-of-fake-job-scams.html' },
    ],
  },
]
</script>

<template>
  <section class="home-section">
    <div class="home-container">
      <div class="home-head">
        <p class="home-kicker">按求职阶段</p>
        <h2 class="home-title">求职的每一步，都有人整理过</h2>
        <p class="home-lead">除了面经，这里还有招聘、内推、职场和身份相关的内容，都由社区志愿者整理维护。</p>
      </div>
      <ol class="stages">
        <li v-for="(stage, index) in stages" :key="stage.title" class="stage">
          <span class="number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
          <h3 class="stage-title">{{ stage.title }}</h3>
          <p class="stage-text">{{ stage.text }}</p>
          <ul class="links">
            <li v-for="link in stage.links" :key="link.href">
              <a class="link" :href="link.href">
                <span>{{ link.text }}</span>
                <span v-if="link.count" class="count">{{ link.count }}</span>
              </a>
            </li>
          </ul>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped lang="scss">
.stages {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.stage {
  display: flex;
  flex-direction: column;
  padding: 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg);
}

.number {
  font-size: 13px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-3);
}

.stage-title {
  margin: 6px 0 6px;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.4;
  color: var(--vp-c-text-1);
}

.stage-text {
  margin: 0 0 12px;
  font-size: 14px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}

.links {
  margin: auto 0 0;
  padding: 0;
  list-style: none;
}

.link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  min-height: 44px;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 15px;
  font-weight: 600;
  color: var(--home-accent);
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
}

.count {
  font-size: 13px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-3);
}

@media (max-width: 960px) {
  .stages {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .stages {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>

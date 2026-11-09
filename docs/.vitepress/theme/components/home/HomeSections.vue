<script setup lang="ts">
import { Briefcase, Checked, Document, OfficeBuilding } from '@element-plus/icons-vue'
import type { SiteStats } from '../../data/siteStats.data'

const props = defineProps<{ stats: SiteStats }>()
const { stats } = props

// 四个栏目都还没有英文镜像，链接指向中文栏目，卡片上标「In Chinese」
const sections = [
  {
    icon: Document,
    title: 'Interview reports',
    text: `${stats.interviewReports} reports across ${stats.companies.length} companies, each recorded by role, level, interview rounds and outcome.`,
    action: 'Browse reports',
    href: '/interview-experience/',
  },
  {
    icon: Checked,
    title: 'Interview prep',
    text: `${stats.interviewPrepGuides} preparation guides, from the first recruiter call to the onsite loop.`,
    action: 'Start preparing',
    href: '/interview-prepare/',
  },
  {
    icon: OfficeBuilding,
    title: 'Company profiles',
    text: `${stats.companyProfiles} U.S. employer profiles with location, industry, size and main products.`,
    action: 'See companies',
    href: '/direct-hire-company/',
  },
  {
    icon: Briefcase,
    title: 'Job postings',
    text: `${stats.jobPostings} curated postings from ${stats.jobPostingEmployers} employers across ${stats.jobPostingStates} states.`,
    action: 'View postings',
    href: '/job-postings/',
  },
]
</script>

<template>
  <section class="home-section">
    <div class="home-container">
      <div class="home-head">
        <p class="home-kicker">What's inside</p>
        <h2 class="home-title">Reports, guides and company data in one place</h2>
        <p class="home-lead">
          Most community content is written in Simplified Chinese for Chinese-speaking professionals in the U.S.
          Selected guides are also available in English.
        </p>
      </div>
      <div class="cards">
        <a v-for="section in sections" :key="section.title" class="card" :href="section.href">
          <span class="icon"><el-icon :size="22"><component :is="section.icon" /></el-icon></span>
          <h3 class="card-title">{{ section.title }}</h3>
          <p class="card-text">{{ section.text }}</p>
          <span class="card-foot">
            <span>{{ section.action }} →</span>
            <el-tag size="small" type="info" effect="plain" round>In Chinese</el-tag>
          </span>
        </a>
      </div>
      <p class="english">
        In English:
        <a class="home-link" href="/en/interview-prepare/amazon-inc.html">Amazon interview preparation</a>
        ·
        <a class="home-link" href="/en/interview-prepare/background-check/">Background checks</a>
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg);
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;

  &:hover {
    border-color: color-mix(in srgb, var(--ao-blue) 45%, var(--vp-c-divider));
    box-shadow: var(--home-shadow);
    transform: translateY(-2px);
  }
}

.icon {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 11px;
  background: var(--home-accent-soft);
  color: var(--home-accent);
}

.card-title {
  margin: 4px 0 0;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.4;
  color: var(--vp-c-text-1);
}

.card-text {
  flex: 1;
  margin: 0;
  font-size: 14px;
  line-height: 1.65;
  color: var(--vp-c-text-2);
}

.card-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: var(--home-accent);
}

.english {
  margin: 24px 0 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

@media (max-width: 1080px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .cards {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
  }
}
</style>

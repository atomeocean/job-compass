<script setup lang="ts">
import { computed } from 'vue'
import type { CompanyStat } from '../../data/siteStats.data'

const props = defineProps<{ companies: CompanyStat[]; query: string }>()

const term = computed(() => props.query.trim().toLowerCase())
const visible = computed(() =>
  term.value
    ? props.companies.filter((company) => company.name.toLowerCase().includes(term.value) || company.slug.includes(term.value))
    : props.companies,
)
const maxReports = Math.max(1, ...props.companies.map((company) => company.reports))

const heading = computed(() => {
  if (!term.value) return `${props.companies.length} companies, sorted by number of reports`
  const count = visible.value.length
  return `${count} ${count === 1 ? 'company matches' : 'companies match'} “${props.query.trim()}”`
})

const barWidth = (reports: number) => `${Math.max(6, (reports / maxReports) * 100)}%`
</script>

<template>
  <section id="companies" class="home-section companies">
    <div class="home-container">
      <div class="home-head home-head--row">
        <div>
          <p class="home-kicker">Browse by company</p>
          <h2 class="home-title" aria-live="polite">{{ heading }}</h2>
        </div>
        <p class="note">Reports are written in Simplified Chinese.</p>
      </div>
      <div v-if="visible.length" class="grid">
        <a v-for="company in visible" :key="company.slug" class="tile" :href="company.href">
          <span class="name">{{ company.name }}</span>
          <span class="count">{{ company.reports }} {{ company.reports === 1 ? 'report' : 'reports' }}</span>
          <span class="bar" aria-hidden="true"><i :style="{ width: barWidth(company.reports) }" /></span>
        </a>
      </div>
      <p v-else class="empty">
        No company matches that name. Try the site search at the top of the page, or
        <a class="home-link" href="/interview-experience/">browse all interview reports</a>.
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.companies {
  scroll-margin-top: var(--vp-nav-height);
}

.note {
  margin: 0;
  font-size: 14px;
  color: var(--vp-c-text-3);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(176px, 1fr));
  gap: 10px;
}

.tile {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px 16px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
  transition: border-color 0.2s, transform 0.2s;

  &:hover {
    border-color: var(--ao-blue);
    transform: translateY(-1px);
  }
}

.name {
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.count {
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.bar {
  height: 4px;
  margin-top: 4px;
  overflow: hidden;
  border-radius: 2px;
  background: var(--vp-c-default-soft);

  i {
    display: block;
    height: 100%;
    border-radius: 2px;
    background: var(--ao-blue);
  }
}

.empty {
  margin: 0;
  font-size: 15px;
  color: var(--vp-c-text-2);
}

/* 手机上一列要排 39 张卡，改两列，长度减半 */
@media (max-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (prefers-reduced-motion: reduce) {
  .tile {
    transition: none;
  }
}
</style>

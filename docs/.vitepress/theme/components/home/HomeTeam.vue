<script setup lang="ts">
import type { Contributor } from '../../../../types'

// 只有员工，名单见 constants/teamMembers.ts
defineProps<{ members: Contributor[] }>()

const initial = (name: string) => Array.from(name)[0] ?? ''
</script>

<template>
  <section class="home-section">
    <div class="home-container">
      <div class="home-head home-head--row">
        <div>
          <p class="home-kicker">The team</p>
          <h2 class="home-title">Built and maintained by the Atomeocean team</h2>
          <p class="home-lead">With contributions from the community.</p>
        </div>
        <div class="links">
          <a class="home-link" href="/en/guide/team.html">Meet the team →</a>
          <a class="home-link" href="https://github.com/atomeocean/job-compass/graphs/contributors" target="_blank" rel="noopener">
            All contributors on GitHub ↗
          </a>
        </div>
      </div>
      <ul class="members">
        <li v-for="member in members" :key="member.username">
          <a class="member" :href="member.links?.[0]?.link" target="_blank" rel="noopener">
            <el-avatar :size="72" :src="member.avatar" :alt="member.name">{{ initial(member.name) }}</el-avatar>
            <span class="name">{{ member.name }}</span>
            <span class="role">{{ member.title }}</span>
            <span class="org">{{ member.org }}</span>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
.links {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.members {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.member {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 24px 12px 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg);
  text-align: center;
  transition: border-color 0.2s;

  &:hover {
    border-color: color-mix(in srgb, var(--ao-blue) 45%, var(--vp-c-divider));
  }

  :deep(.el-avatar) {
    margin-bottom: 14px;
    font-size: 26px;
    font-weight: 700;
    color: var(--home-accent);
    background: var(--home-accent-soft);
  }
}

.name {
  font-size: 15px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.role {
  margin-top: 2px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.org {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

@media (max-width: 1080px) {
  .members {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 640px) {
  .members {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

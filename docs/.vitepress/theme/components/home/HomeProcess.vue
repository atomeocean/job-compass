<script setup lang="ts">
// 每一步都对应仓库里真实存在的流程：面经 JSON schema、sourceType + ReferenceSource、
// PR 审批、validate-json 和 pr-docs-build 两个 workflow。改流程时同步改这里的文案
const steps = [
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
]
</script>

<template>
  <section class="home-section home-section--soft">
    <div class="home-container">
      <div class="home-head">
        <p class="home-kicker">How content is made</p>
        <h2 class="home-title">An editorial process you can audit</h2>
        <p class="home-lead">
          Every change happens in public on GitHub, so anyone can trace how a report was added, reviewed and published.
        </p>
      </div>
      <ol class="steps">
        <li v-for="(step, index) in steps" :key="step.title" class="step">
          <span class="number" aria-hidden="true">{{ index + 1 }}</span>
          <h3 class="step-title">{{ step.title }}</h3>
          <p class="step-text">{{ step.text }}</p>
        </li>
      </ol>
      <a
        class="home-link more"
        href="https://github.com/atomeocean/job-compass/pulls?q=is%3Apr+is%3Amerged"
        target="_blank"
        rel="noopener"
      >See the merged pull requests on GitHub ↗</a>
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

.step-text {
  margin: 0;
  font-size: 14px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
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
</style>

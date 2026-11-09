<script setup lang="ts">
// 产品 → 公司的连接点：只写可核验的事实，法人名、地址等细节留在 logbook 的资质页
const links = [
  { text: 'About Atomeocean ↗', href: 'https://logbook.atomeocean.com/en/about-us/', external: true },
  { text: 'Company credentials ↗', href: 'https://logbook.atomeocean.com/en/about-us/legal-credentials/', external: true },
  { text: 'Careers ↗', href: 'https://logbook.atomeocean.com/en/careers/job-post/overview.html', external: true },
  { text: 'customer@atomeocean.com', href: 'mailto:customer@atomeocean.com', external: false },
]
</script>

<template>
  <section class="home-section operator-section">
    <div class="home-container">
      <div class="operator">
        <div class="logo">
          <img class="logo-light" src="/logo.svg" alt="Atomeocean" width="84" height="62" />
          <img class="logo-dark" src="/logo-dark.svg" alt="" width="84" height="62" />
        </div>
        <div>
          <p class="home-kicker">Operated by</p>
          <h2 class="home-title">Atomeocean</h2>
          <p class="body">
            Atomeocean is a U.S. technology company founded in 2021 and based in New York, NY. It builds and maintains
            Job Compass and Logbook.
          </p>
          <div class="links">
            <template v-for="link in links" :key="link.href">
              <a v-if="link.external" class="pill" :href="link.href" target="_blank" rel="noopener">{{ link.text }}</a>
              <a v-else class="pill" :href="link.href">{{ link.text }}</a>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.operator-section {
  padding-top: 0;
}

.operator {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 36px;
  align-items: start;
  padding: 44px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  background: linear-gradient(135deg, var(--home-accent-soft), var(--vp-c-bg) 62%);
}

.logo img {
  width: 84px;
  height: auto;
  margin-top: 6px;
}

.logo-dark {
  display: none;
}

.dark .logo-light {
  display: none;
}

.dark .logo-dark {
  display: block;
}

.body {
  max-width: 46em;
  margin: 0;
  font-size: 16px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;
}

.pill {
  display: inline-flex;
  align-items: center;
  height: 36px;
  padding: 0 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 18px;
  background: var(--vp-c-bg);
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  transition: border-color 0.2s, color 0.2s;

  &:hover {
    border-color: var(--ao-blue);
    color: var(--home-accent);
  }
}

@media (max-width: 640px) {
  .operator {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 28px;
  }
}
</style>

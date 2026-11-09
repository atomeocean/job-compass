<script setup lang="ts">
/**
 * 英文页脚：挂在主题的 layout-bottom 插槽上，doc / page / home 三种布局通用，中文页不渲染。
 * 版式移植自 logbook 的 SiteFooter.vue（同一块深色板和 --sf-* 色值），让两个站点看起来是同一家公司；
 * 链接在 constants/footerLinks.ts。
 */
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import { EN_ONLY_PATHS, FOOTER_COLUMNS, FOOTER_LEGAL, FOOTER_PLATFORMS } from '@ao-constants/footerLinks'
import { data as stats } from '../data/siteStats.data'

// vitepress-i18n 把中文的 localeIndex 映射成 'root'，只能判断 'en'
const { localeIndex } = useData()
const route = useRoute()
const isEn = computed(() => localeIndex.value === 'en')

/** 中文对应页：去掉 /en 前缀；只有英文版的页面回中文首页，而不是一个 404 */
const zhHref = computed(() => {
  if (EN_ONLY_PATHS.has(route.path.replace(/\.html$/, ''))) return '/'
  return route.path.replace(/^\/en(?=\/|$)/, '') || '/'
})
</script>

<template>
  <div v-if="isEn" class="sf-host">
    <footer class="sf">
      <div class="sf-inner">
        <div class="sf-grid">
          <div class="sf-brand">
            <div class="sf-id">
              <img class="sf-logo" src="/logo-dark.svg" alt="Atomeocean" width="48" height="36" />
              <div>
                <div class="sf-wordmark">Job Compass</div>
                <div class="sf-by">BY ATOMEOCEAN</div>
              </div>
            </div>
            <p class="sf-mission">
              Interview experiences from the U.S. job market, structured, sourced and kept current.
              Built and maintained by the Atomeocean team, with contributions from the community.
            </p>
            <div class="sf-platforms">
              <a v-for="link in FOOTER_PLATFORMS" :key="link.href" class="sf-chip" :href="link.href" target="_blank" rel="noopener">
                {{ link.text }} ↗
              </a>
            </div>
          </div>

          <div v-for="column in FOOTER_COLUMNS" :key="column.title" class="sf-col">
            <h4>{{ column.title }}</h4>
            <ul>
              <li v-for="link in column.links" :key="link.href">
                <a v-if="link.external" :href="link.href" target="_blank" rel="noopener">{{ link.text }} ↗</a>
                <a v-else :href="link.href">{{ link.text }}</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="sf-rule" />

        <div class="sf-base">
          <span>© 2024–{{ stats.buildYear }} Atomeocean · New York, NY</span>
          <nav class="sf-legal" aria-label="Legal">
            <template v-for="link in FOOTER_LEGAL" :key="link.href">
              <a v-if="link.external" :href="link.href" target="_blank" rel="noopener">{{ link.text }}</a>
              <a v-else :href="link.href">{{ link.text }}</a>
            </template>
          </nav>
          <div class="sf-lang">
            <a :href="zhHref" lang="zh-CN">中文</a>
            <span class="sep" aria-hidden="true">·</span>
            <span class="on">EN</span>
          </div>
          <p class="sf-fine">
            Company names and trademarks belong to their respective owners. Job Compass is not affiliated with or
            endorsed by the companies it covers.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
/* 页脚有自己一套 --sf-* token，不跟随主题变量：明暗两种主题下都是同一块深色板，只有底色深浅按主题降一档。 */
.sf-host {
  container-type: inline-size;

  /* VPSidebar 是 position: fixed; bottom: 0 且背景不透明，桌面端 z-index 是 25，而 --vp-z-index-footer 只有 10。
     不抬层级的话深色板左侧会被侧边栏盖住（这正是 VitePress 自带 .VPFooter.has-sidebar { display: none } 的原因）。
     26 高于桌面端侧边栏，低于导航(30)、遮罩(50)与移动端侧边栏(60)；同时压过 VPDoc 的 .aside-curtain 与 fixed 的
     .aside-container，否则右侧大纲会印在深色板上。 */
  position: relative;
  z-index: 26;

  --sf-top: #16202b;
  --sf-bot: #101820;
  --sf-ink: #f2f6f9;
  --sf-body: #9eafbd;
  --sf-dim: #8b9dab;
  --sf-mute: #7a8c9b;
  --sf-hair: rgba(255, 255, 255, 0.09);
  --sf-hair-2: rgba(255, 255, 255, 0.15);
  --sf-facet: rgba(255, 255, 255, 0.06);
}

/* VitePress 在 <html> 上切 .dark 类；scoped 下会编译成 .dark .sf-host[data-v-x]，能命中祖先类 */
.dark .sf-host {
  --sf-top: #111a22;
  --sf-bot: #0b1117;
}

.sf {
  background: linear-gradient(180deg, var(--sf-top) 0%, var(--sf-bot) 100%);
  border-top: 1px solid var(--vp-c-gutter);
  /* 顶面高光，让它读起来是一块实体而不是一片色块 */
  box-shadow: inset 0 1px 0 var(--sf-facet);
  color: var(--sf-body);
}

.sf-inner {
  max-width: var(--vp-layout-max-width);
  margin: 0 auto;
  padding: 44px 32px 0;
}

.sf-grid {
  display: grid;
  grid-template-columns: 1.7fr 1fr 1fr 1fr;
  gap: 32px 40px;
}

.sf-id {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sf-logo {
  flex: none;
  width: 48px;
  height: auto;
}

.sf-wordmark {
  font-size: 19px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.015em;
  color: var(--sf-ink);
}

.sf-by {
  margin-top: 4px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.2em;
  color: var(--sf-mute);
}

.sf-mission {
  max-width: 26em;
  margin: 16px 0 0;
  font-size: 12.5px;
  line-height: 1.85;
  color: var(--sf-dim);
}

.sf-platforms {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 18px;
}

.sf-chip {
  padding: 3px 10px;
  border: 1px solid var(--sf-hair-2);
  border-radius: 11px;
  font-size: 11.5px;
  line-height: 1.5;
  color: var(--sf-body);
  transition: color 0.25s, border-color 0.25s;

  &:hover {
    color: #fff;
    border-color: rgba(255, 255, 255, 0.45);
  }
}

.sf-col {
  h4 {
    margin: 0 0 14px;
    padding: 0;
    border: none;
    font-size: 12px;
    font-weight: 700;
    line-height: 1.4;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--sf-ink);
  }

  ul {
    display: grid;
    gap: 9px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    margin: 0;
  }

  a {
    font-size: 13px;
    color: var(--sf-body);
    transition: color 0.25s;

    &:hover {
      color: #fff;
    }
  }
}

.sf-rule {
  height: 1px;
  margin-top: 36px;
  background: var(--sf-hair);
}

.sf-base {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 10px 24px;
  padding: 18px 0 22px;
  font-size: 12px;
  color: var(--sf-mute);
}

.sf-legal {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;

  a {
    color: var(--sf-mute);
    transition: color 0.25s;

    &:hover {
      color: #fff;
    }
  }
}

.sf-lang {
  display: flex;
  align-items: center;
  gap: 8px;

  .on {
    font-weight: 600;
    color: var(--sf-ink);
  }

  .sep {
    color: var(--sf-hair-2);
  }

  a {
    color: var(--sf-mute);
    transition: color 0.25s;

    &:hover {
      color: #fff;
    }
  }
}

.sf-fine {
  width: 100%;
  margin: 2px 0 0;
  font-size: 11.5px;
  color: #6f8192;
}

/* 断点用容器查询而非媒体查询——页脚响应自身宽度 */
@container (max-width: 900px) {
  .sf-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .sf-brand {
    grid-column: 1 / -1;
  }

  .sf-mission {
    max-width: 34em;
  }
}

@container (max-width: 640px) {
  .sf-inner {
    padding: 36px 22px 0;
  }

  .sf-grid {
    grid-template-columns: 1fr 1fr;
    gap: 28px 24px;
  }

  .sf-base {
    justify-content: flex-start;
    gap: 14px;
  }

  .sf-base > span:first-child {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sf a,
  .sf-chip {
    transition: none;
  }
}
</style>

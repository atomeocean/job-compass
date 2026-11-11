<script setup lang="ts">
/**
 * 「本页尚未翻译」页：挂在 not-found 插槽上，只在 /en/、/es/、/fr/ 下缺页时渲染（判断在 theme/index.ts），
 * 告诉读者这页还没有该语言版本，并引导在 GitHub 上新建译文提交 PR。
 * 这页在其他语言下是否存在（决定显示翻译引导还是普通 404）要读浏览器里的 __VP_HASH_MAP__，
 * 所以在 onMounted 之后、并随路由变化重新计算。
 */
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, withBase } from 'vitepress'
import {
  PR_GUIDE_PATH,
  enSourceUrl,
  findPageFile,
  newFileUrl,
  parseMissingTranslation,
  type PrefixedLocale,
} from '@ao-utils/translatePath'

const COPY: Record<PrefixedLocale, {
  language: string
  title: string
  intro: string
  helpTitle: string
  /** [对照英文源文件, 新建译文, 提交 PR] */
  steps: [string, string, string]
  openSource: string
  createFile: string
  guide: string
  notFoundTitle: string
  notFoundText: string
  home: string
}> = {
  en: {
    language: 'English',
    title: 'This page hasn’t been translated into English yet',
    intro: 'You can help by translating it. Anyone can submit a translation on GitHub.',
    helpTitle: 'Help translate this page',
    steps: [
      'Open the English source file on GitHub.',
      'Create the English file at the path below and write the translation.',
      'Commit it to a new branch and open a pull request. A maintainer will review it.',
    ],
    openSource: 'Open the English source',
    createFile: 'Create the file on GitHub',
    guide: 'How to open a pull request',
    notFoundTitle: 'Page not found',
    notFoundText: 'This page doesn’t exist.',
    home: 'Back to home',
  },
  es: {
    language: 'Español',
    title: 'Esta página aún no está traducida al español',
    intro: 'Puedes ayudar traduciéndola. Cualquiera puede enviar una traducción en GitHub.',
    helpTitle: 'Ayuda a traducir esta página',
    steps: [
      'Abre en GitHub el archivo fuente en inglés y úsalo como referencia.',
      'Crea el archivo en español en la ruta indicada y escribe la traducción.',
      'Guárdalo en una rama nueva y abre un pull request. Un responsable lo revisará.',
    ],
    openSource: 'Abrir la fuente en inglés',
    createFile: 'Crear el archivo en GitHub',
    guide: 'Cómo abrir un pull request (inglés)',
    notFoundTitle: 'Página no encontrada',
    notFoundText: 'Esta página no existe.',
    home: 'Volver al inicio',
  },
  fr: {
    language: 'Français',
    title: 'Cette page n’est pas encore traduite en français',
    intro: 'Vous pouvez aider en la traduisant. Tout le monde peut proposer une traduction sur GitHub.',
    helpTitle: 'Aidez à traduire cette page',
    steps: [
      'Ouvrez sur GitHub le fichier source en anglais et servez-vous-en comme référence.',
      'Créez le fichier français au chemin indiqué et rédigez la traduction.',
      'Enregistrez-le sur une nouvelle branche et ouvrez une pull request. Un mainteneur la relira.',
    ],
    openSource: 'Ouvrir la source en anglais',
    createFile: 'Créer le fichier sur GitHub',
    guide: 'Ouvrir une pull request (anglais)',
    notFoundTitle: 'Page introuvable',
    notFoundText: 'Cette page n’existe pas.',
    home: 'Retour à l’accueil',
  },
}

const route = useRoute()
const missing = computed(() => parseMissingTranslation(route.path))
const copy = computed(() => COPY[missing.value?.locale ?? 'en'])

/** 这页在根语言 / 英文下对应的文件。undefined：还没算（SSR）或 dev 下无法判断；null：没有 */
const rootFile = ref<string | null | undefined>()
const enFile = ref<string | null | undefined>()

const resolve = () => {
  const info = missing.value
  if (!info) return
  rootFile.value = findPageFile('', info.rest)
  enFile.value = info.locale === 'en' ? null : findPageFile('en', info.rest)
}
onMounted(resolve)
watch(() => route.path, resolve)

/** dev 下 __VP_HASH_MAP__ 不存在，按「页面存在，文件是 <rest>.md」处理 */
const knownFile = computed(() =>
  rootFile.value === undefined && missing.value ? `${missing.value.rest}.md` : rootFile.value || enFile.value || null)

/** 译文和已有版本同名（区分 guide/about.md 与 guide/about/index.md） */
const targetPath = computed(() => missing.value && knownFile.value ? `docs/${missing.value.locale}/${knownFile.value}` : '')
const createUrl = computed(() => missing.value && knownFile.value ? newFileUrl(missing.value.locale, knownFile.value) : '')
</script>

<template>
  <div v-if="missing" :key="route.path" class="tp" :lang="missing.locale">
    <template v-if="knownFile">
      <p class="tp-lang">{{ copy.language }}</p>
      <h1 class="tp-title">{{ copy.title }}</h1>
      <p class="tp-intro">{{ copy.intro }}</p>

      <section class="tp-help">
        <h2>{{ copy.helpTitle }}</h2>
        <ol>
          <!-- 只有英文版存在时才给源文件链接（/en/ 下缺页时英文版本身就不存在） -->
          <li v-if="enFile">
            {{ copy.steps[0] }}
            <a :href="enSourceUrl(enFile)" target="_blank" rel="noopener">{{ copy.openSource }} ↗</a>
          </li>
          <li>
            {{ copy.steps[1] }} <code>{{ targetPath }}</code>
            <a :href="createUrl" target="_blank" rel="noopener">{{ copy.createFile }} ↗</a>
          </li>
          <li>
            {{ copy.steps[2] }}
            <a :href="withBase(PR_GUIDE_PATH)">{{ copy.guide }}</a>
          </li>
        </ol>
      </section>
    </template>

    <template v-else>
      <p class="tp-code">404</p>
      <h1 class="tp-title">{{ copy.notFoundTitle }}</h1>
      <p class="tp-intro">{{ copy.notFoundText }}</p>
    </template>

    <div class="tp-actions">
      <a class="tp-btn" :href="withBase(`/${missing.locale}/`)">{{ copy.home }}</a>
    </div>
  </div>
</template>

<style scoped>
.tp {
  max-width: 720px;
  margin: 0 auto;
  padding: 64px 24px 96px;
}

.tp-lang,
.tp-code {
  margin: 0 0 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  letter-spacing: 0.04em;
}

.tp-code {
  font-size: 48px;
  line-height: 1.2;
  color: var(--vp-c-text-2);
}

.tp-title {
  margin: 0;
  font-size: 28px;
  line-height: 1.3;
  font-weight: 700;
}

.tp-intro {
  margin: 16px 0 0;
  color: var(--vp-c-text-2);
}

.tp-help {
  margin-top: 32px;
  padding: 24px;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}

.tp-help h2 {
  margin: 0 0 12px;
  font-size: 18px;
}

.tp-help ol {
  margin: 0;
  padding-left: 20px;
  line-height: 1.8;
}

.tp-help li + li {
  margin-top: 8px;
}

.tp-help a {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.tp-help code {
  font-size: 13px;
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--vp-c-default-soft);
  word-break: break-all;
}

.tp-actions {
  margin-top: 32px;
}

.tp-btn {
  display: inline-block;
  padding: 0 20px;
  line-height: 40px;
  border-radius: 20px;
  border: 1px solid var(--vp-button-brand-border);
  background: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
}

@media (min-width: 768px) {
  .tp {
    padding: 96px 32px 128px;
  }

  .tp-title {
    font-size: 32px;
  }
}
</style>

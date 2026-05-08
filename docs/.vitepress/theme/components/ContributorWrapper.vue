<script setup lang="ts">
  import { useChangelog } from "@nolebase/vitepress-plugin-git-changelog/client";
  import type { AuthorInfo } from "@nolebase/vitepress-plugin-git-changelog/client";
  import { computed, onMounted } from "vue";
  import { useData } from "vitepress";
  import { contributors as contributorProfiles } from "../../../_data/contributors";

  interface FrontmatterAuthorInfo {
    name?: string;
    username?: string;
    avatar?: string;
    avatarUrl?: string;
    url?: string;
    link?: string;
    links?: string | Array<{ type?: string; link?: string }>;
    i18n?: Record<string, string>;
  }

  type FrontmatterAuthor = string | FrontmatterAuthorInfo;
  type ContributorProfile = (typeof contributorProfiles)[number];

  interface DisplayAuthor {
    name: string;
    i18n?: Record<string, string>;
    url?: string;
    avatarUrl: string;
    commitsCount: number;
    frontmatterOrder?: number;
    avatarFallback: boolean;
  }

  const { page, lang } = useData()
  const { authors: gitAuthors, useHmr } = useChangelog()

  // 使用页面路径作为 key，确保每次路由切换都重新渲染组件
  const componentKey = computed(() => page.value.relativePath)

  onMounted(() => {
    useHmr()
  })

  const normalizeKey = (value?: string) => value?.trim().toLowerCase()

  const isObject = (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' && value !== null && !Array.isArray(value)

  const normalizeAuthorValue = (value: unknown): FrontmatterAuthor[] => {
    if (!value) return []
    if (Array.isArray(value)) return value.flatMap(normalizeAuthorValue)
    if (typeof value === 'string' && value.trim()) return [value.trim()]
    if (isObject(value)) {
      const name = typeof value.name === 'string' ? value.name.trim() : ''
      const username = typeof value.username === 'string' ? value.username.trim() : ''
      if (name || username) return [value as FrontmatterAuthorInfo]
    }
    return []
  }

  const frontmatterAuthors = computed(() => {
    const frontmatter = page.value.frontmatter ?? {}
    return [
      ...normalizeAuthorValue(frontmatter.authors),
      ...normalizeAuthorValue(frontmatter.author),
      ...normalizeAuthorValue(frontmatter.contributors),
    ]
  })

  const getAuthorName = (author: FrontmatterAuthor) => {
    if (typeof author === 'string') return author
    return author.name?.trim() || author.username?.trim() || ''
  }

  const matchesProfile = (profile: ContributorProfile, name: string) => {
    const normalizedName = normalizeKey(name)
    if (!normalizedName) return false

    return [
      profile.name,
      profile.username,
      ...(profile.mapByNameAliases ?? []),
    ].some((alias) => normalizeKey(alias) === normalizedName)
  }

  const findContributorProfile = (author: FrontmatterAuthor | string) => {
    const names = typeof author === 'string'
      ? [author]
      : [author.name, author.username].filter(Boolean) as string[]

    return contributorProfiles.find((profile) =>
      names.some((name) => matchesProfile(profile, name))
    )
  }

  const getPreferredLink = (links?: FrontmatterAuthorInfo['links']) => {
    if (typeof links === 'string') return links
    if (!Array.isArray(links)) return undefined

    return links.find((link) => link.type === 'github')?.link
      ?? links.find((link) => Boolean(link.link))?.link
  }

  const getProfileUrl = (profile?: ContributorProfile) =>
    getPreferredLink(profile?.links)
    ?? (profile?.username ? `https://github.com/${profile.username}` : undefined)

  const getFallbackAvatar = (name: string) =>
    `https://gravatar.com/avatar/${encodeURIComponent(name)}?d=retro`

  const resolveFrontmatterAuthor = (author: FrontmatterAuthor, index: number): DisplayAuthor | undefined => {
    const profile = findContributorProfile(author)
    const authorInfo = typeof author === 'string' ? undefined : author
    const username = authorInfo?.username ?? profile?.username
    const name = authorInfo?.name ?? profile?.name ?? getAuthorName(author)
    if (!name) return undefined

    const avatarUrl = authorInfo?.avatarUrl
      ?? authorInfo?.avatar
      ?? profile?.avatar
      ?? (username ? `https://github.com/${username}.png` : getFallbackAvatar(name))

    return {
      name,
      i18n: authorInfo?.i18n,
      url: authorInfo?.url
        ?? authorInfo?.link
        ?? getPreferredLink(authorInfo?.links)
        ?? getProfileUrl(profile)
        ?? (username ? `https://github.com/${username}` : undefined),
      avatarUrl,
      commitsCount: 0,
      frontmatterOrder: index,
      avatarFallback: !authorInfo?.avatarUrl && !authorInfo?.avatar && !profile?.avatar && !username,
    }
  }

  const resolveGitAuthor = (author: AuthorInfo): DisplayAuthor => {
    const profile = findContributorProfile(author.name)
    const avatarUrl = profile?.avatar ?? author.avatarUrl ?? getFallbackAvatar(author.name)

    return {
      name: profile?.name ?? author.name,
      i18n: author.i18n,
      url: author.url ?? getProfileUrl(profile),
      avatarUrl,
      commitsCount: author.commitsCount,
      avatarFallback: !profile?.avatar && !author.avatarUrl,
    }
  }

  const displayAuthors = computed(() => {
    const authorsByName = new Map<string, DisplayAuthor>()

    const upsertAuthor = (author: DisplayAuthor) => {
      const key = normalizeKey(author.name)
      if (!key) return

      const existing = authorsByName.get(key)
      if (!existing) {
        authorsByName.set(key, author)
        return
      }

      authorsByName.set(key, {
        ...existing,
        i18n: existing.i18n ?? author.i18n,
        url: existing.url ?? author.url,
        avatarUrl: existing.avatarFallback && !author.avatarFallback ? author.avatarUrl : existing.avatarUrl,
        commitsCount: Math.max(existing.commitsCount, author.commitsCount),
        avatarFallback: existing.avatarFallback && author.avatarFallback,
      })
    }

    frontmatterAuthors.value
      .map(resolveFrontmatterAuthor)
      .filter((author): author is DisplayAuthor => Boolean(author))
      .forEach(upsertAuthor)

    gitAuthors.value
      .map(resolveGitAuthor)
      .forEach(upsertAuthor)

    return Array.from(authorsByName.values()).sort((a, b) => {
      const aOrder = a.frontmatterOrder ?? Number.MAX_SAFE_INTEGER
      const bOrder = b.frontmatterOrder ?? Number.MAX_SAFE_INTEGER
      if (aOrder !== bOrder) return aOrder - bOrder
      return b.commitsCount - a.commitsCount
    })
  })

  const getDisplayName = (author: DisplayAuthor) =>
    author.i18n?.[lang.value] ?? author.name

  const getAvatarFallback = (author: DisplayAuthor) =>
    getDisplayName(author).charAt(0).toUpperCase()
</script>

<template>
  <el-space
    :key="componentKey"
    wrap
    :size="16"
    class="contributor-container vp-nolebase-git-changelog vp-nolebase-git-changelog-contributors vp-nolebase-git-changelog-contributors-container vp-nolebase-git-changelog-contributors-list"
  >
    <template
      v-for="author of displayAuthors"
      :key="author.name"
    >
      <el-link
        v-if="author.url"
        :href="author.url"
        :underline="false"
        class="contributor-link no-icon"
      >
        <el-avatar
          :size="32"
          :src="author.avatarUrl"
          :alt="`The avatar of contributor named as ${author.name}`"
        >
          {{ getAvatarFallback(author) }}
        </el-avatar>
        <el-text class="contributor-name">
          {{ getDisplayName(author) }}
        </el-text>
      </el-link>
      <el-space
        v-else
        :size="8"
        class="contributor-item"
      >
        <el-avatar
          :size="32"
          :src="author.avatarUrl"
          :alt="`The avatar of contributor named as ${author.name}`"
        >
          {{ getAvatarFallback(author) }}
        </el-avatar>
        <el-text class="contributor-name">
          {{ getDisplayName(author) }}
        </el-text>
      </el-space>
    </template>
  </el-space>
</template>

<style scoped>
  .contributor-container {
    margin-bottom: 1.5rem;
    padding: 0.5rem 0;
    font-size: 0.9rem;
    color: #555;
  }

  .contributor-link,
  .contributor-item {
    line-height: 1;
  }

  .contributor-link :deep(.el-link__inner) {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .contributor-name {
    color: inherit;
  }
</style>

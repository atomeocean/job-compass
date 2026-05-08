import type { AuthorInfo } from '@nolebase/vitepress-plugin-git-changelog/client'
import { contributors as contributorProfiles } from '../../../_data/contributors'

export type { AuthorInfo }
export { contributorProfiles }

export type ContributorProfile = (typeof contributorProfiles)[number]

export interface FrontmatterAuthorInfo {
  name?: string
  username?: string
  avatar?: string
  avatarUrl?: string
  url?: string
  link?: string
  links?: string | Array<{ type?: string; link?: string }>
  i18n?: Record<string, string>
}

export type FrontmatterAuthor = string | FrontmatterAuthorInfo

export interface DisplayAuthor {
  name: string
  i18n?: Record<string, string>
  url?: string
  avatarUrl: string
  commitsCount: number
  frontmatterOrder?: number
  avatarFallback: boolean
}

export const normalizeKey = (value?: string): string | undefined =>
  value?.trim().toLowerCase()

export const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

export const normalizeAuthorValue = (value: unknown): FrontmatterAuthor[] => {
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

export const getAuthorName = (author: FrontmatterAuthor): string => {
  if (typeof author === 'string') return author
  return author.name?.trim() || author.username?.trim() || ''
}

export const getPreferredLink = (
  links?: FrontmatterAuthorInfo['links'],
): string | undefined => {
  if (typeof links === 'string') return links
  if (!Array.isArray(links)) return undefined

  return (
    links.find((link) => link.type === 'github')?.link
    ?? links.find((link) => Boolean(link.link))?.link
  )
}

export const getProfileUrl = (profile?: ContributorProfile): string | undefined =>
  getPreferredLink(profile?.links)
  ?? (profile?.username ? `https://github.com/${profile.username}` : undefined)

export const getFallbackAvatar = (name: string): string =>
  `https://gravatar.com/avatar/${encodeURIComponent(name)}?d=retro`

// Module-level alias → profile map. Built once at import time.
// First match wins, preserving the original Array.find insertion-order semantics.
const contributorByAlias = (() => {
  const map = new Map<string, ContributorProfile>()
  for (const profile of contributorProfiles) {
    const aliases = [
      profile.name,
      profile.username,
      ...(profile.mapByNameAliases ?? []),
    ]
    for (const alias of aliases) {
      const key = normalizeKey(alias)
      if (key && !map.has(key)) map.set(key, profile)
    }
  }
  return map
})()

export const findContributorProfile = (
  author: FrontmatterAuthor | string,
): ContributorProfile | undefined => {
  const candidates = typeof author === 'string'
    ? [author]
    : [author.name, author.username].filter(Boolean) as string[]

  for (const candidate of candidates) {
    const key = normalizeKey(candidate)
    if (key) {
      const hit = contributorByAlias.get(key)
      if (hit) return hit
    }
  }
  return undefined
}

export const resolveFrontmatterAuthor = (
  author: FrontmatterAuthor,
  index: number,
): DisplayAuthor | undefined => {
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
    avatarFallback:
      !authorInfo?.avatarUrl && !authorInfo?.avatar && !profile?.avatar && !username,
  }
}

export const resolveGitAuthor = (author: AuthorInfo): DisplayAuthor => {
  const profile = findContributorProfile(author.name)
  const avatarUrl =
    profile?.avatar ?? author.avatarUrl ?? getFallbackAvatar(author.name)

  return {
    name: profile?.name ?? author.name,
    i18n: author.i18n,
    url: author.url ?? getProfileUrl(profile),
    avatarUrl,
    commitsCount: author.commitsCount,
    avatarFallback: !profile?.avatar && !author.avatarUrl,
  }
}

export const upsertAuthor = (
  map: Map<string, DisplayAuthor>,
  author: DisplayAuthor,
): void => {
  const key = normalizeKey(author.name)
  if (!key) return

  const existing = map.get(key)
  if (!existing) {
    map.set(key, author)
    return
  }

  map.set(key, {
    ...existing,
    i18n: existing.i18n ?? author.i18n,
    url: existing.url ?? author.url,
    avatarUrl:
      existing.avatarFallback && !author.avatarFallback
        ? author.avatarUrl
        : existing.avatarUrl,
    commitsCount: Math.max(existing.commitsCount, author.commitsCount),
    avatarFallback: existing.avatarFallback && author.avatarFallback,
  })
}

export const sortDisplayAuthors = (authors: DisplayAuthor[]): DisplayAuthor[] =>
  [...authors].sort((a, b) => {
    const aOrder = a.frontmatterOrder ?? Number.MAX_SAFE_INTEGER
    const bOrder = b.frontmatterOrder ?? Number.MAX_SAFE_INTEGER
    if (aOrder !== bOrder) return aOrder - bOrder
    return b.commitsCount - a.commitsCount
  })

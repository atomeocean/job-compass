import { computed, type ComputedRef } from 'vue'
import { useData } from 'vitepress'
import { useChangelog } from '@nolebase/vitepress-plugin-git-changelog/client'
import {
  normalizeAuthorValue,
  resolveFrontmatterAuthor,
  resolveGitAuthor,
  upsertAuthor,
  sortDisplayAuthors,
  type DisplayAuthor,
  type FrontmatterAuthor,
} from '@ao-utils/contributors'

export interface UseContributorsReturn {
  displayAuthors: ComputedRef<DisplayAuthor[]>
  getDisplayName: (author: DisplayAuthor) => string
  getAvatarFallback: (author: DisplayAuthor) => string
  useHmr: () => void
  pagePath: ComputedRef<string>
}

export function useContributors(): UseContributorsReturn {
  const { page, lang } = useData()
  const { authors: gitAuthors, useHmr } = useChangelog()

  const pagePath = computed(() => page.value.relativePath)

  const frontmatterAuthors = computed<FrontmatterAuthor[]>(() => {
    const fm = page.value.frontmatter ?? {}
    return [
      ...normalizeAuthorValue(fm.authors),
      ...normalizeAuthorValue(fm.author),
      ...normalizeAuthorValue(fm.contributors),
    ]
  })

  const displayAuthors = computed<DisplayAuthor[]>(() => {
    const byName = new Map<string, DisplayAuthor>()
    frontmatterAuthors.value
      .map(resolveFrontmatterAuthor)
      .filter((a): a is DisplayAuthor => Boolean(a))
      .forEach((a) => upsertAuthor(byName, a))
    gitAuthors.value
      .map(resolveGitAuthor)
      .forEach((a) => upsertAuthor(byName, a))
    return sortDisplayAuthors(Array.from(byName.values()))
  })

  const getDisplayName = (author: DisplayAuthor): string =>
    author.i18n?.[lang.value] ?? author.name

  const getAvatarFallback = (author: DisplayAuthor): string =>
    (Array.from(getDisplayName(author))[0] ?? '').toUpperCase()

  return { displayAuthors, getDisplayName, getAvatarFallback, useHmr, pagePath }
}

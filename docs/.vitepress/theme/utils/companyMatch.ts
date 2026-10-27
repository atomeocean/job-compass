import { COMPANY_ALIASES } from '@ao-constants/companyNames'

/**
 * 首页公司搜索：公司名、面经目录名（slug）和 COMPANY_ALIASES 里的中文叫法，任一包含搜索词就算匹配，不区分大小写。
 * 搜索词为空时全部匹配。
 */
export const companyMatches = (company: { name: string; slug: string }, query: string): boolean => {
  const term = query.trim().toLowerCase()
  if (!term) return true
  return [company.name, company.slug, ...(COMPANY_ALIASES[company.slug] ?? [])].some((text) =>
    text.toLowerCase().includes(term),
  )
}

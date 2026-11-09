import type { ReferenceSourceItem, SiteMark } from '@ao-types/referenceSourceTypes'

// 常见来源站点的标识，key 是文章里 site 字段的原值；不在表里的站点取名称首字、灰色
const SITE_MARKS: Record<string, SiteMark> = {
  '一亩三分地': { char: '地', color: '#1f8a5b' },
  '小红书': { char: '红', color: '#e0263e' },
  'RedNote': { char: '红', color: '#e0263e' },
  'Xiaohongshu': { char: '红', color: '#e0263e' },
  '知乎': { char: '知', color: '#1772f6' },
  'LeetCode': { char: 'L', color: '#c27a00' },
  'Reddit': { char: 'R', color: '#e5501b' },
  'Glassdoor': { char: 'G', color: '#0a9a3c' }
}

const FALLBACK_MARK_COLOR = '#6b6b73'

export const getSiteMark = (site?: string): SiteMark => {
  const name = site?.trim() ?? ''
  return SITE_MARKS[name] ?? {
    char: (Array.from(name)[0] ?? '?').toUpperCase(),
    color: FALLBACK_MARK_COLOR
  }
}

/**
 * 只有 http(s) 链接才渲染成可点击，现有文章里有把 link 写成「请复制下方文本」的
 */
export const isHttpUrl = (link?: string): boolean => /^https?:\/\//i.test(link?.trim() ?? '')

/**
 * 列表模式下一行展示的元信息：站点 · 作者 · 日期 · 分类
 */
export const getSourceMeta = (source: ReferenceSourceItem): string[] =>
  [source.site, source.author, source.date, source.category].filter((value): value is string => !!value)

/**
 * 面经 JSON 取值 → 页面文案。
 * 旧 JSON 的取值很杂（大小写、中英文混用、模板占位符），规范写法见
 * docs/zhHans/interview-experience/CLAUDE.md 的 Vocabulary；这里认得规范值，其余原样显示，占位符当作空值。
 */
import type { InterviewData, InterviewRound, InterviewTimelineEvent } from './interviewData'
import type { InterviewNavItem } from '@ao-types/interviewNavTypes'

/** 模板遗留的占位值和「未知」，按空值处理 */
const PLACEHOLDERS = new Set(['', 'string', 'url', 'na', 'n/a', 'null', 'unknown', '未知'])

/** 去掉首尾空白；占位值返回空字符串 */
export const cleanValue = (value?: string | null): string => {
  const text = (value ?? '').toString().trim()
  return PLACEHOLDERS.has(text.toLowerCase()) ? '' : text
}

/** 'Full Time' / 'full_time' → 'full-time'，用于查表 */
const toKey = (value: string): string => value.toLowerCase().replace(/[\s_]+/g, '-')

const lookup = (labels: Record<string, string>, value?: string | null): string => {
  const text = cleanValue(value)
  return text ? labels[toKey(text)] ?? text : ''
}

const LEVEL_LABELS: Record<string, string> = {
  intern: '实习',
  'new-grad': '应届 NG',
  'mid-level': '中级',
  senior: '高级',
}

/** 级别；公司职级（l4、L5）统一大写 */
export const formatLevel = (level?: string): string => {
  const text = cleanValue(level)
  if (/^l\d+$/i.test(text)) return text.toUpperCase()
  return lookup(LEVEL_LABELS, text)
}

export const formatJobType = (jobType?: string): string =>
  lookup({ 'full-time': '全职', internship: '实习', contract: '合同工' }, jobType)

export const formatChannel = (channel?: string): string =>
  lookup(
    {
      'direct-apply': '官网投递',
      // 旧 JSON 里的写法
      'online-application': '官网投递',
      online: '官网投递',
      网投: '官网投递',
      网上海投: '官网投递',
      海投: '官网投递',
      referral: '内推',
      recruiter: 'Recruiter 联系',
      猎头: 'Recruiter 联系',
      'online-assessment': 'OA 邀请',
      other: '其他',
    },
    channel,
  )

export const formatEducation = (education?: string): string =>
  lookup({ bachelor: '本科', master: '硕士', phd: '博士' }, education)

/**
 * 背景：学历 + JSON 里的背景描述（例如「在职跳槽，6年工作经验」）+ 工作年限。
 * 年限只在大于 0 且描述里没提时显示；学历已经写在描述里时不重复。
 */
export const formatBackground = (candidate?: InterviewData['candidate']): string => {
  const education = formatEducation(candidate?.education)
  let text = cleanValue(candidate?.background)
  if (/^\d+$/.test(text)) text = ''
  if (/^(new[\s_-]*grad(uate)?|ng)$/i.test(text)) text = '应届'
  const years = candidate?.yearsOfExperience
  return [
    education && !text.includes(education) ? education : '',
    ...text.split(/[，,、]/).map((part) => part.trim()),
    typeof years === 'number' && years > 0 && !/年|year|yoe/i.test(text) ? `${years} 年经验` : ''
  ]
    .filter(Boolean)
    .join(' · ')
}

export type ResultTone = 'ok' | 'bad' | 'wait' | 'none'

export interface ResultLabel {
  label: string
  tone: ResultTone
}

const RESULT_LABELS: Record<string, ResultLabel> = {
  pass: { label: '通过', tone: 'ok' },
  passed: { label: '通过', tone: 'ok' },
  accepted: { label: '通过', tone: 'ok' },
  positive: { label: '通过', tone: 'ok' },
  offer: { label: 'Offer', tone: 'ok' },
  rejected: { label: '未通过', tone: 'bad' },
  reject: { label: '未通过', tone: 'bad' },
  fail: { label: '未通过', tone: 'bad' },
  failed: { label: '未通过', tone: 'bad' },
  pending: { label: '等待结果', tone: 'wait' },
  waiting: { label: '等待结果', tone: 'wait' },
  waitlist: { label: '候补', tone: 'wait' },
  other: { label: '其他', tone: 'none' },
}

/** 面试结果；空值和 unknown 返回 null（不显示） */
export const formatResult = (result?: string): ResultLabel | null => {
  const text = cleanValue(result)
  if (!text) return null
  // 「未通过」必须先于「通过」判断，否则会被前缀匹配吞掉
  if (text.startsWith('未通过')) return { label: text, tone: 'bad' }
  if (text.startsWith('通过')) return { label: text, tone: 'ok' }
  return RESULT_LABELS[toKey(text)] ?? { label: text, tone: 'none' }
}

const ROUND_LABELS: Record<string, string> = {
  oa: 'OA',
  'recruiter-screen': 'HR 初筛',
  'phone-screen': '电面',
  phone: '电面',
  'technical-phone-screen': '技术电面',
  technical: '技术面',
  techinical: '技术面',
  coding: 'Coding',
  'system-design': '系统设计',
  behavioral: 'BQ',
  'hiring-manager': 'HM 面',
  hm: 'HM 面',
  onsite: 'Onsite',
  'virtual-onsite': 'VO',
}

/** 轮次类型；不认识的值按单词首字母大写，VO1 这类缩写保持全大写 */
export const formatRoundType = (roundType?: string): string => {
  const text = cleanValue(roundType)
  if (!text) return '面试'
  const known = ROUND_LABELS[toKey(text)]
  if (known) return known
  return text
    .split(/[-_\s]+/)
    .map((word) => (/^(vo\d*|oa|hm)$/i.test(word) ? word.toUpperCase() : word.charAt(0).toUpperCase() + word.slice(1)))
    .join(' ')
}

/**
 * 绝大多数面经 JSON 用 interview.rounds 逐轮记录；
 * 少数早期文件仍是 interview.roundType / interview.rate 的扁平写法，这里做兼容。
 */
export const getRounds = (interview?: InterviewData['interview']): InterviewRound[] => {
  if (!interview) return []
  if (Array.isArray(interview.rounds) && interview.rounds.length > 0) return interview.rounds
  if (interview.roundType || interview.rate != null) {
    return [{ roundType: interview.roundType ?? '', rate: interview.rate ?? null }]
  }
  return []
}

const DIFFICULTY_LABELS = ['很简单', '简单', '中等', '较难', '很难']

export interface Difficulty {
  rate: number
  label: string
  /** 沿用 LeetCode 的 Easy / Medium / Hard 配色 */
  tone: 'easy' | 'mid' | 'hard'
}

/** 难度 1–5；null 或超出范围返回 null（显示「未提及难度」） */
export const formatDifficulty = (rate?: number | null): Difficulty | null => {
  if (typeof rate !== 'number' || !Number.isInteger(rate) || rate < 1 || rate > 5) return null
  return { rate, label: DIFFICULTY_LABELS[rate - 1], tone: rate <= 2 ? 'easy' : rate === 3 ? 'mid' : 'hard' }
}

/** 卡片上显示的公司名：优先公司 index.md 的 title，其次 JSON 的 company，最后目录名 */
export const formatCompanyTitle = (navTitle?: string, jsonCompany?: string, dirName?: string): string => {
  const name = cleanValue(navTitle) || cleanValue(jsonCompany) || cleanValue(dirName)
  return name ? name.charAt(0).toUpperCase() + name.slice(1) : ''
}

/* ---------------- 本公司面经抽屉 ---------------- */

export interface NavGroup {
  label: string
  items: InterviewNavItem[]
}

const LEVEL_ORDER = ['intern', 'new-grad', 'mid-level', 'senior']
const NO_LEVEL = '未标级别'

/** 组的排序：实习、应届、L3、L4…、中级、高级，最后是其他和未标级别 */
const levelRank = (level: string): number => {
  const text = cleanValue(level).toLowerCase()
  if (!text) return 1000
  const ladder = text.match(/^l(\d+)$/)
  if (ladder) return 10 + Number(ladder[1])
  const index = LEVEL_ORDER.indexOf(toKey(text))
  if (index === 0 || index === 1) return index
  if (index >= 2) return 100 + index
  return 500
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

/** 按级别分组；组内按面试日期从新到旧，没有日期的排在后面 */
export const groupNavItems = (items: InterviewNavItem[]): NavGroup[] => {
  const groups = new Map<string, { rank: number; items: InterviewNavItem[] }>()
  for (const item of items) {
    const label = formatLevel(item.level) || NO_LEVEL
    const group = groups.get(label) ?? { rank: levelRank(item.level), items: [] }
    group.items.push(item)
    groups.set(label, group)
  }
  const byDate = (a: InterviewNavItem, b: InterviewNavItem): number => {
    const da = ISO_DATE.test(a.date) ? a.date : ''
    const db = ISO_DATE.test(b.date) ? b.date : ''
    if (da !== db) return da && db ? db.localeCompare(da) : da ? -1 : 1
    return a.title.localeCompare(b.title, 'zh-Hans-CN')
  }
  return [...groups.entries()]
    .sort(([la, a], [lb, b]) => a.rank - b.rank || la.localeCompare(lb))
    .map(([label, group]) => ({ label, items: group.items.sort(byDate) }))
}

/* ---------------- 求职时间线 ---------------- */

const FULL_DATE = /^(\d{4})-(\d{2})-(\d{2})$/
const MONTH_DATE = /^(\d{4})-(\d{2})$/

const toDayNumber = (date: string): number | null => {
  const m = date.match(FULL_DATE)
  return m ? Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])) / 86_400_000 : null
}

export type TimelineRow =
  | {
      kind: 'event'
      event: InterviewTimelineEvent
      /** 日期文案；原文没给日期时为 dateText 或「日期未提及」 */
      dateLabel: string
      hasDate: boolean
    }
  | {
      kind: 'gap'
      days: number
      /** 所有能算出的间隔里最长的一段，至少有两段时才标 */
      longest: boolean
    }

export interface TimelineView {
  rows: TimelineRow[]
  /** 例如「网申 → Onsite 两轮：37 天；最后一步（拿到 Offer）没有日期」；算不出时为空 */
  summary: string
}

/**
 * 把时间线事件排成「事件 / 间隔 / 事件」的行。
 * 只有相邻两个事件都有完整日期时才显示间隔天数；算不出的间隔不占一行，避免满屏「间隔未知」。
 */
export const buildTimelineView = (events: InterviewTimelineEvent[]): TimelineView => {
  const valid = events.filter((e) => cleanValue(e?.event))
  const fullDates = valid.map((e) => (e.date && FULL_DATE.test(e.date) ? e.date : ''))
  const years = new Set(valid.map((e) => e.date?.slice(0, 4)).filter((y): y is string => Boolean(y)))
  const sameYear = years.size <= 1

  const dateLabel = (event: InterviewTimelineEvent): string => {
    const date = event.date ?? ''
    const full = date.match(FULL_DATE)
    if (full) return sameYear ? `${full[2]}-${full[3]}` : date
    const month = date.match(MONTH_DATE)
    if (month) return event.dateText?.trim() || (sameYear ? `${Number(month[2])} 月` : `${month[1]} 年 ${Number(month[2])} 月`)
    return event.dateText?.trim() || '日期未提及'
  }

  const gaps = valid.map((_, i) => {
    if (i === 0) return null
    const a = toDayNumber(fullDates[i - 1])
    const b = toDayNumber(fullDates[i])
    return a !== null && b !== null && b >= a ? b - a : null
  })
  const known = gaps.filter((g): g is number => g !== null)
  const longestIndex = known.length >= 2 ? gaps.indexOf(Math.max(...known)) : -1

  const rows: TimelineRow[] = []
  valid.forEach((event, i) => {
    const gap = gaps[i]
    if (gap !== null) rows.push({ kind: 'gap', days: gap, longest: i === longestIndex })
    rows.push({ kind: 'event', event, dateLabel: dateLabel(event), hasDate: Boolean(event.date) })
  })

  const firstIndex = fullDates.findIndex(Boolean)
  const lastIndex = fullDates.length - 1 - [...fullDates].reverse().findIndex(Boolean)
  let summary = ''
  if (firstIndex !== -1 && lastIndex > firstIndex) {
    const days = (toDayNumber(fullDates[lastIndex]) ?? 0) - (toDayNumber(fullDates[firstIndex]) ?? 0)
    summary = `${valid[firstIndex].event} → ${valid[lastIndex].event}：${days} 天`
    const final = valid[valid.length - 1]
    if (lastIndex < valid.length - 1 && !final.date && !final.dateText) summary += `；最后一步（${final.event}）没有日期`
  }
  return { rows, summary }
}

import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { basename, join, relative, sep } from 'node:path'
import { defineLoader, type SiteConfig } from 'vitepress'
// 数据加载器由 Vite 单独打包执行，不经过 config.ts 里的 alias，这里只能用相对路径
import { readFrontmatterTitle } from '../../interviewNav'
import { ENGLISH_COMPANY_NAMES, NON_COMPANY_DIRS } from '../constants/companyNames'

export interface CompanyStat {
  slug: string
  name: string
  reports: number
  /** 中文公司页；公司目录没有 index.md 时指向该公司最新的一篇面经 */
  href: string
}

/** git 历史里的活跃度数字；构建环境拿不到完整历史时整组为 null，页面上对应的数字不显示 */
export interface GitActivity {
  commits: number
  /** 第一次提交的月份，如 "November 2024" */
  since: string
  /** 最后一次提交的日期，如 "Oct 27, 2026" */
  lastUpdated: string
  pullRequestsMerged30d: number
  activeContributors90d: number
}

export interface SiteStats {
  interviewReports: number
  /** 按面经数从多到少；不含 NON_COMPANY_DIRS */
  companies: CompanyStat[]
  companyProfiles: number
  jobPostings: number
  jobPostingEmployers: number
  /** 职位地点覆盖的州数，只算 50 个州，不含 DC */
  jobPostingStates: number
  interviewPrepGuides: number
  careerGuides: number
  git: GitActivity | null
  buildYear: number
}

declare const data: SiteStats
export { data }

const INTERVIEW_JSON = 'assets/json/interview-experience/'
const NON_ARTICLE = new Set(['index.md', 'overview.md', 'CLAUDE.md'])
const US_STATES = new Set([
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY',
  'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
  'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
])
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
/** squash 合并的提交标题以 (#123) 结尾；少数 PR 走的是 merge commit */
const PULL_REQUEST_SUBJECT = /\(#\d+\)\s*$|^Merge pull request #\d+/
const BOT_EMAIL = /\[bot\]|noreply@anthropic\.com|\+copilot@users\.noreply\.github\.com/i
const DAY_MS = 24 * 60 * 60 * 1000

const readJson = (file: string): any => {
  try {
    return JSON.parse(readFileSync(file, 'utf-8'))
  } catch {
    // 坏掉的 JSON 由 validate-json workflow 拦下，这里只是不计数
    return null
  }
}

/** "2026-10-27T00:35:05-04:00" → "Oct 27, 2026"；直接取字符串里的日期，不受构建机时区影响 */
const formatDay = (iso: string): string => {
  const [year, month, day] = iso.slice(0, 10).split('-').map(Number)
  return `${MONTHS[month - 1].slice(0, 3)} ${day}, ${year}`
}

const formatMonth = (iso: string): string => {
  const [year, month] = iso.slice(0, 7).split('-').map(Number)
  return `${MONTHS[month - 1]} ${year}`
}

const capitalize = (word: string): string => {
  const [first = '', ...rest] = Array.from(word)
  return first.toUpperCase() + rest.join('')
}

/** 先查英文写法表；index.md 的 title 全是小写时（uber、applied-intuition）按单词首字母大写 */
const companyName = (slug: string, title: string): string => {
  if (ENGLISH_COMPANY_NAMES[slug]) return ENGLISH_COMPANY_NAMES[slug]
  const text = title || slug
  return text === text.toLowerCase() ? text.split(/[-\s]+/).map(capitalize).join(' ') : text
}

/**
 * 公司网格的链接。有些公司目录没有 index.md（uber、stubhub 等），链过去会 404，
 * 这时指向 createdDate 最新的一篇面经：文章页的「本公司面经」抽屉能看到同公司其余面经。
 */
const companyHref = (companyDir: string, slug: string): string => {
  if (existsSync(join(companyDir, 'index.md'))) return `/interview-experience/${slug}/`
  const newest = readdirSync(companyDir)
    .filter((file) => file.endsWith('.md') && !NON_ARTICLE.has(file))
    .map((file) => ({
      file,
      createdDate: readFileSync(join(companyDir, file), 'utf-8').match(/^createdDate:\s*(\S+)/m)?.[1] ?? '',
    }))
    .sort((a, b) => b.createdDate.localeCompare(a.createdDate))[0]
  return newest ? `/interview-experience/${slug}/${newest.file.slice(0, -3)}.html` : '/interview-experience/'
}

const readGitActivity = (cwd: string, now: number): GitActivity | null => {
  const git = (...args: string[]) => execFileSync('git', args, { cwd, encoding: 'utf-8', maxBuffer: 64 * 1024 * 1024 })
  try {
    // 浅克隆只有最近几次提交，算出来的数字是错的，宁可不显示
    if (git('rev-parse', '--is-shallow-repository').trim() === 'true') {
      console.warn('[siteStats] 浅克隆拿不到完整 git 历史，首页不显示活跃度数字（构建需要 fetch-depth: 0）')
      return null
    }
    const commits = git('log', '--format=%cI%x09%ae%x09%s')
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        const [date, email, subject] = line.split('\t')
        return { date, time: Date.parse(date), email: email.toLowerCase(), subject }
      })
    if (commits.length === 0) return null
    const within = (days: number) => commits.filter((commit) => now - commit.time <= days * DAY_MS)
    return {
      commits: commits.length,
      since: formatMonth(commits[commits.length - 1].date),
      lastUpdated: formatDay(commits[0].date),
      pullRequestsMerged30d: within(30).filter((commit) => PULL_REQUEST_SUBJECT.test(commit.subject)).length,
      activeContributors90d: new Set(
        within(90).filter((commit) => !BOT_EMAIL.test(commit.email)).map((commit) => commit.email),
      ).size,
    }
  } catch (error) {
    console.warn(`[siteStats] 读取 git 历史失败，首页不显示活跃度数字：${error}`)
    return null
  }
}

/**
 * 英文首页和页脚用的站点统计，构建时从仓库计算，结果直接进静态 HTML，浏览器端不再请求。
 * 面经 / 公司 / 职位数来自 JSON，栏目篇数来自 Markdown，活跃度来自 git 历史（部署 workflow 是 fetch-depth: 0）。
 */
export default defineLoader({
  watch: [
    '../../../assets/json/interview-experience/**/*.json',
    '../../../zhHans/interview-experience/*/index.md',
    '../../../zhHans/direct-hire-company/**/*.json',
    '../../../zhHans/job-postings/*/data/*.json',
    '../../../zhHans/interview-prepare/**/*.md',
    '../../../zhHans/career-guide/**/*.md',
  ],
  load(files: string[]): SiteStats {
    const { srcDir } = (globalThis as any).VITEPRESS_CONFIG as SiteConfig
    const inDir = (dir: string) => files.filter((file) => relative(srcDir, file).split(sep).join('/').startsWith(dir))
    const articles = (dir: string) => inDir(dir).filter((file) => file.endsWith('.md') && !NON_ARTICLE.has(basename(file)))

    const reports = inDir(INTERVIEW_JSON).filter((file) => file.endsWith('.json'))
    const reportsPerCompany = new Map<string, number>()
    for (const file of reports) {
      const slug = relative(join(srcDir, INTERVIEW_JSON), file).split(sep)[0]
      if (!NON_COMPANY_DIRS.has(slug)) reportsPerCompany.set(slug, (reportsPerCompany.get(slug) ?? 0) + 1)
    }
    const companies = [...reportsPerCompany]
      .map(([slug, count]) => {
        const companyDir = join(srcDir, 'zhHans/interview-experience', slug)
        const indexFile = join(companyDir, 'index.md')
        const title = existsSync(indexFile) ? readFrontmatterTitle(indexFile) : ''
        return { slug, name: companyName(slug, title), reports: count, href: companyHref(companyDir, slug) }
      })
      .sort((a, b) => b.reports - a.reports || a.name.localeCompare(b.name))

    const postings = inDir('zhHans/job-postings/').map(readJson).filter(Boolean)
    const employers = new Set(postings.map((posting) => String(posting.companyName ?? '').trim().toLowerCase()).filter(Boolean))
    const states = new Set<string>()
    for (const posting of postings) {
      for (const location of posting.jobLocation ?? []) {
        for (const [, code] of String(location).matchAll(/\bUSA,\s*([A-Z]{2})\b/g)) {
          if (US_STATES.has(code)) states.add(code)
        }
      }
    }

    const now = Date.now()
    return {
      interviewReports: reports.length,
      companies,
      companyProfiles: inDir('zhHans/direct-hire-company/').length,
      jobPostings: postings.length,
      jobPostingEmployers: employers.size,
      jobPostingStates: states.size,
      interviewPrepGuides: articles('zhHans/interview-prepare/').length,
      careerGuides: articles('zhHans/career-guide/').length,
      git: readGitActivity(srcDir, now),
      buildYear: new Date(now).getFullYear(),
    }
  },
})

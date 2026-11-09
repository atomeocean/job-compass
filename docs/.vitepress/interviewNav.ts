import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { basename, join, sep } from 'node:path'
import type { InterviewNav, InterviewNavItem } from './theme/types/interviewNavTypes'

const REPO_URL = 'https://github.com/atomeocean/job-compass'

/** 面经文章页的源文件路径，例如 zhHans/interview-experience/google/8nmi24.md；Amazon 还有 onsite/ 这样的阶段子目录 */
const ARTICLE_FILE = /^zhHans\/interview-experience\/([^/]+)\/(.+)\.md$/
/** 公司目录页的源文件路径，例如 zhHans/interview-experience/google/index.md */
const COMPANY_INDEX = /^zhHans\/interview-experience\/([^/]+)\/index\.md$/
/** 公司目录下不算面经的文件 */
const NON_ARTICLE = new Set(['index', 'overview', 'CLAUDE'])

/** frontmatter 里的单行 title；面经页和公司 index.md 都是这种写法 */
export const readFrontmatterTitle = (file: string): string => {
  const block = readFileSync(file, 'utf-8').match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? ''
  const title = block.match(/^title:\s*(.+?)\s*$/m)?.[1] ?? ''
  return title.replace(/^(['"])(.*)\1$/, '$2')
}

/** createdDate 的写法不统一（2026-6-9、{2025-11-22}），统一成 YYYY-MM-DD；认不出时返回空字符串 */
const normalizeDate = (raw: string): string => {
  const match = raw.match(/(\d{4})-(\d{1,2})-(\d{1,2})/)
  return match ? `${match[1]}-${match[2].padStart(2, '0')}-${match[3].padStart(2, '0')}` : ''
}

export const readCreatedDate = (file: string): string =>
  normalizeDate(readFileSync(file, 'utf-8').match(/^createdDate:\s*(.+)$/m)?.[1] ?? '')

const readJson = (file: string): any => {
  try {
    return JSON.parse(readFileSync(file, 'utf-8'))
  } catch {
    // 缺失或损坏的 JSON 由 readInterviewSourceType 对当前页报警告，这里只是同公司列表，静默跳过
    return {}
  }
}

/** 列出目录下的全部文件，含子目录；路径相对该目录，统一用 / 分隔 */
const listFiles = (dir: string): string[] =>
  (readdirSync(dir, { recursive: true }) as string[]).map((file) => file.split(sep).join('/'))

/** 每一轮的类型，兼容旧 JSON 的扁平写法 interview.roundType */
const readRoundTypes = (interview: any): string[] => {
  if (Array.isArray(interview?.rounds)) return interview.rounds.map((round: any) => round?.roundType ?? '')
  return interview?.roundType ? [interview.roundType] : []
}

/** 一家公司的全部面经，含阶段子目录；抽屉和公司目录页共用 */
const readCompanyArticles = (srcDir: string, company: string): InterviewNavItem[] => {
  const mdDir = join(srcDir, 'zhHans/interview-experience', company)
  const jsonDir = join(srcDir, 'assets/json/interview-experience', company)

  return listFiles(mdDir)
    .filter((file) => file.endsWith('.md') && !NON_ARTICLE.has(basename(file, '.md')))
    .map((file) => {
      const slug = file.slice(0, -3)
      const json = readJson(join(jsonDir, `${slug}.json`))
      const roundTypes = readRoundTypes(json.interview)
      return {
        href: `/interview-experience/${company}/${slug}`,
        title: readFrontmatterTitle(join(mdDir, file)) || slug,
        level: json.position?.level ?? '',
        result: json.interview?.result ?? '',
        rounds: roundTypes.length,
        roundTypes,
        date: json.interview?.date ?? '',
        createdDate: readCreatedDate(join(mdDir, file)),
      }
    })
}

const readCompany = (srcDir: string, company: string): InterviewNav['company'] => {
  const indexFile = join(srcDir, 'zhHans/interview-experience', company, 'index.md')
  const title = (existsSync(indexFile) && readFrontmatterTitle(indexFile)) || company
  return { slug: company, title, href: `/interview-experience/${company}/` }
}

/** direct-hire-company 下和面经目录同名的公司介绍页，例如 washington/seattle/amazon.md；没有时返回空字符串 */
const findCompanyIntro = (srcDir: string, company: string): string => {
  const file = listFiles(join(srcDir, 'zhHans/direct-hire-company')).find((path) => basename(path) === `${company}.md`)
  return file ? `/direct-hire-company/${file.slice(0, -3)}` : ''
}

/**
 * 生成面经文章页的导航数据（面包屑 + 本公司面经抽屉）。
 * 在 transformPageData 里调用；JSON 只在 Markdown 重新编译时读取，所以 docs:dev 下只改 JSON 要重启才会刷新抽屉。
 * @param filePath - 相对 srcDir 的源文件路径，如 "zhHans/interview-experience/google/8nmi24.md"
 * @returns 非面经文章页返回 undefined
 */
export function buildInterviewNav(srcDir: string, filePath: string): InterviewNav | undefined {
  const match = filePath.match(ARTICLE_FILE)
  if (!match || NON_ARTICLE.has(basename(match[2]))) return undefined
  const [, company, slug] = match

  return {
    company: readCompany(srcDir, company),
    items: readCompanyArticles(srcDir, company),
    jsonEditUrl: `${REPO_URL}/edit/main/docs/assets/json/interview-experience/${company}/${slug}.json`,
  }
}

/**
 * 生成公司目录页（<company>/index.md）的导航数据，<CompanyInterviewList /> 用它列出全部面经。
 * 面经 JSON 的 interview.date 过半是空的，所以按 createdDate（收录时间）从新到旧排；在这里排好，SSR 和浏览器的顺序才一致。
 * @param filePath - 相对 srcDir 的源文件路径，如 "zhHans/interview-experience/google/index.md"
 * @returns 非公司目录页返回 undefined
 */
export function buildInterviewCompanyNav(srcDir: string, filePath: string): InterviewNav | undefined {
  const company = filePath.match(COMPANY_INDEX)?.[1]
  if (!company) return undefined

  return {
    company: { ...readCompany(srcDir, company), introHref: findCompanyIntro(srcDir, company) },
    items: readCompanyArticles(srcDir, company).sort(
      (a, b) => b.createdDate.localeCompare(a.createdDate) || a.href.localeCompare(b.href),
    ),
  }
}

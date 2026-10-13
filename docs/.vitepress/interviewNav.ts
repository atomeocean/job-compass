import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { InterviewNav, InterviewNavItem } from './theme/types/interviewNavTypes'

const REPO_URL = 'https://github.com/atomeocean/job-compass'

/** 面经文章页的源文件路径，例如 zhHans/interview-experience/google/8nmi24.md；只认公司目录下一层 */
const ARTICLE_FILE = /^zhHans\/interview-experience\/([^/]+)\/([^/]+)\.md$/
/** 公司目录下不算面经的文件 */
const NON_ARTICLE = new Set(['index', 'overview', 'CLAUDE'])

/** frontmatter 里的单行 title；面经页和公司 index.md 都是这种写法 */
const readFrontmatterTitle = (file: string): string => {
  const block = readFileSync(file, 'utf-8').match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? ''
  const title = block.match(/^title:\s*(.+?)\s*$/m)?.[1] ?? ''
  return title.replace(/^(['"])(.*)\1$/, '$2')
}

const readJson = (file: string): any => {
  try {
    return JSON.parse(readFileSync(file, 'utf-8'))
  } catch {
    // 缺失或损坏的 JSON 由 readInterviewSourceType 对当前页报警告，这里只是同公司列表，静默跳过
    return {}
  }
}

/** 兼容旧 JSON 的扁平写法 interview.roundType / interview.rate */
const countRounds = (interview: any): number => {
  if (Array.isArray(interview?.rounds)) return interview.rounds.length
  return interview?.roundType ? 1 : 0
}

/**
 * 生成面经文章页的导航数据（面包屑 + 本公司面经抽屉）。
 * 在 transformPageData 里调用；JSON 只在 Markdown 重新编译时读取，所以 docs:dev 下只改 JSON 要重启才会刷新抽屉。
 * @param filePath - 相对 srcDir 的源文件路径，如 "zhHans/interview-experience/google/8nmi24.md"
 * @returns 非面经文章页返回 undefined
 */
export function buildInterviewNav(srcDir: string, filePath: string): InterviewNav | undefined {
  const match = filePath.match(ARTICLE_FILE)
  if (!match || NON_ARTICLE.has(match[2])) return undefined
  const [, company, slug] = match

  const mdDir = join(srcDir, 'zhHans/interview-experience', company)
  const jsonDir = join(srcDir, 'assets/json/interview-experience', company)

  const items: InterviewNavItem[] = readdirSync(mdDir)
    .filter((file) => file.endsWith('.md') && !NON_ARTICLE.has(file.slice(0, -3)))
    .map((file) => {
      const itemSlug = file.slice(0, -3)
      const json = readJson(join(jsonDir, `${itemSlug}.json`))
      return {
        href: `/interview-experience/${company}/${itemSlug}`,
        title: readFrontmatterTitle(join(mdDir, file)) || itemSlug,
        level: json.position?.level ?? '',
        result: json.interview?.result ?? '',
        rounds: countRounds(json.interview),
        date: json.interview?.date ?? '',
      }
    })

  const indexFile = join(mdDir, 'index.md')
  const companyTitle = (existsSync(indexFile) && readFrontmatterTitle(indexFile)) || company

  return {
    company: { slug: company, title: companyTitle, href: `/interview-experience/${company}/` },
    items,
    jsonEditUrl: `${REPO_URL}/edit/main/docs/assets/json/interview-experience/${company}/${slug}.json`,
  }
}

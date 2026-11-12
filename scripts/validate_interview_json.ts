/**
 * 校验面经 JSON 是否符合 docs/.vitepress/theme/types/interviewSchema.ts。
 *
 * 用法（在仓库根目录，Node 24+）：
 *   npm run validate:interview -- docs/assets/json/interview-experience/amazon/abc123.json
 *   npm run validate:interview -- --all      # 全部面经 JSON，迁移旧文件时用
 *
 * 有文件不通过时退出码为 1。CI（validate-json.yml）和写面经的 skill 都调用它。
 * 不是面经 JSON 的路径会被跳过，所以可以把一批改动的文件直接传进来。
 */
import { globSync, readFileSync } from 'node:fs'
import { relative, resolve, sep } from 'node:path'
import { z } from 'zod'
import { InterviewSchema } from '../docs/.vitepress/theme/types/interviewSchema.ts'

const ROOT = resolve(import.meta.dirname, '..')
const JSON_ROOT = resolve(ROOT, 'docs/assets/json/interview-experience')
/** 被折叠的面经不按公司分目录，company 保留原公司名 */
const FOLDED_DIR = 'folded-entry'

/** 相对 JSON_ROOT 的路径片段；不在面经 JSON 目录下返回 null */
const interviewPathParts = (file: string): string[] | null => {
  const rel = relative(JSON_ROOT, resolve(file))
  if (rel.startsWith('..') || !rel.endsWith('.json')) return null
  return rel.split(sep)
}

/** 返回这个文件的问题列表，空数组表示通过 */
const validate = (file: string, parts: string[]): string[] => {
  let data: unknown
  try {
    data = JSON.parse(readFileSync(file, 'utf-8'))
  } catch (error) {
    return [`不是合法的 JSON：${(error as Error).message}`]
  }
  const result = InterviewSchema.safeParse(data)
  const problems = result.success ? [] : z.prettifyError(result.error).split('\n')
  // schema 看不到文件路径，目录名单独核对
  const company = (data as { company?: unknown } | null)?.company
  if (parts.length < 2) {
    problems.push('✖ 面经 JSON 要放在公司目录下：interview-experience/<company>/<slug>.json')
  } else if (typeof company === 'string' && company !== parts[0] && parts[0] !== FOLDED_DIR) {
    problems.push(`✖ company 是 "${company}"，但文件在 ${parts[0]}/ 目录下，两者要一致`)
  }
  return problems
}

const args = process.argv.slice(2)
const files = args.includes('--all')
  ? globSync('**/*.json', { cwd: JSON_ROOT }).sort().map((file) => resolve(JSON_ROOT, file))
  : args.filter((arg) => !arg.startsWith('--'))

if (files.length === 0) {
  console.error('用法：npm run validate:interview -- <面经 JSON 路径…>  或  -- --all')
  process.exit(2)
}

let checked = 0
let failed = 0
for (const file of files) {
  const parts = interviewPathParts(file)
  if (!parts) {
    console.log(`跳过（不是面经 JSON）：${file}`)
    continue
  }
  checked++
  const problems = validate(file, parts)
  if (problems.length === 0) continue
  failed++
  console.error(`\n❌ ${relative(ROOT, resolve(file))}`)
  for (const line of problems) console.error(`   ${line}`)
}

if (failed > 0) {
  console.error(
    `\n${checked} 个文件里有 ${failed} 个不通过。` +
      '合法取值见 docs/.vitepress/theme/constants/interviewEnums.ts：JSON 里只写 code，不写文案。',
  )
  process.exit(1)
}
console.log(`✅ ${checked} 个面经 JSON 通过校验`)

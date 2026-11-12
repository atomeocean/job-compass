/**
 * 面经 JSON 的结构定义（Zod）。类型和校验都从这里来：
 * - InterviewJson 类型由 z.infer 推导，不再手写 interface
 * - scripts/validate_interview_json.ts 用它校验新写入的 JSON（npm run validate:interview）
 *
 * 取值固定的字段，合法值全部来自 constants/interviewEnums.ts，这里不重复写。
 *
 * 两个限制：
 * - 页面代码只能 `import type` 这个文件，否则 zod 会被打进浏览器的包。
 * - 校验脚本由 Node 直接执行，所以这里的 import 用相对路径加 .ts 后缀，不能用 @ao- 别名。
 */
import { z } from 'zod'
import {
  CHANNEL,
  EDUCATION,
  JOB_TYPE,
  LEVEL,
  LEVEL_LADDER_PATTERN,
  RESULT,
  ROUND_TYPE,
  SOURCE_TYPE,
  TIMELINE_TYPE,
} from '../constants/interviewEnums.ts'

/** 用枚举表的 key 作为合法值 */
const codes = <T extends Record<string, unknown>>(table: T) =>
  z.enum(Object.keys(table) as [keyof T & string, ...(keyof T & string)[]])

/** 同上，另外允许 ""：原文没说时填 "" 的字段 */
const codesOrEmpty = <T extends Record<string, unknown>>(table: T) =>
  z.enum([...Object.keys(table), ''] as [keyof T & string, ...(keyof T & string)[], ''])

const LEVEL_MESSAGE = `level 填 ${Object.keys(LEVEL).join(' / ')}，或小写的公司职级（l4、e6、sde2），原文没说填 ""`

/** 面试日期只写原文给出的精度 */
const PARTIAL_DATE = /^(\d{4}(-\d{2}(-\d{2})?)?)?$/
const partialDateMessage = 'interview.date 写成 YYYY-MM-DD、YYYY-MM 或 YYYY，原文没说填 ""'

const RoundSchema = z.strictObject({
  roundType: codes(ROUND_TYPE),
  /** 这一轮的难度 1–5；原文没提时为 null */
  rate: z.int().min(1).max(5).nullable(),
})

const HighlightSchema = z.strictObject({
  title: z.string().min(1),
  detail: z.string().optional(),
  /** 正文标题的锚点，例如 "#coding问题" */
  anchor: z.string().startsWith('#').optional(),
})

const TimelineEventSchema = z.strictObject({
  /** 'YYYY-MM-DD' 或 'YYYY-MM'；原文没给确切日期时为 null，原话写在 dateText */
  date: z
    .string()
    .regex(/^\d{4}-\d{2}(-\d{2})?$/, '日期写成 YYYY-MM-DD 或 YYYY-MM，否则填 null 并把原话写在 dateText')
    .nullable(),
  dateText: z.string().optional(),
  event: z.string().min(1),
  type: codes(TIMELINE_TYPE).optional(),
  /** 对应 interview.rounds 的第几轮，从 1 开始 */
  rounds: z.array(z.int().min(1)).optional(),
  note: z.string().optional(),
})

export const InterviewSchema = z
  .strictObject({
    /** 和所在目录名一致（小写 kebab-case）；是否一致由校验脚本核对 */
    company: z.string().min(1),
    sourceType: codes(SOURCE_TYPE),
    /** sourceType 为 repost 时必填，和正文末尾 <ReferenceSource> 的同名字段一致 */
    source: z
      .strictObject({
        site: z.string(),
        author: z.string(),
        link: z.string(),
      })
      .optional(),
    position: z.strictObject({
      jobPostUrl: z.url().nullable(),
      title: z.string(),
      /** 固定取值见 LEVEL，另外允许公司职级，所以类型是 string */
      level: z
        .string()
        .refine((value) => value === '' || value in LEVEL || LEVEL_LADDER_PATTERN.test(value), { error: LEVEL_MESSAGE }),
      jobType: codesOrEmpty(JOB_TYPE),
    }),
    applicationSource: z.strictObject({
      channel: codesOrEmpty(CHANNEL),
      referralDetails: z.string(),
    }),
    candidate: z.strictObject({
      education: codesOrEmpty(EDUCATION),
      background: z.string(),
      yearsOfExperience: z.number().min(0).nullable(),
    }),
    interview: z.strictObject({
      date: z.string().regex(PARTIAL_DATE, partialDateMessage),
      result: codes(RESULT),
      /** result 的补充说明，例如「通过 → Team Match」 */
      resultNote: z.string().optional(),
      rounds: z.array(RoundSchema),
    }),
    highlights: z.array(HighlightSchema).optional(),
    timeline: z.array(TimelineEventSchema).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.sourceType === 'repost' && !z.url().safeParse(data.source?.link).success) {
      ctx.addIssue({
        code: 'custom',
        path: ['source', 'link'],
        message: 'sourceType 是 repost 时，source.link 必须是原帖链接',
      })
    }
    const roundCount = data.interview.rounds.length
    data.timeline?.forEach((event, i) => {
      event.rounds?.forEach((round, j) => {
        if (round > roundCount) {
          ctx.addIssue({
            code: 'custom',
            path: ['timeline', i, 'rounds', j],
            message: `interview.rounds 只有 ${roundCount} 轮，没有第 ${round} 轮`,
          })
        }
      })
    })
  })

/** 规范的面经 JSON，新写入的文件都符合这个类型 */
export type InterviewJson = z.infer<typeof InterviewSchema>
export type InterviewRound = z.infer<typeof RoundSchema>
export type InterviewHighlight = z.infer<typeof HighlightSchema>
export type InterviewTimelineEvent = z.infer<typeof TimelineEventSchema>
export type InterviewSource = NonNullable<InterviewJson['source']>
export type InterviewSourceType = InterviewJson['sourceType']
export type InterviewTimelineType = NonNullable<InterviewTimelineEvent['type']>

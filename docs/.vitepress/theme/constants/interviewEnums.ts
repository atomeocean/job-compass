/**
 * 面经 JSON 里所有取值固定的字段：合法值 + 各语言的显示文案。
 *
 * 这是唯一来源。加一个值就在对应的表里加一行，下面三处会自动跟着变：
 * - 类型和校验：types/interviewSchema.ts（npm run validate:interview）
 * - 页面文案：utils/interviewFormat.ts
 * - 写 JSON 的 skill 和 interview-experience/CLAUDE.md 都指向这个文件，不再抄一份值
 *
 * JSON 里只写左边的 code（小写 kebab-case），不写文案。
 * 这个文件会被 Node 直接执行（校验脚本），所以不要 import 别的东西，也不要用 TS enum。
 */

/** 每个值都必须有每种语言的文案，缺了编译报错 */
export type EnumLabels = Record<string, { zhHans: string; en: string }>

/** 来源类型。unknown 表示来源未确认，是有意义的取值，不是空值 */
export const SOURCE_TYPE = {
  repost: { zhHans: '转载', en: 'Repost' },
  original: { zhHans: '原创分享', en: 'Original' },
  unknown: { zhHans: '来源未确认', en: 'Unknown' },
} as const satisfies EnumLabels

/** position.jobType；原文没说填 "" */
export const JOB_TYPE = {
  'full-time': { zhHans: '全职', en: 'Full-time' },
  internship: { zhHans: '实习', en: 'Internship' },
  contract: { zhHans: '合同工', en: 'Contract' },
} as const satisfies EnumLabels

/**
 * position.level 的固定取值；原文没说填 ""。
 * 公司自己的职级（l4、e6、sde2、ict4）不在这张表里，按 LEVEL_LADDER_PATTERN 校验。
 */
export const LEVEL = {
  intern: { zhHans: '实习', en: 'Intern' },
  'new-grad': { zhHans: '应届 NG', en: 'New Grad' },
  'mid-level': { zhHans: '中级', en: 'Mid-level' },
  senior: { zhHans: '高级', en: 'Senior' },
  staff: { zhHans: 'Staff', en: 'Staff' },
  experienced: { zhHans: '社招', en: 'Experienced' },
} as const satisfies EnumLabels

/** 公司职级：1–4 个小写字母加数字，例如 l4、e6、sde2、ic2、ict4、mts2 */
export const LEVEL_LADDER_PATTERN = /^[a-z]{1,4}\d{1,2}$/

/** applicationSource.channel；原文没说填 "" */
export const CHANNEL = {
  'direct-apply': { zhHans: '官网投递', en: 'Direct apply' },
  referral: { zhHans: '内推', en: 'Referral' },
  recruiter: { zhHans: 'Recruiter 联系', en: 'Recruiter outreach' },
  'online-assessment': { zhHans: 'OA 邀请', en: 'OA invite' },
  other: { zhHans: '其他', en: 'Other' },
} as const satisfies EnumLabels

/** candidate.education；原文没说填 "" */
export const EDUCATION = {
  bachelor: { zhHans: '本科', en: "Bachelor's" },
  master: { zhHans: '硕士', en: "Master's" },
  phd: { zhHans: '博士', en: 'PhD' },
} as const satisfies EnumLabels

/** 结果在页面上的配色 */
export type ResultTone = 'ok' | 'bad' | 'wait' | 'none'

/**
 * interview.result；原文没说填 unknown（不是 ""）。
 * 需要补充说明时（例如「通过 → Team Match」）写在 interview.resultNote，不要塞进 result。
 */
export const RESULT = {
  pass: { zhHans: '通过', en: 'Passed', tone: 'ok' },
  offer: { zhHans: 'Offer', en: 'Offer', tone: 'ok' },
  rejected: { zhHans: '未通过', en: 'Rejected', tone: 'bad' },
  pending: { zhHans: '等待结果', en: 'Pending', tone: 'wait' },
  waitlist: { zhHans: '候补', en: 'Waitlisted', tone: 'wait' },
  other: { zhHans: '其他', en: 'Other', tone: 'none' },
  unknown: { zhHans: '未知', en: 'Unknown', tone: 'none' },
} as const satisfies Record<string, EnumLabels[string] & { tone: ResultTone }>

/**
 * interview.rounds[].roundType，只表示这一轮是什么类型。
 * 第几轮由数组顺序表示，不要写 vo1、round-1；virtual onsite 写 onsite。
 */
export const ROUND_TYPE = {
  oa: { zhHans: 'OA', en: 'OA' },
  'recruiter-screen': { zhHans: 'HR 初筛', en: 'Recruiter screen' },
  'phone-screen': { zhHans: '电面', en: 'Phone screen' },
  technical: { zhHans: '技术面', en: 'Technical' },
  coding: { zhHans: 'Coding', en: 'Coding' },
  'system-design': { zhHans: '系统设计', en: 'System design' },
  behavioral: { zhHans: 'BQ', en: 'Behavioral' },
  'hiring-manager': { zhHans: 'HM 面', en: 'Hiring manager' },
  onsite: { zhHans: 'Onsite', en: 'Onsite' },
  other: { zhHans: '其他', en: 'Other' },
} as const satisfies EnumLabels

/** timeline[].type，决定时间线节点的样式 */
export const TIMELINE_TYPE = {
  apply: { zhHans: '投递', en: 'Applied' },
  reply: { zhHans: '收到回复', en: 'Reply' },
  oa: { zhHans: 'OA', en: 'OA' },
  schedule: { zhHans: '安排面试', en: 'Scheduled' },
  interview: { zhHans: '面试', en: 'Interview' },
  result: { zhHans: '结果', en: 'Result' },
  other: { zhHans: '其他', en: 'Other' },
} as const satisfies EnumLabels

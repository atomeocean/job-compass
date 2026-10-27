// 英文首页公司网格用的显示名。默认取面经公司目录 index.md 的 title，那里有几处是旧写法或小写
// （Open AI、Rednote、Walmart labs、stubhub），英文页在这里换成公司自己的写法。
// 全小写的 title（uber、applied-intuition）不用登记，数据加载时会按单词首字母大写。
export const ENGLISH_COMPANY_NAMES: Record<string, string> = {
  nvidia: 'NVIDIA',
  openai: 'OpenAI',
  rednote: 'RedNote',
  stubhub: 'StubHub',
  walmart: 'Walmart',
}

// 面经 JSON 里不是公司的目录，不计入公司数：folded-entry 收的是被折叠、看不出公司的帖子
export const NON_COMPANY_DIRS: ReadonlySet<string> = new Set(['folded-entry'])

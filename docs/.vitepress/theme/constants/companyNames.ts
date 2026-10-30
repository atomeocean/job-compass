// 首页公司网格用的显示名（中英文首页共用）。默认取面经公司目录 index.md 的 title，那里有几处是旧写法或小写
// （Open AI、Rednote、Walmart labs），首页在这里换成公司自己的写法。
// 全小写的 title 不用登记，数据加载时会按单词首字母大写。
export const ENGLISH_COMPANY_NAMES: Record<string, string> = {
  nvidia: 'NVIDIA',
  openai: 'OpenAI',
  rednote: 'RedNote',
  stubhub: 'StubHub',
  walmart: 'Walmart',
}

// 面经 JSON 里不是公司的目录，不计入公司数：folded-entry 收的是被折叠、看不出公司的帖子
export const NON_COMPANY_DIRS: ReadonlySet<string> = new Set(['folded-entry'])

// 首页搜索公司时一起匹配的中文叫法，输入「亚麻」能找到 Amazon。key 是面经公司目录名
export const COMPANY_ALIASES: Record<string, readonly string[]> = {
  amazon: ['亚麻', '亚马逊'],
  google: ['狗家', '谷歌'],
  meta: ['脸书', 'Facebook', 'F家'],
  microsoft: ['微软', '软家'],
  apple: ['苹果'],
  bytedance: ['字节', '字节跳动'],
  uber: ['优步'],
  netflix: ['网飞', '奈飞'],
  nvidia: ['英伟达'],
  linkedin: ['领英'],
  bloomberg: ['彭博'],
  oracle: ['甲骨文'],
  airbnb: ['爱彼迎'],
  walmart: ['沃尔玛'],
  disney: ['迪士尼'],
  icbc: ['工行', '工商银行'],
  nomura: ['野村'],
  smbc: ['三井住友'],
  rednote: ['小红书'],
}

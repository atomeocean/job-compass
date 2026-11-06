---
title: 审阅意见：西雅图华林福德纵火案报道
description: 逐条说明这篇 Amazon 公司新闻待修正的问题：文中男子已被撤销指控并获释，标题却写成已定罪；与 Amazon 的关联没有注明出处；译文有多处错误；来源是 Reddit 转贴。并给出原因和修改建议。
---

# 审阅意见：西雅图华林福德纵火案报道

- 原文：[25岁亚麻中国SDE放火杀人](/direct-hire-company/news/amazon/wallingford-arson-case)
- 来历：2025-08-05 首次发在 Amazon 公司页的「公司相关新闻」里，2026-11-06 原样移到公司新闻目录，内容没改。

下面逐条列出原文的问题、原因和修改建议。第 1 条是后来的案情变化，也是最严重的一条；其余几条在原文收录时就已存在。

## 1. 指控已撤销，文中男子已获释

**问题**：原文停在 2025 年 7 月的保释听证。2025 年 8 月 11 日 KUOW 和 FOX 13 报道，检方已在前一个周五撤销对他的谋杀和纵火指控，并将他释放，警方仍在寻找真正的嫌疑人。原文 8 月 5 日收录，几天后案情就变了，之后一直没有更新。

**原因**：据 KUOW 报道，辩方指出信用卡、衣物、指纹和监控照片等证据都对不上他，辩护律师称这是一次「种族歧视的错认」（racist misidentification）。一个已被撤销指控、获释的人，在本站仍被写成「放火杀人」，英文引文里还有他的真名，旁边写着他的雇主。这会继续伤害一个很可能被错认的人。

**建议**：下线这篇新闻。如果要保留，只能按最新报道重写，写清楚指控已撤销，并且不出现他的姓名。

## 2. 标题把嫌疑人写成了已定罪

**问题**：标题「25岁亚麻中国SDE放火杀人」直接断定此人纵火杀人。

**原因**：引用的原文只说他是警方认定的嫌疑人（"The man Seattle police believe is responsible"，Reddit 链接里的标题是 "police identified suspect in fatal Wallingford…"）。报道的是他出庭、法官定保释金，案子还没审，更没有定罪。对一个认得出来的真实个人下有罪结论，有名誉侵权的风险。文章现在有了自己的网址和标题，比嵌在公司页里更容易被搜索引擎收录和转发，影响也更大。

**建议**：如果保留，标题要写出最新结果，并且不点名，例如「西雅图华林福德纵火致死案：被捕男子获撤诉释放，警方仍在追查」。

## 3. 和 Amazon 的关联没有注明出处

**问题**：标题说他是「亚麻中国SDE」，文章也放在 Amazon 的新闻目录下，但引用的原文没有提到 Amazon，也没提他的工作，只说他是外国公民、持学生签证（"is here on a student visa"）。KUOW 8 月 11 日的报道称他是 "Amazon software engineer"，所以这层关联有出处，只是原文没有引用。

**原因**：雇主信息要有出处，读者才能核对。更要紧的是，指控撤销以后，把一个很可能被错认的人放在「Amazon 公司新闻」下，等于继续把这个案子和他、和公司绑在一起。这篇放在「公司相关新闻」下，前提是它和这家公司有关，而这件事和 Amazon 作为雇主没有关系，对求职者也没有参考价值。

**建议**：不放在 Amazon 的公司新闻里。

## 4. 译文错误

| 原文 | 现在的译文 | 问题 | 建议 |
|---|---|---|---|
| Letian Shi | 石乐智（化名） | 原文是真名，不是化名。「石乐智」读音接近网络用语「失了智」，像是在调侃，不是翻译。下面的英文引文里就有真名，标「化名」也起不到保护作用 | 统一写「石某」，不写真名（他已获撤诉） |
| was in court Friday afternoon | 于周五下午出庭受审 | 「受审」等于说案子在审判，原文只是出庭（保释听证），也加重了第 2 条的有罪印象 | 于周五下午出庭 |
| Shi is due back in court Monday afternoon | 该案将于周一下午再次开庭审理 | 同上，「审理」把程序阶段说重了 | 他将于周一下午再次出庭 |
| Dick's Drive-In | 吉米巴勒特餐厅 | 店名译错。Dick's Drive-In 是西雅图本地的汉堡连锁店 | Dick's Drive-In 汉堡店 |
| King County prosecutor | 詹姆斯县检察官 | 县名译错。西雅图所在的县是 King County | 金县检察官 |

文章 frontmatter 的 `description` 是直接取正文第一句，「出庭受审」的错误也带了进去，改正文时一起改。

## 5. 来源不够可靠

**问题**：「引用来源」是一个 Reddit 帖子，而且是纯文本网址。英文引文是新闻报道的写法，但没有注明出自哪家媒体。

**原因**：Reddit 帖子是二手转贴，读者没法核对原报道，也看不到后续。站内转载文章的惯例是在文末用 `<ReferenceSource>` 组件标注来源。

**建议**：改用下面这几篇原始报道，起诉和撤诉两头都要引，用 `<ReferenceSource>` 标注，写法可以参考 `web-source-to-article` skill。

## 参考来源

<ReferenceSource
:sources="[
{
title: 'Seattle man says dropped murder, arson charges against him were result of racist misidentification',
link: 'https://www.kuow.org/stories/seattle-man-says-murder-and-arson-charges-against-him-based-on-racist-misidentification',
site: 'KUOW',
author: 'John O’Brien, Paige Browning',
date: '2025-08-11',
category: 'News'
},
{
title: 'Man arrested in fatal Seattle fire found innocent, police seek arson suspect',
link: 'https://www.fox13seattle.com/news/charges-dropped-seattle-arson-suspect',
site: 'FOX 13 Seattle',
author: 'Will Wixey',
date: '2025-08-11',
category: 'News'
},
{
title: 'Seattle Times 关于起诉的报道（Spokesman-Review 转载）',
link: 'https://www.spokesman.com/stories/2025/jul/18/seattle-man-charged-after-fire-kills-wallingford-w',
site: 'Spokesman-Review',
author: 'Mara Mellits',
date: '2025-07-18',
category: 'News'
}
]"
/>

/**
 * InterviewExperienceList 组件的数据类型。
 * 条目由 scripts/generate_folder_overview.py 生成（需扩展输出
 * articleCount / lastUpdated / createdDate 三个字段）。
 */
export interface InterviewExperienceItem {
  /** 公司名（来自公司 index.md 的 frontmatter title） */
  title: string;
  /** 简介（来自公司 index.md 的 frontmatter description，缺省为脚本兜底文案） */
  description: string;
  /** 公司目录入口，如 "./amazon/index.md" */
  href: string;
  /** 该公司目录下的面经篇数 */
  articleCount: number;
  /** 最近一篇面经的 lastUpdated（YYYY-MM-DD） */
  lastUpdated: string;
  /** 最早一篇面经的 createdDate，即收录时间（YYYY-MM-DD） */
  createdDate: string;
}

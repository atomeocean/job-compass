export interface SocialLink {
  type?: string;
  icon?: string | { svg: string };
  link: string;
}

/**
 * name：在页面中展示的作者名称
 * username：相关联的github用户名
 * mapByNameAliases：使用的git名称列表，可对列表中的名称一一匹配
 * mapByEmailAliases：使用的git邮箱列表，可对列表中的邮箱一一匹配
 * avatar：头像链接，不传时使用 username 对应的github头像
 * links：profile跳转链接（可添加多个跳转链接，但贡献者列表只会默认选择第一个链接进行跳转）
 * authorPageSlug：作者主页文件名（不含 .md），对应 guide/author-list/<slug>.md
 * sponsor：赞助链接，团队信息页的成员卡片会展示赞助按钮
 * 参考文档
 * https://nolebase-integrations.ayaka.io/pages/zh-CN/releases/migrations/v1-to-v2
 */
export interface Contributor {
  avatar?: string;
  name: string;
  username?: string;
  mapByNameAliases?: string[];
  mapByEmailAliases?: string[];
  title?: string;
  desc?: string;
  org?: string;
  orgLink?: string;
  links?: SocialLink[];
  authorPageSlug?: string;
  sponsor?: string;
}
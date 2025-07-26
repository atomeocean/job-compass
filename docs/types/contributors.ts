export interface SocialLink {
  type?: string;
  icon?: string | { svg: string };
  link: string;
}

/**
 * name：在页面中展示的作者名称
 * username：相关联的github用户名
 * mapByNameAliases：使用的git名称列表，可对列表中的名称一一匹配
 * avatar：头像链接
 * links：profile跳转链接（可添加多个跳转链接，但贡献者列表只会默认选择第一个链接进行跳转）
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
}
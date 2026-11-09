// 英文首页「The team」和 /en/guide/team 只展示 Atomeocean 员工。
// contributors.ts 由 CI 同步、没有员工标记，所以员工名单在这里单独维护：
// 写 GitHub 用户名（小写），顺序就是展示顺序；名字、职位、头像仍取 contributors.ts。
export const EMPLOYEE_GITHUB_USERNAMES: readonly string[] = [
  'tengtianxiang', // Colton
  'k90zz', // Jack
  'bojianwangny', // Bojian
  'orochileo', // Leo
  'nepalter', // Mark
  'bellaz0317', // Bella
]

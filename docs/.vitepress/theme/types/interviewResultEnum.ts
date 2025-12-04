// 面试结果枚举
export enum InterviewResult {
  /** 等待反馈 */
  WAITING_FOR_FEEDBACK = 0,
  /** 通过 */
  PASSED = 1,
  /** 未通过 */
  FAILED = 2,
  /** 需要加面试 */
  PENDING_ADDITIONAL_INTERVIEW = 3,
  /** 职位关闭 */
  POSITION_CLOSED = 4
}

// 面试结果类型映射
export const InterviewResultMap: Record<InterviewResult, {
  zhHans: string;
  en: string;
  color: string;  // 用于UI显示的颜色
  icon?: string;  // 可选的图标
}> = {
  [InterviewResult.WAITING_FOR_FEEDBACK]: {
    zhHans: '等待反馈',
    en: 'Waiting for Feedback',
    color: '#faad14',
    icon: 'message',
  },
  [InterviewResult.PASSED]: {
    zhHans: '通过',
    en: 'Passed',
    color: '#52c41a',
    icon: 'check-circle',
  },
  [InterviewResult.FAILED]: {
    zhHans: '未通过',
    en: 'Failed',
    color: '#ff4d4f',
    icon: 'close-circle',
  },
  [InterviewResult.PENDING_ADDITIONAL_INTERVIEW]: {
    zhHans: '需要加面试',
    en: 'Pending Additional Interview',
    color: '#fa8c16',
    icon: 'pause-circle',
  },
  [InterviewResult.POSITION_CLOSED]: {
    zhHans: '职位关闭',
    en: 'Position Closed',
    color: '#434343',
    icon: 'folder-close',
  }
}
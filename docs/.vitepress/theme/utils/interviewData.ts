// Define interfaces locally for self-containment or in a types file.
// Given strict instructions, I'll put types here or use 'any' if types/ doesn't exist suitable.
// I saw 'types' dir in theme, but better to keep it simple.

/** 单轮面试记录，rate 表示该轮的难度（1-5），原文未提及难度时为 null */
export interface InterviewRound {
    roundType: string;
    rate: number | null;
}

/** 面经来源：作者原创分享 / 转载自网络 / 来源未确认 */
export type InterviewSourceType = 'original' | 'repost' | 'unknown';

/** 转载面经的原帖，信息卡上的「查看原帖」用；和正文末尾 <ReferenceSource> 的同名字段保持一致 */
export interface InterviewSource {
    site?: string;
    author?: string;
    link: string;
}

/** 本篇亮点：由编辑手写，默认为空数组；为空时页面不显示亮点区 */
export interface InterviewHighlight {
    /** 短标题，例如「写代码只剩 20 分钟」 */
    title: string;
    /** 一句话说明 */
    detail?: string;
    /** 可选，正文标题的锚点，例如 "#第-1-轮-coding"；填了标题就能点击跳转 */
    anchor?: string;
}

/** 求职时间线事件类型，决定节点样式 */
export type InterviewTimelineType = 'apply' | 'reply' | 'oa' | 'schedule' | 'interview' | 'result' | 'other';

/** 求职时间线上的一个事件，例如「3 月 1 日网申」；和面试当天的内容（正文）是两块 */
export interface InterviewTimelineEvent {
    /** 'YYYY-MM-DD' 或 'YYYY-MM'；原文没给出确切日期时为 null */
    date: string | null;
    /** 原文的说法，date 为 null 或只到月份时显示，例如「约两周后」「Day 10」 */
    dateText?: string;
    /** 事件名，例如「网申」「收到回复」「Onsite 两轮」 */
    event: string;
    type?: InterviewTimelineType;
    /** 该事件对应 interview.rounds 的第几轮，从 1 开始 */
    rounds?: number[];
    /** 一句补充说明 */
    note?: string;
}

export interface InterviewData {
    company: string;
    /** 唯一来源；构建时由 config.ts 的 transformPageData 读出并写入页面 frontmatter */
    sourceType?: InterviewSourceType;
    /** sourceType 为 repost 时填写，取自正文末尾的 <ReferenceSource> */
    source?: InterviewSource;
    /** 本篇亮点，编辑手写，默认 [] */
    highlights?: InterviewHighlight[];
    /** 求职时间线，按时间先后排列，默认 [] */
    timeline?: InterviewTimelineEvent[];
    position: {
        title: string;
        level: string;
        jobType: string;
        jobPostUrl?: string; // Optional based on sample
    };
    applicationSource?: {
        channel: string;
        referralDetails?: string;
    };
    candidate?: {
        education: string;
        background: string;
        yearsOfExperience: number | null;
    };
    interview: {
        date: string;
        result: string;
        /** 当前主流写法：逐轮记录（70 个面经 JSON 中 65 个使用） */
        rounds?: InterviewRound[];
        /** 早期扁平写法，仅少数文件仍在使用，组件内做兼容 */
        roundType?: string;
        rate?: number;
    };
}

/** 面经文章页在路由中的位置；relativePath 是 rewrites 之后的路径，例如 interview-experience/google/8nmi24.md */
export interface InterviewPathInfo {
    company: string;
    slug: string;
}

const ARTICLE_PATH = /^(?:zhHans\/)?interview-experience\/([^/]+)\/(.+)\.md$/;

/**
 * 判断是不是面经文章页，各级 index / overview 不算。
 * 挂在布局插槽里的组件每一页都会渲染，先用它过滤，避免在其他页面去找不存在的 JSON。
 */
export function parseInterviewPath(relativePath: string): InterviewPathInfo | null {
    const match = relativePath.match(ARTICLE_PATH);
    if (!match || /(^|\/)(index|overview)$/.test(match[2])) return null;
    return { company: match[1], slug: match[2] };
}

// Map all potential JSON files.
// Note: import.meta.glob is lazy by default.
// The path is relative to THIS file.
const jsonModules = import.meta.glob('../../../assets/json/interview-experience/**/*.json');

/**
 * Retrieves interview JSON data based on the markdown file's relative path.
 * @param relativePath - e.g., "zhHans/interview-experience/google/12ab56.md"
 */
export async function getInterviewData(relativePath: string): Promise<InterviewData | null> {
    try {
        // 1. Extract the part after "interview-experience/" and before ".md"
        // Regex explanation:
        // interview-experience\/  -> Match literal "interview-experience/"
        // (.+)                    -> Capture the rest (company/id)
        // \.md$                   -> Match literal ".md" at end of string
        const match = relativePath.match(/interview-experience\/(.+)\.md$/);

        if (!match) {
            console.warn(`[InterviewDetail] Path does not match pattern: ${relativePath}`);
            return null;
        }

        const pathSuffix = match[1]; // e.g., "google/12ab56"

        // 2. Construct the key expected by import.meta.glob
        const key = `../../../assets/json/interview-experience/${pathSuffix}.json`;

        // 3. Load the module
        const loader = jsonModules[key];
        if (!loader) {
            console.error(`[InterviewDetail] JSON file not found: ${key}`);
            return null;
        }

        const mod = await loader() as { default: InterviewData };
        return mod.default;

    } catch (error) {
        console.error(`[InterviewDetail] Error loading data for ${relativePath}:`, error);
        return null;
    }
}

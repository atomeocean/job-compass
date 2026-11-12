/**
 * 面经 JSON 的类型和加载。
 * 类型由 Zod schema 推导（types/interviewSchema.ts），合法取值在 constants/interviewEnums.ts。
 * 这里只能 import type：schema 文件带着 zod，不能进浏览器的包。
 */
import type { InterviewJson } from '@ao-types/interviewSchema'

export type {
    InterviewHighlight,
    InterviewRound,
    InterviewSource,
    InterviewSourceType,
    InterviewTimelineEvent,
    InterviewTimelineType,
} from '@ao-types/interviewSchema'

/**
 * 页面读到的面经 JSON。
 * 新文件都符合 InterviewJson（CI 校验）；旧文件还没迁移，取值可能不规范，个别还是没有 rounds 的
 * 早期扁平写法，所以显示层（interviewFormat.ts）仍然按 string 容错处理。旧文件迁移完后删掉这层兼容。
 */
export type InterviewData = Omit<InterviewJson, 'interview'> & {
    interview: Omit<InterviewJson['interview'], 'rounds'> & {
        rounds?: InterviewJson['interview']['rounds'];
        /** 早期扁平写法，仅少数旧文件仍在使用 */
        roundType?: string;
        rate?: number | null;
    };
};

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

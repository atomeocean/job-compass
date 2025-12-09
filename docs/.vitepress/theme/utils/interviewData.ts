import type { InterviewData } from '../types/interview'; // We might need to define types or just use any

// Define interfaces locally for self-containment or in a types file.
// Given strict instructions, I'll put types here or use 'any' if types/ doesn't exist suitable.
// I saw 'types' dir in theme, but better to keep it simple.

export interface InterviewData {
    company: string;
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
        yearsOfExperience: number;
    };
    interview: {
        date: string;
        roundType: string;
        rate: number;
        result: string;
    };
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

/**
 * 招聘职位（job posting）数据结构
 * 对应 docs/zhHans/job-postings/<company>/data/*.json
 */

export interface CandidateQualifications {
  basicQualifications?: string[];
  preferredQualifications?: string[];
}

export interface JobPosting {
  companyName?: string;
  jobTitle?: string;
  jobType?: string;
  jobLocation?: string[];
  jobResponsibilities?: string[];
  candidateQualifications?: CandidateQualifications;
  salary?: string[];
  benefits?: string[];
  jobLink?: string;
  notes?: string;
}

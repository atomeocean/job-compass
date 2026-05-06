/**
 * 外包公司（staffing company）数据结构
 * 对应 docs/zhHans/staffing-company/data/*.json
 */

export interface Location {
  addressLine1?: string;
  addressLine2?: string;
  county?: string;
  cityOrTown?: string;
  state?: string;
  zipCode?: string;
}

export interface CompanyContact {
  phone?: string;
  email?: string;
  website?: string;
}

export interface CompanyInfo {
  companyName?: string;
  foundedYear?: string;
  contact?: CompanyContact;
  location?: Location;
  industry?: string[];
}

export interface StaffingAgencyPosition {
  jobType?: string;
  usIdentitySupport?: string;
  payStubSupport?: string;
  recruitmentProcess?: string;
}

export interface Recruiter {
  name?: string;
  email?: string;
  wechat?: string;
  linkedin?: string;
  xiaohongshu?: string;
}

export interface TrainingPhase {
  content?: string;
  duration?: string;
  cost?: string;
  remoteAllowed?: string;
  location?: Location;
  penaltyForTermination?: string;
}

export interface MarketingPhase {
  duration?: string;
  preparation?: string;
  cost?: string;
  remoteAllowed?: string;
  location?: Location;
  penaltyForTermination?: string;
}

export interface StaffingCompanyMetadata {
  lastUpdated?: string;
}

export interface StaffingCompany {
  companyInfo?: CompanyInfo;
  staffingAgencyPosition?: StaffingAgencyPosition;
  recruiterInformation?: Recruiter[];
  training?: TrainingPhase;
  marketing?: MarketingPhase;
  metadata?: StaffingCompanyMetadata;
}

/**
 * 直招公司数据结构
 * 对应 docs/zhHans/direct-hire-company/**/data/*.json
 */

export interface DirectHireCompanyLocation {
  addressLine1?: string;
  addressLine2?: string;
  county?: string;
  cityOrTown?: string;
  state?: string;
  zipCode?: string;
}

export interface DirectHireCompanyContact {
  phone?: string;
  email?: string;
  website?: string;
  linkedin?: string;
}

export interface DirectHireCompanyInfo {
  companyName?: string;
  location?: DirectHireCompanyLocation;
  contact?: DirectHireCompanyContact;
  industry?: string[];
  foundedYear?: string;
  description?: string;
  mainProductsOrServices?: string[];
  companySize?: string;
}

export interface DirectHireCompanyMetadata {
  lastUpdated?: string;
}

export interface DirectHireCompany {
  companyInfo?: DirectHireCompanyInfo;
  metadata?: DirectHireCompanyMetadata;
}

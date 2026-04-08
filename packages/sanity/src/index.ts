import { workType } from './workType';
import { companyType } from './companyType';
import { experienceType } from './experienceType';

export const schemaTypes = [workType, companyType, experienceType];
export { workType, companyType, experienceType };
export type { Work, WorkFeature, WorkLink, WorkImage } from './workType';
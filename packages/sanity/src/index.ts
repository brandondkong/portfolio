import { workType } from './workType';
import { companyType } from './companyType';
import { experienceType } from './experienceType';
import { postType } from './postType';

export const schemaTypes = [workType, companyType, experienceType, postType];
export { workType, companyType, experienceType, postType };
export type { Work, WorkFeature, WorkLink, WorkImage } from './workType';
export type { Post, PostImage } from './postType';
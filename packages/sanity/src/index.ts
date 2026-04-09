import { workType } from './workType';
import { companyType } from './companyType';
import { experienceType } from './experienceType';
import { postType } from './postType';
import { skillType } from './skillType';

export const schemaTypes = [workType, companyType, experienceType, postType, skillType];
export { workType, companyType, experienceType, postType, skillType };
export type { Work, WorkFeature, WorkLink, WorkImage } from './workType';
export type { Post, PostImage } from './postType';
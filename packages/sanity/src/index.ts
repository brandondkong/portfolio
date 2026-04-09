import { workType } from './workType';
import { companyType } from './companyType';
import { experienceType } from './experienceType';
import { postType } from './postType';
import { skillType } from './skillType';
import { educationType } from './educationType';

export const schemaTypes = [workType, companyType, experienceType, postType, skillType, educationType];
export { workType, companyType, experienceType, postType, skillType, educationType };
export type { Work, WorkFeature, WorkLink, WorkImage } from './workType';
export type { Post, PostImage } from './postType';
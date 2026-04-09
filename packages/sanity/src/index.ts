import { workType } from './workType';
import { companyType } from './companyType';
import { experienceType } from './experienceType';
import { postType } from './postType';
import { skillType } from './skillType';
import { educationType } from './educationType';
import { siteSettingsType } from './siteSettingsType';

export const schemaTypes = [workType, companyType, experienceType, postType, skillType, educationType, siteSettingsType];
export { workType, companyType, experienceType, postType, skillType, educationType, siteSettingsType };
export type { Work, WorkFeature, WorkLink, WorkImage, WorkMetadata } from './workType';
export type { Post, PostImage } from './postType';
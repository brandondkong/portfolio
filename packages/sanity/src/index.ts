import { workType } from './workType';
import { companyType } from './companyType';
import { experienceType } from './experienceType';
import { postType } from './postType';
import { paperType } from './paperType';
import { skillType } from './skillType';
import { educationType } from './educationType';
import { siteSettingsType } from './siteSettingsType';

export const schemaTypes = [workType, companyType, experienceType, postType, paperType, skillType, educationType, siteSettingsType];
export { workType, companyType, experienceType, postType, paperType, skillType, educationType, siteSettingsType };
export type { Work, WorkFeature, WorkLink, WorkImage, WorkMetadata } from './workType';
export type { Post, PostImage } from './postType';
export type { Paper, PaperAuthor, PaperLink, PaperImage, PaperVenueType, PaperStatus } from './paperType';
export type { SiteSettings, MusicPick, Photo, SanityImageRef } from './siteSettingsType';
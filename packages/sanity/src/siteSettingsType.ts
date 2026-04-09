import { defineField, defineType } from 'sanity';

export const siteSettingsType = defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'currentlyText',
            title: 'Currently',
            description: 'Free-text blurb for the "Currently" section on the about page',
            type: 'text',
            rows: 4,
        }),
    ],
    preview: {
        prepare() {
            return { title: 'Site Settings' };
        },
    },
});

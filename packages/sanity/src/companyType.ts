import { defineField, defineType } from 'sanity';

export const companyType = defineType({
    name: 'company',
    title: 'Company',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'logo',
            title: 'Logo',
            type: 'image',
            description: 'Square, at least 128×128px. Transparent PNG or SVG.',
        }),
    ],
    preview: {
        select: {
            title: 'name',
            media: 'logo',
        },
    },
});

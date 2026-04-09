import { defineField, defineType } from 'sanity';

export const skillType = defineType({
    name: 'skill',
    title: 'Skill',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'icon',
            title: 'Icon',
            type: 'image',
            description: 'Square, at least 200×200px. Transparent PNG or SVG.',
        }),
        defineField({
            name: 'order',
            title: 'Order',
            type: 'number',
            validation: (rule) => rule.required(),
        }),
    ],
    orderings: [
        {
            title: 'Order',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
    ],
    preview: {
        select: {
            title: 'name',
            media: 'icon',
        },
    },
});

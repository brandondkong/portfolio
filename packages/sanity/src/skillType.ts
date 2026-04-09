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

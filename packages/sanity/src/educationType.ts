import { defineField, defineType } from 'sanity';

export const educationType = defineType({
    name: 'education',
    title: 'Education',
    type: 'document',
    fields: [
        defineField({
            name: 'institution',
            title: 'Institution',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'logo',
            title: 'Logo',
            type: 'image',
            description: 'Square, at least 128×128px. Transparent PNG or SVG.',
        }),
        defineField({
            name: 'degree',
            title: 'Degree',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'startDate',
            title: 'Start Date',
            type: 'date',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'endDate',
            title: 'End Date',
            type: 'date',
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
            title: 'institution',
            subtitle: 'degree',
            media: 'logo',
        },
    },
});

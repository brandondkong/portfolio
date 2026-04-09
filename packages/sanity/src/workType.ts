import { defineField, defineType } from 'sanity';
import type { SanityDocument } from '@sanity/client';

export interface WorkFeature {
    title: string;
    description: string;
}

export interface WorkLink {
    label: string;
    url: string;
    icon: string;
}

export interface WorkImage {
    asset: { _ref: string; _type: string };
}

export interface WorkMetadata {
    label: string;
    value: string;
}

export interface Work extends SanityDocument {
    title: string;
    slug: { current: string };
    coverImage: WorkImage;
    description?: string;
    metadata?: WorkMetadata[];
    features?: WorkFeature[];
    links?: WorkLink[];
    gallery?: WorkImage[];
}

export const workType = defineType({
    name: 'project',
    title: 'Work',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            validation: (rule) => rule.required().max(30),
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'coverImage',
            type: 'image',
            description: 'Recommended: 1600×1600px minimum (1:1 square ratio)',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'description',
            type: 'text',
            validation: (rule) => rule.max(300),
        }),
        defineField({
            name: 'metadata',
            title: 'Metadata',
            description: 'Key-value pairs shown on the work detail page (e.g. Type, Stack, Year)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'label',
                            type: 'string',
                            validation: (rule) => rule.required(),
                        }),
                        defineField({
                            name: 'value',
                            type: 'string',
                            validation: (rule) => rule.required(),
                        }),
                    ],
                    preview: {
                        select: { title: 'label', subtitle: 'value' },
                    },
                },
            ],
            validation: (rule) => rule.max(5),
        }),
        defineField({
            name: 'features',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'title',
                            type: 'string',
                            validation: (rule) => rule.required().max(40),
                        }),
                        defineField({
                            name: 'description',
                            type: 'text',
                            validation: (rule) => rule.required().max(200),
                        }),
                    ],
                },
            ],
        }),
        defineField({
            name: 'links',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'label',
                            type: 'string',
                            validation: (rule) => rule.required(),
                        }),
                        defineField({
                            name: 'url',
                            type: 'url',
                            validation: (rule) => rule.required(),
                        }),
                        defineField({
                            name: 'icon',
                            type: 'string',
                            description:
                                'Icon name (e.g. brands/github, external-link)',
                            validation: (rule) => rule.required(),
                        }),
                    ],
                },
            ],
        }),
        defineField({
            name: 'gallery',
            type: 'array',
            of: [{ type: 'image' }],
        }),
    ],
});

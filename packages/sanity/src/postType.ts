import { defineField, defineType } from 'sanity';
import type { SanityDocument } from '@sanity/client';
import type { PortableTextBlock } from '@portabletext/types';

export interface PostImage {
    asset: { _ref: string; _type: string };
}

export interface Post extends SanityDocument {
    title: string;
    slug: { current: string };
    coverImage?: PostImage;
    excerpt?: string;
    body: PortableTextBlock[];
    tags?: string[];
    publishedAt: string;
}

export const postType = defineType({
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: { source: 'title' },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'coverImage',
            type: 'image',
        }),
        defineField({
            name: 'excerpt',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'body',
            type: 'array',
            of: [
                { type: 'block' },
                {
                    type: 'image',
                    fields: [
                        defineField({
                            name: 'caption',
                            type: 'string',
                            title: 'Caption',
                        }),
                        defineField({
                            name: 'alt',
                            type: 'string',
                            title: 'Alt text',
                        }),
                    ],
                },
            ],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'tags',
            type: 'array',
            of: [{ type: 'string' }],
            options: { layout: 'tags' },
        }),
        defineField({
            name: 'publishedAt',
            type: 'datetime',
            validation: (rule) => rule.required(),
        }),
    ],
    orderings: [
        {
            title: 'Published Date',
            name: 'publishedAtDesc',
            by: [{ field: 'publishedAt', direction: 'desc' }],
        },
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'publishedAt',
            media: 'coverImage',
        },
    },
});

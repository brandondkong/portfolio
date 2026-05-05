import { defineField, defineType } from 'sanity';
import type { SanityDocument } from '@sanity/client';
import type { PortableTextBlock } from '@portabletext/types';

export interface PaperAuthor {
    name: string;
    affiliation?: string;
    url?: string;
    isMe?: boolean;
}

export interface PaperLink {
    label: string;
    url: string;
    icon: string;
}

export interface PaperImage {
    asset: { _ref: string; _type: string };
}

export type PaperVenueType =
    | 'journal'
    | 'conference'
    | 'workshop'
    | 'preprint'
    | 'thesis';

export type PaperStatus =
    | 'published'
    | 'accepted'
    | 'under-review'
    | 'preprint';

export interface Paper extends SanityDocument {
    title: string;
    slug: { current: string };
    authors: PaperAuthor[];
    venue: string;
    venueType: PaperVenueType;
    publishedAt: string;
    status?: PaperStatus;
    excerpt?: string;
    abstract?: PortableTextBlock[];
    doi?: string;
    arxivId?: string;
    links?: PaperLink[];
    awards?: string[];
    tags?: string[];
    coverImage?: PaperImage;
}

export const paperType = defineType({
    name: 'paper',
    title: 'Paper',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            validation: (rule) => rule.required().max(200),
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: { source: 'title' },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'authors',
            type: 'array',
            description:
                'Listed in publication order. First author appears first.',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'name',
                            type: 'string',
                            validation: (rule) => rule.required(),
                        }),
                        defineField({
                            name: 'affiliation',
                            type: 'string',
                        }),
                        defineField({
                            name: 'url',
                            type: 'url',
                        }),
                        defineField({
                            name: 'isMe',
                            title: 'This is me',
                            type: 'boolean',
                            description:
                                'Highlight this author as you in the rendered list.',
                            initialValue: false,
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'name',
                            subtitle: 'affiliation',
                            isMe: 'isMe',
                        },
                        prepare({ title, subtitle, isMe }) {
                            return {
                                title: isMe ? `${title} (me)` : title,
                                subtitle,
                            };
                        },
                    },
                },
            ],
            validation: (rule) => rule.required().min(1),
        }),
        defineField({
            name: 'venue',
            type: 'string',
            description:
                'Journal, conference, or platform (e.g. "Nature", "NeurIPS 2025", "arXiv").',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'venueType',
            type: 'string',
            options: {
                list: [
                    { title: 'Journal', value: 'journal' },
                    { title: 'Conference', value: 'conference' },
                    { title: 'Workshop', value: 'workshop' },
                    { title: 'Preprint', value: 'preprint' },
                    { title: 'Thesis', value: 'thesis' },
                ],
                layout: 'radio',
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'publishedAt',
            title: 'Publication date',
            type: 'datetime',
            description:
                'If you only know the year, pick January 1 of that year.',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'status',
            type: 'string',
            options: {
                list: [
                    { title: 'Published', value: 'published' },
                    { title: 'Accepted', value: 'accepted' },
                    { title: 'Under review', value: 'under-review' },
                    { title: 'Preprint', value: 'preprint' },
                ],
                layout: 'radio',
            },
            initialValue: 'published',
        }),
        defineField({
            name: 'excerpt',
            type: 'text',
            rows: 3,
            description: 'Short TL;DR shown on cards. ~1–2 sentences.',
            validation: (rule) => rule.max(200),
        }),
        defineField({
            name: 'abstract',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'doi',
            title: 'DOI',
            type: 'string',
            description: 'e.g. 10.1038/s41586-023-12345-6',
        }),
        defineField({
            name: 'arxivId',
            title: 'arXiv ID',
            type: 'string',
            description: 'e.g. 2401.12345',
        }),
        defineField({
            name: 'links',
            type: 'array',
            description: 'PDF, code, project page, video, etc.',
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
                                'Icon name (e.g. file-pdf, brands/github, external-link)',
                            validation: (rule) => rule.required(),
                        }),
                    ],
                },
            ],
        }),
        defineField({
            name: 'awards',
            type: 'array',
            description:
                'e.g. "Best Paper Award", "Oral Presentation", "Spotlight".',
            of: [{ type: 'string' }],
            options: { layout: 'tags' },
        }),
        defineField({
            name: 'tags',
            type: 'array',
            of: [{ type: 'string' }],
            options: { layout: 'tags' },
        }),
        defineField({
            name: 'coverImage',
            type: 'image',
            description:
                'Optional — usually a teaser figure from the paper. 1600×800px minimum (2:1).',
        }),
    ],
    orderings: [
        {
            title: 'Publication date (newest first)',
            name: 'publishedAtDesc',
            by: [{ field: 'publishedAt', direction: 'desc' }],
        },
    ],
    preview: {
        select: {
            title: 'title',
            venue: 'venue',
            publishedAt: 'publishedAt',
            media: 'coverImage',
        },
        prepare({ title, venue, publishedAt, media }) {
            const year = publishedAt
                ? new Date(publishedAt).getFullYear()
                : undefined;
            const subtitle = [venue, year].filter(Boolean).join(' · ');
            return { title, subtitle, media };
        },
    },
});

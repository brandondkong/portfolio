import { defineField, defineType } from 'sanity';
import type { SanityDocument } from '@sanity/client';

export interface SanityImageRef {
    asset: { _ref: string; _type: string };
}

export interface MusicPick {
    title: string;
    artist?: string;
    coverImage: SanityImageRef;
    url?: string;
}

export interface Photo {
    image: SanityImageRef;
    alt?: string;
    caption?: string;
    location?: string;
}

export interface SiteSettings extends SanityDocument {
    currentlyText?: string;
    topMusic?: MusicPick[];
    photos?: Photo[];
}

export const siteSettingsType = defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'currentlyText',
            title: 'Currently',
            description:
                'Free-text blurb for the "Currently" section on the about page',
            type: 'text',
            rows: 4,
            validation: (rule) => rule.max(300),
        }),
        defineField({
            name: 'topMusic',
            title: 'Top Music',
            description:
                'Up to 3 songs or artists. Leave artist blank to treat title as an artist; fill artist to treat title as a song.',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'title',
                            title: 'Title',
                            description: 'Song name or artist name',
                            type: 'string',
                            validation: (rule) => rule.required(),
                        }),
                        defineField({
                            name: 'artist',
                            title: 'Artist',
                            description:
                                'Leave blank if Title above is itself the artist.',
                            type: 'string',
                        }),
                        defineField({
                            name: 'coverImage',
                            title: 'Cover image',
                            description:
                                'Album art (for songs) or artist photo. 1:1 square recommended.',
                            type: 'image',
                            validation: (rule) => rule.required(),
                        }),
                        defineField({
                            name: 'url',
                            title: 'Listen URL',
                            description:
                                'Spotify, Apple Music, YouTube, etc.',
                            type: 'url',
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            artist: 'artist',
                            media: 'coverImage',
                        },
                        prepare({ title, artist, media }) {
                            return {
                                title,
                                subtitle: artist ?? 'Artist',
                                media,
                            };
                        },
                    },
                },
            ],
            validation: (rule) => rule.max(3),
        }),
        defineField({
            name: 'photos',
            title: 'Photos',
            description: 'Personal photo gallery shown on the about page.',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'image',
                            type: 'image',
                            validation: (rule) => rule.required(),
                        }),
                        defineField({
                            name: 'alt',
                            title: 'Alt text',
                            description:
                                'Describe the photo for screen readers.',
                            type: 'string',
                        }),
                        defineField({
                            name: 'caption',
                            type: 'string',
                        }),
                        defineField({
                            name: 'location',
                            type: 'string',
                            description:
                                'Optional place tag (e.g. "Chicago, IL").',
                        }),
                    ],
                    preview: {
                        select: {
                            caption: 'caption',
                            location: 'location',
                            media: 'image',
                        },
                        prepare({ caption, location, media }) {
                            return {
                                title: caption || location || 'Photo',
                                subtitle:
                                    caption && location ? location : undefined,
                                media,
                            };
                        },
                    },
                },
            ],
        }),
    ],
    preview: {
        prepare() {
            return { title: 'Site Settings' };
        },
    },
});

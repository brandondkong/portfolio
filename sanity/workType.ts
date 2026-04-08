import { defineField, defineType } from "sanity";
import type { SanityDocument } from "@sanity/client";

export interface Work extends SanityDocument {
    title: string;
    slug: { current: string };
    coverImage: {
        asset: { _ref: string; _type: string };
    };
}

export const workType = defineType({
    name: "project",
    title: "Work",
    type: "document",
    fields: [
        defineField({
            name: "title",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "slug",
            type: "slug",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "coverImage",
            type: "image",
            validation: (rule) => rule.required(),
        }),
    ]
})
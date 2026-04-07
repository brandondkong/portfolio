import { defineField, defineType } from "sanity";

export const projectType = defineType({
    name: "project",
    title: "Project",
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
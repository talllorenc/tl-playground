import { defineField, defineType } from "sanity";

export const post = defineType({
    name: "post",
    title: "Post",
    type: "document",

    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "description",
            title: "Description",
            type: "text",
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "date",
            title: "Date",
            type: "datetime",
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "image",
            title: "Image",
            type: "image",
            options: {
                hotspot: true,
            },
        }),
    ],
});

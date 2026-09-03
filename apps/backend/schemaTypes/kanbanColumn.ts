import { defineField, defineType } from "sanity";

export const kanbanColumn = defineType({
    name: "kanbanColumn",
    title: "Kanban Column",
    type: "document",

    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
    ],
});

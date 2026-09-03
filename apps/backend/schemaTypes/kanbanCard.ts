import { defineField, defineType } from "sanity";

export const kanbanCard = defineType({
    name: "kanbanCard",
    title: "Kanban Card",
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
        }),

        defineField({
            name: "column",
            title: "Column",
            type: "reference",
            to: [{ type: "kanbanColumn" }],
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "order",
            title: "Order",
            type: "number",
            validation: (Rule) => Rule.required().integer().min(0),
        }),
    ],
});

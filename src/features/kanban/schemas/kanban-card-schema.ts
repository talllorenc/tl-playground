import { z } from "zod";
import { KANBAN_CARD_TAGS } from "@/features/kanban/types/kanban.types.ts";

export const cardTitleSchema = z
    .string()
    .trim()
    .nonempty("Заполните поле")
    .min(6, "Минимум 6 символов")
    .max(100, "Максимум 100 символов");

export const createCardSchema = z.object({
    title: cardTitleSchema,
});

export const updateCardSchema = z.object({
    title: cardTitleSchema,
    description: z.string(),
    tag: z.enum(KANBAN_CARD_TAGS),
});

export type CreateCardFormValues = z.infer<typeof createCardSchema>;
export type UpdateCardFormValues = z.infer<typeof updateCardSchema>;

import { queryOptions } from "@tanstack/vue-query";
import { toValue, type MaybeRefOrGetter } from "vue";
import {
    getKanbanCardById,
    getKanbanCards,
    getKanbanColumns,
} from "@/features/kanban/api/kanban-api.ts";
import { kanbanKeys } from "@/features/kanban/api/kanban-query-keys.ts";

export const kanbanQueries = {
    columns: () =>
        queryOptions({
            queryKey: kanbanKeys.columns(),
            queryFn: getKanbanColumns,
        }),

    cards: () =>
        queryOptions({
            queryKey: kanbanKeys.cards(),
            queryFn: getKanbanCards,
        }),

    card: (cardId: MaybeRefOrGetter<number>) =>
        queryOptions({
            queryKey: kanbanKeys.card(cardId),
            queryFn: () => getKanbanCardById(toValue(cardId)),
        }),
};

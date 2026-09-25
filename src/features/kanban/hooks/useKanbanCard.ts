import { useQuery } from "@tanstack/vue-query";
import { toValue, type MaybeRefOrGetter } from "vue";
import { getKanbanCardById } from "@/features/kanban/api/kanban-api.ts";
import { kanbanKeys } from "@/features/kanban/api/kanban-query-keys.ts";

export function useKanbanCard(cardId: MaybeRefOrGetter<number>) {
    return useQuery({
        queryKey: kanbanKeys.card(cardId),
        queryFn: () => getKanbanCardById(toValue(cardId)),
    });
}

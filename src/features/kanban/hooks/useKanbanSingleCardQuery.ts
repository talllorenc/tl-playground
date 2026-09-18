import { useQuery, type UseQueryOptions } from "@tanstack/vue-query";
import { toValue, type MaybeRef } from "vue";
import type { IKanbanCard } from "@/features/kanban/types/kanban.types";
import { getKanbanCardById } from "@/features/kanban/api/kanban-api";
import QUERY_KEYS from "@/constants/query-keys.ts";

export function useKanbanSingleCardQuery(
    cardId: MaybeRef<number>,
    options?: Omit<UseQueryOptions<IKanbanCard, Error>, "queryKey" | "queryFn">,
) {
    return useQuery({
        ...options,
        queryKey: [QUERY_KEYS.kanban, "card", cardId],
        queryFn: () => getKanbanCardById(toValue(cardId)),
    });
}

import { queryOptions, type UseQueryOptions } from "@tanstack/vue-query";
import { getKanbanCards } from "@/features/kanban/api/kanban-api";
import type { IKanbanCard } from "@/features/kanban/types/kanban.types.ts";
import QUERY_KEYS from "@/constants/query-keys.ts";

export function useKanbanCardsQuery<TData = IKanbanCard[], TError = Error>(
    options?: Omit<UseQueryOptions<IKanbanCard[], TError, TData>, "queryKey" | "queryFn">,
) {
    return queryOptions({
        ...options,
        queryKey: [QUERY_KEYS.kanban, "cards"],
        queryFn: getKanbanCards,
    });
}

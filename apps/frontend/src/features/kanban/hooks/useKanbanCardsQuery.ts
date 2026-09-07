import { queryOptions, type UseQueryOptions } from "@tanstack/vue-query";
import { getKanbanCards } from "@/features/kanban/api/kanban-api";
import QUERY_KEYS from "@/constants/query-keys.ts";

export interface IUseKanbanCardsQueryResponse {}

export function useKanbanCardsQuery<TData = IUseKanbanCardsQueryResponse, TError = Error>(
    options?: Omit<
        UseQueryOptions<IUseKanbanCardsQueryResponse, TError, TData>,
        "queryKey" | "queryFn"
    >,
) {
    return queryOptions({
        ...options,
        queryKey: [QUERY_KEYS.kanban, "cards"],
        queryFn: getKanbanCards,
    });
}

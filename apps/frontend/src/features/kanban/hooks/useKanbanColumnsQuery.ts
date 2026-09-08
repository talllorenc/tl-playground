import { queryOptions, type UseQueryOptions } from "@tanstack/vue-query";
import { getKanbanColumns } from "@/features/kanban/api/kanban-api";
import QUERY_KEYS from "@/constants/query-keys.ts";

export interface IUseKanbanColumnsQueryResponse {}

export function useKanbanColumnsQuery<TData = IUseKanbanColumnsQueryResponse, TError = Error>(
    options?: Omit<
        UseQueryOptions<IUseKanbanColumnsQueryResponse, TError, TData>,
        "queryKey" | "queryFn"
    >,
) {
    return queryOptions({
        ...options,
        queryKey: [QUERY_KEYS.kanban, "columns"],
        queryFn: getKanbanColumns,
    });
}

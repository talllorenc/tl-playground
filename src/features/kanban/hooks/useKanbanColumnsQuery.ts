import { queryOptions, type UseQueryOptions } from "@tanstack/vue-query";
import { getKanbanColumns } from "@/features/kanban/api/kanban-api";
import type { IKanbanColumn } from "@/features/kanban/types/kanban.types.ts";
import QUERY_KEYS from "@/constants/query-keys.ts";

export function useKanbanColumnsQuery<TData = IKanbanColumn[], TError = Error>(
    options?: Omit<UseQueryOptions<IKanbanColumn[], TError, TData>, "queryKey" | "queryFn">,
) {
    return queryOptions({
        ...options,
        queryKey: [QUERY_KEYS.kanban, "columns"],
        queryFn: getKanbanColumns,
    });
}

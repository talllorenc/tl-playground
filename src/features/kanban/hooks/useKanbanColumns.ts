import { useQuery } from "@tanstack/vue-query";
import { getKanbanColumns } from "@/features/kanban/api/kanban-api.ts";
import { kanbanKeys } from "@/features/kanban/api/kanban-query-keys.ts";

export function useKanbanColumns() {
    return useQuery({
        queryKey: kanbanKeys.columns(),
        queryFn: getKanbanColumns,
    });
}

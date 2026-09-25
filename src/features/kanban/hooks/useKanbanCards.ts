import { useQuery } from "@tanstack/vue-query";
import { getKanbanCards } from "@/features/kanban/api/kanban-api.ts";
import { kanbanKeys } from "@/features/kanban/api/kanban-query-keys.ts";

export function useKanbanCards() {
    return useQuery({
        queryKey: kanbanKeys.cards(),
        queryFn: getKanbanCards,
    });
}

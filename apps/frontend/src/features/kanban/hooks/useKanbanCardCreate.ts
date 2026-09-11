import QUERY_KEYS from "@/constants/query-keys.ts";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { createKanbanCard } from "@/features/kanban/api/kanban-api.ts";

export function useKanbanCardCreate() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ columnId }: { columnId: number }) => createKanbanCard(columnId),
        onError: (error) => {
            console.log(error);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.kanban, "cards"],
            });
        },
    });
}

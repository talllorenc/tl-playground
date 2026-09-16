import QUERY_KEYS from "@/constants/query-keys.ts";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { deleteKanbanCard } from "@/features/kanban/api/kanban-api.ts";

export function useKanbanCardDelete() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ cardId }: { cardId: number }) => deleteKanbanCard(cardId),
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

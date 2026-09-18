import QUERY_KEYS from "@/constants/query-keys.ts";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { deleteKanbanCard } from "@/features/kanban/api/kanban-api.ts";
import { useModalStore } from "@/stores/modal-store.ts";

export function useKanbanCardDelete() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ cardId }: { cardId: number }) => deleteKanbanCard(cardId),
        onError: () => {
            useModalStore().openModal({
                title: "Не удалось удалить карточку",
                body: "Попробуйте ещё раз.",
            });
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.kanban, "cards"],
            });
        },
    });
}

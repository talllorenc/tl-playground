import QUERY_KEYS from "@/constants/query-keys.ts";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { deleteKanbanCard } from "@/features/kanban/api/kanban-api.ts";
import { useToastStore } from "@/stores/toast-store.ts";

export function useKanbanCardDelete() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ cardId }: { cardId: number }) => deleteKanbanCard(cardId),
        onError: () => {
            useToastStore().openToast({
                title: "Ошибка",
                message: `Произошла ошибка при удалении карточки`,
                variant: "error",
            });
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.kanban, "cards"],
            });

            useToastStore().openToast({
                title: "Удалено",
                message: `Карточка успешно удалена`,
                variant: "success",
            });
        },
    });
}

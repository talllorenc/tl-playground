import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { updateKanbanCard } from "@/features/kanban/api/kanban-api.ts";
import type { IKanbanCardUpdateDto } from "@/features/kanban/types/kanban.types.ts";
import { useToastStore } from "@/stores/toast-store.ts";
import QUERY_KEYS from "@/constants/query-keys.ts";

export function useKanbanCardUpdate() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ cardId, dto }: { cardId: number; dto: IKanbanCardUpdateDto }) =>
            updateKanbanCard(cardId, dto),
        onError: () => {
            useToastStore().openToast({
                title: "Ошибка",
                message: `Произошла ошибка при обновлении карточки`,
                variant: "error",
            });
        },
        onSuccess: async (_, variables) => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.kanban, "cards"],
                }),

                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.kanban, "card", variables.cardId],
                }),
            ]);

            useToastStore().openToast({
                title: "Успех",
                message: `Карточка обновлена`,
                variant: "success",
            });
        },
    });
}

import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { deleteKanbanCard } from "@/features/kanban/api/kanban-api.ts";
import { kanbanKeys, kanbanMutationKeys } from "@/features/kanban/api/kanban-query-keys.ts";
import { useKanbanCardDetail } from "@/features/kanban/hooks/useKanbanCardDetail.ts";
import type { IKanbanCard } from "@/features/kanban/types/kanban.types.ts";

export function useKanbanCardDelete() {
    const queryClient = useQueryClient();
    const { selectedCardId, closeCard } = useKanbanCardDetail();

    return useMutation({
        mutationKey: kanbanMutationKeys.deleteCard(),
        mutationFn: deleteKanbanCard,
        meta: {
            errorMessage: "Произошла ошибка при удалении карточки",
            successToast: { title: "Удалено", message: "Карточка удалена" },
        },
        onSuccess: (_, cardId) => {
            if (selectedCardId.value === cardId) {
                closeCard();
            }

            queryClient.removeQueries({ queryKey: kanbanKeys.card(cardId) });
            queryClient.setQueryData<IKanbanCard[]>(kanbanKeys.cards(), (cards) =>
                cards?.filter((card) => card.id !== cardId),
            );

            return queryClient.invalidateQueries({ queryKey: kanbanKeys.cards() });
        },
    });
}

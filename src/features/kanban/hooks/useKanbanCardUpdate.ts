import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { updateKanbanCard } from "@/features/kanban/api/kanban-api.ts";
import { kanbanKeys, kanbanMutationKeys } from "@/features/kanban/api/kanban-query-keys.ts";
import type {
    IKanbanCardPreview,
    IKanbanCardUpdateDto,
} from "@/features/kanban/types/kanban.types.ts";

export function useKanbanCardUpdate() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: kanbanMutationKeys.updateCard(),
        mutationFn: ({ cardId, dto }: { cardId: number; dto: IKanbanCardUpdateDto }) =>
            updateKanbanCard(cardId, dto),
        meta: {
            errorMessage: "Произошла ошибка при обновлении карточки",
            successToast: { title: "Обновлено", message: "Карточка обновлена" },
        },
        onSuccess: (updatedCard) => {
            const { description: _description, ...preview } = updatedCard;

            queryClient.setQueryData(kanbanKeys.card(updatedCard.id), updatedCard);
            queryClient.setQueryData<IKanbanCardPreview[]>(kanbanKeys.cards(), (cards) =>
                cards?.map((card) => (card.id === updatedCard.id ? preview : card)),
            );
        },
    });
}

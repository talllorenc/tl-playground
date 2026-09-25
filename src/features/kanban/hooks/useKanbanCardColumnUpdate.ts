import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { updateCardColumn } from "@/features/kanban/api/kanban-api";
import { kanbanKeys, kanbanMutationKeys } from "@/features/kanban/api/kanban-query-keys.ts";
import type { IKanbanCard } from "@/features/kanban/types/kanban.types.ts";

interface IUpdateCardColumnVariables {
    cardId: number;
    columnId: number;
}

export function useKanbanCardColumnUpdate() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: kanbanMutationKeys.moveCard(),
        mutationFn: ({ cardId, columnId }: IUpdateCardColumnVariables) =>
            updateCardColumn(cardId, columnId),
        meta: {
            errorMessage: "Произошла ошибка при перемещении карточки",
        },

        onMutate: async ({ cardId, columnId }) => {
            await queryClient.cancelQueries({ queryKey: kanbanKeys.cards() });

            const previousColumnId = queryClient
                .getQueryData<IKanbanCard[]>(kanbanKeys.cards())
                ?.find((card) => card.id === cardId)?.columnId;

            setCardColumn(cardId, columnId);

            return { previousColumnId };
        },

        // Откатываем только эту карточку, чтобы не затереть параллельные перемещения
        onError: (_error, { cardId }, context) => {
            if (context?.previousColumnId !== undefined) {
                setCardColumn(cardId, context.previousColumnId);
            }
        },

        // Рефетчим только после последнего перемещения, иначе ответ затрёт оптимистичный кэш
        onSettled: () => {
            if (queryClient.isMutating({ mutationKey: kanbanMutationKeys.moveCard() }) === 1) {
                return queryClient.invalidateQueries({ queryKey: kanbanKeys.cards() });
            }
        },
    });

    function setCardColumn(cardId: number, columnId: number) {
        queryClient.setQueryData<IKanbanCard[]>(kanbanKeys.cards(), (cards) =>
            cards?.map((card) => (card.id === cardId ? { ...card, columnId } : card)),
        );
    }
}

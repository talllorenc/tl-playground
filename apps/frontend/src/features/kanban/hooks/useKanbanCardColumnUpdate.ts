import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { updateCardColumn } from "@/features/kanban/api/kanban-api";
import QUERY_KEYS from "@/constants/query-keys.ts";
import type { IKanbanCard } from "@/features/kanban/types/kanban.types.ts";

interface IUpdateCardColumnVariables {
    cardId: number;
    columnId: number;
}

export function useKanbanCardColumnUpdate() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ cardId, columnId }: IUpdateCardColumnVariables) =>
            updateCardColumn(cardId, columnId),

        onMutate: async ({ cardId, columnId }) => {
            await queryClient.cancelQueries({
                queryKey: [QUERY_KEYS.kanban, "cards"],
            });

            const previousCards =
                queryClient.getQueryData<IKanbanCard[]>([QUERY_KEYS.kanban, "cards"]) ?? [];

            queryClient.setQueryData<IKanbanCard[]>(
                [QUERY_KEYS.kanban, "cards"],
                (cards) =>
                    cards?.map((card) => (card.id === cardId ? { ...card, columnId } : card)) ?? [],
            );

            return {
                previousCards,
            };
        },

        onError: (_error, _variables, context) => {
            if (context?.previousCards) {
                queryClient.setQueryData([QUERY_KEYS.kanban, "cards"], context.previousCards);
            }
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.kanban, "cards"],
            });
        },
    });
}

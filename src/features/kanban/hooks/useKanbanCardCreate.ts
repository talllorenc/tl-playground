import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { createKanbanCard } from "@/features/kanban/api/kanban-api.ts";
import { kanbanKeys, kanbanMutationKeys } from "@/features/kanban/api/kanban-query-keys.ts";
import type { IKanbanCardPreview } from "@/features/kanban/types/kanban.types.ts";

export function useKanbanCardCreate() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: kanbanMutationKeys.createCard(),
        mutationFn: createKanbanCard,
        meta: {
            errorMessage: "Произошла ошибка при создании карточки",
            successToast: { title: "Создано", message: "Карточка создана" },
        },
        onSuccess: (createdCard) => {
            queryClient.setQueryData<IKanbanCardPreview[]>(kanbanKeys.cards(), (cards) =>
                cards ? [...cards, createdCard].sort((a, b) => a.position - b.position) : cards,
            );
        },
    });
}

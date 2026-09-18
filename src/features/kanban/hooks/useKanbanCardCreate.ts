import QUERY_KEYS from "@/constants/query-keys.ts";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { createKanbanCard } from "@/features/kanban/api/kanban-api.ts";
import { useModalStore } from "@/stores/modal-store.ts";

export function useKanbanCardCreate() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ title, columnId }: { title: string; columnId: number }) =>
            createKanbanCard(title, columnId),
        onError: () => {
            useModalStore().openModal({
                title: "Не удалось создать карточку",
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

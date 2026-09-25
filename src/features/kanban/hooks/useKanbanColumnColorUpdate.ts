import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { updateKanbanColumnColor } from "@/features/kanban/api/kanban-api.ts";
import type { KanbanColumnColor } from "@/features/kanban/types/kanban.types.ts";
import { useToastStore } from "@/stores/toast-store.ts";
import QUERY_KEYS from "@/constants/query-keys.ts";

export function useKanbanColumnColorUpdate() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ columnId, color }: { columnId: number; color: KanbanColumnColor }) =>
            updateKanbanColumnColor(columnId, color),
        onError: () => {
            useToastStore().openToast({
                title: "Ошибка",
                message: `Произошла ошибка при смене цвета`,
                variant: "error",
            });
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.kanban, "columns"],
            });

            useToastStore().openToast({
                title: "Обновлено",
                message: `Цвет изменен`,
                variant: "success",
            });
        },
    });
}

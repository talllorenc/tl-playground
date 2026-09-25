import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { updateKanbanColumnColor } from "@/features/kanban/api/kanban-api.ts";
import { kanbanKeys, kanbanMutationKeys } from "@/features/kanban/api/kanban-query-keys.ts";
import type { IKanbanColumn, KanbanColumnColor } from "@/features/kanban/types/kanban.types.ts";

interface IUpdateColumnColorVariables {
    columnId: number;
    color: KanbanColumnColor | null;
}

export function useKanbanColumnColorUpdate() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: kanbanMutationKeys.updateColumnColor(),
        mutationFn: ({ columnId, color }: IUpdateColumnColorVariables) =>
            updateKanbanColumnColor(columnId, color),
        meta: {
            errorMessage: "Произошла ошибка при смене цвета",
        },

        onMutate: async ({ columnId, color }) => {
            await queryClient.cancelQueries({ queryKey: kanbanKeys.columns() });

            const previousColor = queryClient
                .getQueryData<IKanbanColumn[]>(kanbanKeys.columns())
                ?.find((column) => column.id === columnId)?.color;

            setColumnColor(columnId, color);

            return { previousColor };
        },

        onError: (_error, { columnId }, context) => {
            if (context?.previousColor !== undefined) {
                setColumnColor(columnId, context.previousColor);
            }
        },

        onSettled: () => {
            if (
                queryClient.isMutating({ mutationKey: kanbanMutationKeys.updateColumnColor() }) ===
                1
            ) {
                return queryClient.invalidateQueries({ queryKey: kanbanKeys.columns() });
            }
        },
    });

    function setColumnColor(columnId: number, color: KanbanColumnColor | null) {
        queryClient.setQueryData<IKanbanColumn[]>(kanbanKeys.columns(), (columns) =>
            columns?.map((column) => (column.id === columnId ? { ...column, color } : column)),
        );
    }
}

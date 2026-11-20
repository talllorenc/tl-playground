import { computed } from "vue";
import { useMutationState } from "@tanstack/vue-query";
import { kanbanMutationKeys } from "@/features/kanban/api/kanban-query-keys.ts";

export function useKanbanCardDeletingIds() {
    const pendingIds = useMutationState({
        filters: { mutationKey: kanbanMutationKeys.deleteCard(), status: "pending" },
        select: (mutation) => mutation.state.variables,
    });

    return computed(
        () => new Set(pendingIds.value.filter((id): id is number => typeof id === "number")),
    );
}

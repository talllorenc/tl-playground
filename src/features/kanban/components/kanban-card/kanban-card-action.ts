import type { IActionsMenuItem } from "@/shared/ui/actions-menu/actions-menu.types.ts";
import { IconTrash } from "@tabler/icons-vue";

export function getKanbanCardActions(handlers: {
    onDelete: () => void;
    isDeletePending: boolean;
}): IActionsMenuItem[] {
    return [
        {
            label: "Удалить",
            icon: IconTrash,
            onClick: handlers.onDelete,
            loading: handlers.isDeletePending,
        },
    ];
}

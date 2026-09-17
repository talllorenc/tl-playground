import type { IActionsMenuItem } from "@/shared/ui/actions-menu/actions-menu.types.ts";
import { IconTrash } from "@tabler/icons-vue";

export function getKanbanCardActions(
    cardId: number,
    handlers: {
        onDelete: (cardId: number) => void;
        isDeletePending: boolean;
    },
): IActionsMenuItem[] {
    return [
        {
            label: "Удалить",
            icon: IconTrash,
            onClick: () => handlers.onDelete(cardId),
            loading: handlers.isDeletePending,
        },
    ];
}

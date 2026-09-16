import type { IActionsMenuItem } from "@/shared/ui/actions-menu/actions-menu.types.ts";
import { IconTrash, IconCopy } from "@tabler/icons-vue";

export function getKanbanCardActions(
    cardId: number,
    handlers: {
        onDelete: (cardId: number) => void;
        isDeletePending: boolean;
        onDuplicate: (cardId: number) => void;
    },
): IActionsMenuItem[] {
    return [
        {
            label: "Дублировать",
            icon: IconCopy,
            onClick: () => handlers.onDuplicate(cardId),
            disabled: true,
        },
        {
            label: "Удалить",
            icon: IconTrash,
            onClick: () => handlers.onDelete(cardId),
            loading: handlers.isDeletePending,
        },
    ];
}

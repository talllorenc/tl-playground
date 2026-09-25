import type { IActionsMenuItem } from "@/shared/ui/actions-menu/actions-menu.types.ts";
import type { KanbanColumnColor } from "@/features/kanban/types/kanban.types.ts";

export function getKanbanColumnActions(
    columnId: number,
    handlers: {
        onUpdate: (columnId: number, color: KanbanColumnColor) => void;
        isUpdatePending: boolean;
    },
): IActionsMenuItem[] {
    return [
        {
            label: "Без цвета",
            indicator: "transparent",
            onClick: () => handlers.onUpdate(columnId, null),
            loading: handlers.isUpdatePending,
        },
        {
            label: "Красный",
            indicator: "#EF767A",
            onClick: () => handlers.onUpdate(columnId, "red"),
            loading: handlers.isUpdatePending,
        },
        {
            label: "Желтый",
            indicator: "#F6D365",
            onClick: () => handlers.onUpdate(columnId, "yellow"),
            loading: handlers.isUpdatePending,
        },
        {
            label: "Синий",
            indicator: "#8FC7F5",
            onClick: () => handlers.onUpdate(columnId, "blue"),
            loading: handlers.isUpdatePending,
        },
        {
            label: "Зеленый",
            indicator: "#91D6A0",
            onClick: () => handlers.onUpdate(columnId, "green"),
            loading: handlers.isUpdatePending,
        },
        {
            label: "Розовый",
            indicator: "#F2A9C0",
            onClick: () => handlers.onUpdate(columnId, "pink"),
            loading: handlers.isUpdatePending,
        },
    ];
}

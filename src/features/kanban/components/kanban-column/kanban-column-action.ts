import type { IActionsMenuItem } from "@/shared/ui/actions-menu/actions-menu.types.ts";
import {
    KANBAN_COLUMN_COLORS,
    type KanbanColumnColor,
} from "@/features/kanban/types/kanban.types.ts";
import { COLOR_CONFIG } from "@/features/kanban/config/kanban-colors-config.ts";

export function getKanbanColumnActions(
    onSelectColor: (color: KanbanColumnColor | null) => void,
): IActionsMenuItem[] {
    return [
        {
            label: "Без цвета",
            indicator: "transparent",
            onClick: () => onSelectColor(null),
        },
        ...KANBAN_COLUMN_COLORS.map((color) => ({
            label: COLOR_CONFIG[color].label,
            indicator: COLOR_CONFIG[color].indicator,
            onClick: () => onSelectColor(color),
        })),
    ];
}

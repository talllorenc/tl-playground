import type { KanbanColumnColor } from "@/features/kanban/types/kanban.types.ts";

interface IColumnColorConfig {
    label: string;
    indicator: string;
    background: string;
}

function createColumnColor(label: string, color: KanbanColumnColor): IColumnColorConfig {
    const token = `var(--color-column-${color})`;

    return {
        label,
        indicator: token,
        background: `color-mix(in srgb, ${token} 12%, transparent)`,
    };
}

export const COLOR_CONFIG: Record<KanbanColumnColor, IColumnColorConfig> = {
    red: createColumnColor("Красный", "red"),
    yellow: createColumnColor("Желтый", "yellow"),
    blue: createColumnColor("Синий", "blue"),
    green: createColumnColor("Зеленый", "green"),
    pink: createColumnColor("Розовый", "pink"),
};

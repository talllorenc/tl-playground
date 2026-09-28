import type { KanbanColumnColor } from "@/features/kanban/types/kanban.types.ts";

export const COLOR_CONFIG: Record<
    KanbanColumnColor,
    {
        label: string;
        indicator: string;
        background: string;
    }
> = {
    red: {
        label: "Красный",
        indicator: "#EF767A",
        background: "#352326",
    },
    yellow: {
        label: "Желтый",
        indicator: "#F6D365",
        background: "#353021",
    },
    blue: {
        label: "Синий",
        indicator: "#8FC7F5",
        background: "#202D38",
    },
    green: {
        label: "Зеленый",
        indicator: "#91D6A0",
        background: "#213128",
    },
    pink: {
        label: "Розовый",
        indicator: "#F2A9C0",
        background: "#35272E",
    },
};

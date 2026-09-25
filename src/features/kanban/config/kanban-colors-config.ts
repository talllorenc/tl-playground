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
        background: "#f4d8d8",
    },
    yellow: {
        label: "Желтый",
        indicator: "#F6D365",
        background: "#faf1d9",
    },
    blue: {
        label: "Синий",
        indicator: "#8FC7F5",
        background: "#e2eff9",
    },
    green: {
        label: "Зеленый",
        indicator: "#91D6A0",
        background: "#e5f2e5",
    },
    pink: {
        label: "Розовый",
        indicator: "#F2A9C0",
        background: "#f7e5ea",
    },
};

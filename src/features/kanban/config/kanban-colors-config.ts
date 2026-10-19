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
        background: "#FDECED",
    },
    yellow: {
        label: "Желтый",
        indicator: "#F6D365",
        background: "#FDF6DD",
    },
    blue: {
        label: "Синий",
        indicator: "#8FC7F5",
        background: "#E8F3FD",
    },
    green: {
        label: "Зеленый",
        indicator: "#91D6A0",
        background: "#E9F7EC",
    },
    pink: {
        label: "Розовый",
        indicator: "#F2A9C0",
        background: "#FDEEF3",
    },
};

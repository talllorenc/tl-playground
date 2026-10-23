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
        background: "rgb(239 118 122 / 0.12)",
    },
    yellow: {
        label: "Желтый",
        indicator: "#F6D365",
        background: "rgb(246 211 101 / 0.12)",
    },
    blue: {
        label: "Синий",
        indicator: "#8FC7F5",
        background: "rgb(143 199 245 / 0.12)",
    },
    green: {
        label: "Зеленый",
        indicator: "#91D6A0",
        background: "rgb(145 214 160 / 0.12)",
    },
    pink: {
        label: "Розовый",
        indicator: "#F2A9C0",
        background: "rgb(242 169 192 / 0.12)",
    },
};

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
        background: "#301B20",
    },
    yellow: {
        label: "Желтый",
        indicator: "#F6D365",
        background: "#302A18",
    },
    blue: {
        label: "Синий",
        indicator: "#8FC7F5",
        background: "#192936",
    },
    green: {
        label: "Зеленый",
        indicator: "#91D6A0",
        background: "#1A2C22",
    },
    pink: {
        label: "Розовый",
        indicator: "#F2A9C0",
        background: "#301D27",
    },
};

import type { KanbanColumnColor } from "@/features/kanban/types/kanban.types.ts";

export const COLOR_VALUES: Record<Exclude<KanbanColumnColor, null>, string> = {
    red: "#f4d8d8",
    green: "#e5f2e5",
    yellow: "#faf1d9",
    blue: "#e2eff9",
    pink: "#f7e5ea",
};

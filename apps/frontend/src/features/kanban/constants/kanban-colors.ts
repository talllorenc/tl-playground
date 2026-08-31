export const kanbanColors = {
    blue: "#3B82F6",
    green: "#22C55E",
    yellow: "#F59E0B",
    grey: "#fafafa",
    purple: "#8B5CF6",
} as const;

export type KanbanColors = keyof typeof kanbanColors;
export const DEFAULT_KANBAN_COLOR: KanbanColors = "grey";

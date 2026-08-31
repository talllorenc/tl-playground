import type { KanbanColors } from "../constants/kanban-colors";

export interface KanbanCard {
    id: string;
    title: string;
    description?: string;
    columnId: string;
    position: number;
}

export interface KanbanColumn {
    id: string;
    title: string;
    color?: KanbanColors;
}

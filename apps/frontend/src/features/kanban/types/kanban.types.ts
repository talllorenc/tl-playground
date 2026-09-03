// import type { KanbanColors } from "../constants/kanban-colors";

export interface IKanbanCard {
    id: string;
    title: string;
    description: string;
    columnId: string;
    order: number;
}

export interface IKanbanColumn {
    id: string;
    title: string;
}

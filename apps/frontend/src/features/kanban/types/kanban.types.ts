export interface IKanbanCard {
    id: number;
    created_at: string;
    title: string;
    description: string | null;
    columnId: number;
    order: number;
}

export interface IKanbanColumn {
    id: number;
    created_at: string;
    title: string;
}

export interface IKanbanCardPositionUpdate {
    id: number;
    columnId: number;
    order: number;
}

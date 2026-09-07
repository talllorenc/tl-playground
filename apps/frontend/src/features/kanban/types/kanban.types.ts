export interface IKanbanCard {
    id: number;
    title: string;
    description: string;
    columnId: number;
    order: number;
}

export interface IKanbanColumn {
    id: number;
    title: string;
}

export interface IKanbanCardPositionUpdate {
    id: number;
    columnId: number;
    order: number;
}

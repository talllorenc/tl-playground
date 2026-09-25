export type KanbanCardTag = "work" | "personal" | "urgent" | "debt";
export type KanbanColumnColor = null | "red" | "green" | "blue" | "yellow" | "pink";

export interface IKanbanCard {
    id: number;
    created_at: string;
    title: string;
    description: string | null;
    columnId: number;
    tag: KanbanCardTag;
    position: number;
}

export interface IKanbanColumn {
    id: number;
    created_at: string;
    title: string;
    color: KanbanColumnColor;
}

export interface ICreateKanbanCardDto {
    title: string;
    columnId: number;
}

export interface IKanbanCardUpdateDto {
    title: string;
    description?: string;
    tag?: KanbanCardTag;
}

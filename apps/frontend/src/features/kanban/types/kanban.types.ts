export type KanbanCardTag = "work" | "personal" | "urgent" | "debt";

export interface IKanbanCard {
    id: number;
    created_at: string;
    title: string;
    description: string | null;
    columnId: number;
    tag: KanbanCardTag;
}

export interface IKanbanColumn {
    id: number;
    created_at: string;
    title: string;
}

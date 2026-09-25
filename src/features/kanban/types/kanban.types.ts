export const KANBAN_CARD_TAGS = ["work", "personal", "urgent", "debt"] as const;
export const KANBAN_COLUMN_COLORS = ["red", "yellow", "blue", "green", "pink"] as const;

export type KanbanCardTag = (typeof KANBAN_CARD_TAGS)[number];
export type KanbanColumnColor = (typeof KANBAN_COLUMN_COLORS)[number];

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
    color: KanbanColumnColor | null;
}

export interface ICreateKanbanCardDto {
    title: string;
    columnId: number;
}

export interface IKanbanCardUpdateDto {
    title: string;
    description?: string | null;
    tag?: KanbanCardTag;
}

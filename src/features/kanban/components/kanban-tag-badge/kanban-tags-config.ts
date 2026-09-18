import type { KanbanCardTag } from "@/features/kanban/types/kanban.types.ts";

export const TAG_CONFIG: Record<
    KanbanCardTag,
    {
        label: string;
        class: string;
    }
> = {
    personal: {
        label: "Личное",
        class: "kanban-tag--personal",
    },
    work: {
        label: "Работа",
        class: "kanban-tag--work",
    },
    urgent: {
        label: "Срочное",
        class: "kanban-tag--urgent",
    },
    debt: {
        label: "Техдолг",
        class: "kanban-tag--debt",
    },
};

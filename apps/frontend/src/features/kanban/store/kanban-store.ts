import { defineStore } from "pinia";
import { ref } from "vue";
import type { IKanbanCard, IKanbanColumn } from "../types/kanban.types";

export const useKanbanStore = defineStore("kanban", () => {
    const columns = ref<IKanbanColumn[]>([
        {
            id: "todo",
            title: "Todo",
        },
        {
            id: "progress",
            title: "In progress",
        },
        {
            id: "done",
            title: "Done",
        },
    ]);

    const cards = ref<IKanbanCard[]>([
        {
            id: "card-1",
            title: "Card 1",
            columnId: "todo",
        },
        {
            id: "card-2",
            title: "Card 2",
            columnId: "todo",
        },
        {
            id: "card-3",
            title: "Card 3",
            columnId: "progress",
        },
    ]);

    /*Kanban Column*/
    // function addColumn(column: KanbanColumn) {}
    // function deleteColumn(columnId: string) {}
    // function renameColumn(columnId: string, title: string) {}

    return {
        columns,
        cards,
    };
});

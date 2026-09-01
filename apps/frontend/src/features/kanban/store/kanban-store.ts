import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { KanbanCard, KanbanColumn } from "../types/kanban.types";

export const useKanbanStore = defineStore("kanban", () => {
    const columns = ref<KanbanColumn[]>([
        {
            id: "todo",
            title: "To Do",
        },
        {
            id: "done",
            title: "Done",
        },
    ]);

    const cards = ref<KanbanCard[]>([
        {
            id: "1",
            title: "Сделать Kanban",
            columnId: "todo",
            position: 0,
        },
        {
            id: "2",
            title: "Проверить",
            columnId: "done",
            position: 0,
        },
    ]);

    const cardsByColumn = computed(() => {
        const result: Record<string, KanbanCard[]> = {};

        for (const column of columns.value) {
            result[column.id] = cards.value
                .filter((card) => card.columnId === column.id)
                .sort((a, b) => a.position - b.position);
        }

        return result;
    });

    /*Kanban Column*/
    // function addColumn(column: KanbanColumn) {}
    // function deleteColumn(columnId: string) {}
    // function renameColumn(columnId: string, title: string) {}

    /*Kanban Card*/
    function moveCard(cardId: string, columnId: string) {
        const card = cards.value.find((card) => card.id === cardId);

        if (!card) return;

        card.columnId = columnId;
    }

    return {
        columns,
        cards,
        cardsByColumn,
        moveCard,
    };
});

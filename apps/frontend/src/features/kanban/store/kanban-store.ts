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
    function moveCard(cardId: string, targetColumnId: string, targetIndex: number) {
        const card = cards.value.find((card) => card.id === cardId);

        if (!card) {
            return;
        }

        const sourceColumnId = card.columnId;

        const targetColumnCards = cards.value
            .filter((c) => c.columnId === targetColumnId && c.id !== cardId)
            .sort((a, b) => a.position - b.position);

        const clampedIndex = Math.min(Math.max(targetIndex, 0), targetColumnCards.length);

        targetColumnCards.splice(clampedIndex, 0, card);
        targetColumnCards.forEach((c, i) => {
            c.position = i;
        });

        card.columnId = targetColumnId;

        if (sourceColumnId !== targetColumnId) {
            cards.value
                .filter((c) => c.columnId === sourceColumnId)
                .sort((a, b) => a.position - b.position)
                .forEach((c, i) => {
                    c.position = i;
                });
        }
    }

    return {
        columns,
        cards,
        cardsByColumn,
        moveCard,
    };
});

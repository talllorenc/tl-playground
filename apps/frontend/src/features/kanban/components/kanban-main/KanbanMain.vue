<script setup lang="ts">
import { ref } from "vue";
import { DragDropProvider } from "@dnd-kit/vue";

import KanbanColumn from "../kanban-column/KanbanColumn.vue";
import type { IKanbanCard, IKanbanColumn } from "@/features/kanban/types/kanban.types.ts";

type Column = {
    id: string;
    title: string;
};

type Card = {
    id: string;
    title: string;
    columnId: string;
};

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

function getCards(columnId: string) {
    return cards.value.filter((card) => card.columnId === columnId);
}

function onDragEnd(event: any) {
    console.log(event);
}
</script>

<template>
    <DragDropProvider @dragEnd="onDragEnd">
        <div class="kanban">
            <KanbanColumn
                v-for="column in columns"
                :key="column.id"
                :column="column"
                :cards="getCards(column.id)"
            />
        </div>
    </DragDropProvider>
</template>

<style scoped lang="scss">
.kanban {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 24px;

    overflow-x: auto;
}
</style>

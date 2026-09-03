<script setup lang="ts">
import { DragDropProvider } from "@dnd-kit/vue";
import KanbanColumn from "../kanban-column/KanbanColumn.vue";
import { useKanbanStore } from "@/features/kanban/store/kanban-store.ts";

const kanbanStore = useKanbanStore();

const handleDragOver = (event: any) => {
    const { source, target } = event.operation;

    if (!target) return;

    const column = kanbanStore.columns.find((column) => column.id === target.id);

    if (!column) return;

    kanbanStore.moveCard(source.id, column.id);
};
</script>

<template>
    <DragDropProvider @drag-over="handleDragOver">
        <div class="kanban">
            <KanbanColumn
                v-for="column in kanbanStore.columns"
                :key="column.id"
                :column="column"
                :cards="kanbanStore.getCards(column.id)"
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

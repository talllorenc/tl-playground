<script setup lang="ts">
import { useKanbanStore } from "../../store/kanban-store";
import KanbanColumn from "../kanban-column/KanbanColumn.vue";
import { useKanbanDragDrop } from "@/features/kanban/composables/useKanbanDragDrop.ts";

const kanbanStore = useKanbanStore();
const { onDragStart, onDragEnd, onDrop } = useKanbanDragDrop();
</script>

<template>
    <div class="kanban">
        <KanbanColumn
            v-for="column in kanbanStore.columns"
            :key="column.id"
            :column="column"
            :cards="kanbanStore.cardsByColumn[column.id] ?? []"
            @card-drag-start="onDragStart"
            @card-drag-end="onDragEnd"
            @column-drop="onDrop"
        />
    </div>
</template>

<style scoped lang="scss">
.kanban {
    display: flex;
    gap: 16px;
    overflow-x: auto;
}
</style>

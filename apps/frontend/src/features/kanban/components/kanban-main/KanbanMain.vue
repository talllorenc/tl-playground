<script setup lang="ts">
import { useKanbanStore } from "../../store/kanban-store";
import KanbanColumn from "../kanban-column/KanbanColumn.vue";

const kanbanStore = useKanbanStore();
</script>

<template>
    <div class="kanban">
        <KanbanColumn
            v-for="column in kanbanStore.columns"
            :key="column.id"
            :column="column"
            :cards="kanbanStore.cardsByColumn[column.id] ?? []"
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

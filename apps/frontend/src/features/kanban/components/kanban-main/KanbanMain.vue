<script setup lang="ts">
import KanbanColumn from "@/features/kanban/components/kanban-column/KanbanColumn.vue";
</script>

<template>
    <div class="kanban">
        <KanbanColumn />
    </div>
</template>

<style scoped lang="scss">
.kanban {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    width: 100%;
    overflow-x: auto;
    padding: 24px;
}

.kanban-state {
    padding: 48px 24px;
    text-align: center;
    color: var(--color-text-muted);
}
</style>

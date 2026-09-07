<script setup lang="ts">
import KanbanCard from "@/features/kanban/components/kanban-card/KanbanCard.vue";
</script>

<template>
    <div ref="element" class="kanban-column">
        <div class="kanban-column__header">
            <h3 class="kanban-column__title">Title</h3>

            <span class="kanban-column__count"> 4 </span>
        </div>

        <div class="kanban-column__cards">
            <KanbanCard />
        </div>
    </div>
</template>

<style scoped lang="scss">
.kanban-column {
    width: 320px;
    min-width: 320px;
    display: flex;
    flex-direction: column;
    padding: 16px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-bg-secondary);
    transition:
        border-color 0.15s ease,
        background-color 0.15s ease;

    &__header {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 0 4px 12px;
    }

    &__title {
        margin: 0;
        font-size: 15px;
        color: var(--color-text);
    }

    &__count {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__cards {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
}
</style>

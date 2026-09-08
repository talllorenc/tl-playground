<script setup lang="ts">
import KanbanCard from "@/features/kanban/components/kanban-card/KanbanCard.vue";
import type { IKanbanCard, IKanbanColumn } from "@/features/kanban/types/kanban.types.ts";

const props = defineProps<{
    column: IKanbanColumn;
    cards: IKanbanCard[];
}>();
</script>

<template>
    <div class="kanban-column">
        <div class="kanban-column__header">
            <h3 class="kanban-column__title">{{ props.column.title }}</h3>
            <span class="kanban-column__count">{{ props.cards.length }}</span>
        </div>

        <div class="kanban-column__cards">
            <KanbanCard v-for="card in cards" :key="card.id" :card="card" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.kanban-column {
    width: 320px;
    min-width: 320px;
    display: flex;
    flex-direction: column;
    transition:
        border-color 0.15s ease,
        background-color 0.15s ease;

    &__header {
        display: flex;
        align-items: center;
        gap: 8px;
        border-bottom: 2px solid var(--color-border);
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
        gap: 16px;
        margin-top: 24px;
    }
}
</style>

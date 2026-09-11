<script setup lang="ts">
import KanbanCard from "@/features/kanban/components/kanban-card/KanbanCard.vue";
import type { IKanbanCard, IKanbanColumn } from "@/features/kanban/types/kanban.types.ts";
import { ref } from "vue";
import { useDroppable } from "@dnd-kit/vue";

const props = defineProps<{
    column: IKanbanColumn;
    cards: IKanbanCard[];
}>();

const element = ref<HTMLElement | null>(null);
useDroppable({
    id: props.column.id,
    element,
});
</script>

<template>
    <div ref="element" class="kanban-column">
        <div class="kanban-column__header">
            <h3 class="kanban-column__title">{{ props.column.title }}</h3>
            <span class="kanban-column__count">{{ props.cards.length }}</span>
        </div>

        <div class="kanban-column__cards">
            <KanbanCard v-for="(card, index) in cards" :key="card.id" :card="card" :index="index" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.kanban-column {
    width: 350px;
    min-width: 350px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    border-radius: var(--radius-md);
    transition:
        border-color 0.15s ease,
        background-color 0.15s ease;

    &__header {
        position: sticky;
        top: 0;
        z-index: 10;

        display: flex;
        align-items: center;
        gap: 8px;

        background-color: var(--color-bg-secondary);
        border-radius: var(--radius-md);
        padding: 12px;
    }

    &__title {
        margin: 0;
        font-size: 15px;
        color: var(--color-black);
    }

    &__count {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--color-accent);
        color: var(--color-white);
        border-radius: 50%;
        font-size: var(--font-sm);
        font-weight: var(--font-w-md);
        line-height: 1;
    }

    &__cards {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-top: 24px;
    }
}
</style>

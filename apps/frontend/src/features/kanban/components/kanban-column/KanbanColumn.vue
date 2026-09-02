<script setup lang="ts">
import { ref, computed } from "vue";
import { useDroppable } from "@dnd-kit/vue";

import KanbanCard from "../kanban-card/KanbanCard.vue";

type Column = {
    id: string;
    title: string;
};

type Card = {
    id: string;
    title: string;
    columnId: string;
};

const props = defineProps<{
    column: Column;
    cards: Card[];
}>();

const element = ref<HTMLElement | null>(null);

const { isDropTarget } = useDroppable({
    id: computed(() => props.column.id),
    element,
});
</script>

<template>
    <div
        ref="element"
        class="kanban-column"
        :class="{
            'kanban-column--over': isDropTarget,
        }"
    >
        <div class="kanban-column__header">
            <h3 class="kanban-column__title">
                {{ column.title }}
            </h3>

            <span class="kanban-column__count">
                {{ cards.length }}
            </span>
        </div>

        <div class="kanban-column__cards">
            <KanbanCard v-for="card in cards" :key="card.id" :card="card" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.kanban-column {
    width: 350px;
    min-width: 350px;
    min-height: 300px;

    padding: 16px;

    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);

    transition:
        border-color 150ms ease,
        background-color 150ms ease;

    &--over {
        border-color: var(--color-primary);
        background-color: var(--color-bg-secondary);
    }

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        gap: 16px;
    }

    &__title {
        margin: 0;

        color: var(--color-text);
    }

    &__count {
        color: var(--color-text-secondary);
    }

    &__cards {
        display: flex;
        flex-direction: column;
        gap: 8px;

        min-height: 220px;
        margin-top: 16px;
    }
}
</style>

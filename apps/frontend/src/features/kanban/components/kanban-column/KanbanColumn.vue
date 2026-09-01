<script setup lang="ts">
import { computed } from "vue";

import { kanbanColors, DEFAULT_KANBAN_COLOR } from "../../constants/kanban-colors";
import type { KanbanCard, KanbanColumn } from "../../types/kanban.types";

import KanbanCardComponent from "../kanban-card/KanbanCard.vue";

const props = defineProps<{
    column: KanbanColumn;
    cards: KanbanCard[];
}>();

const emit = defineEmits<{
    "card-drag-start": [cardId: string];
    "card-drag-end": [];
    "column-drop": [columnId: string];
}>();

const columnColor = computed(() => {
    return kanbanColors[props.column.color ?? DEFAULT_KANBAN_COLOR];
});
</script>

<template>
    <div
        class="kanban-column"
        @dragover.prevent
        @drop="emit('column-drop', column.id)"
        :style="{ backgroundColor: columnColor }"
    >
        <div class="kanban-column__header">
            <span class="kanban-column__title">
                {{ column.title }}
            </span>

            <span>{{ cards.length }}</span>
        </div>

        <div class="kanban-column__cards">
            <KanbanCardComponent
                @card-drag-start="emit('card-drag-start', $event)"
                @card-drag-end="emit('card-drag-end')"
                @column-drop="emit('column-drop', column.id)"
                v-for="card in cards"
                :key="card.id"
                :card="card"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
.kanban-column {
    width: 350px;
    min-width: 350px;
    padding: 24px 16px;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);

    &__header {
        display: flex;
        align-items: center;
        gap: 16px;
    }

    &__title {
        color: var(--color-text);
    }

    &__cards {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 16px;
    }
}
</style>

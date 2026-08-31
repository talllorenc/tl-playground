<script setup lang="ts">
import { computed } from "vue";

import { kanbanColors, DEFAULT_KANBAN_COLOR } from "../../constants/kanban-colors";
import type { KanbanCard, KanbanColumn } from "../../types/kanban.types";

import KanbanCardComponent from "../kanban-card/KanbanCard.vue";

const props = defineProps<{
    column: KanbanColumn;
    cards: KanbanCard[];
}>();

const columnColor = computed(() => {
    return kanbanColors[props.column.color ?? DEFAULT_KANBAN_COLOR];
});
</script>

<template>
    <div class="kanban-column" :style="{ backgroundColor: columnColor }">
        <div class="kanban-column__header">
            <h2 class="kanban-column__title">
                {{ column.title }}
            </h2>

            <span>{{ cards.length }}</span>
        </div>

        <div class="kanban-column__cards">
            <KanbanCardComponent v-for="card in cards" :key="card.id" :card="card" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.kanban-column {
    width: 350px;
    min-width: 350px;
    background-color: red;
    padding: 24px 16px;
    border-radius: 16px;

    &__header {
        display: flex;
        align-items: center;
        gap: 16px;
    }

    &__title {
        color: rgb(255, 255, 255);
    }

    &__cards {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 16px;
    }
}
</style>

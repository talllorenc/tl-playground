<script setup lang="ts">
import type { KanbanCard } from "../../types/kanban.types";

defineProps<{
    card: KanbanCard;
}>();
</script>

<template>
    <div class="kanban-card" draggable="true" :data-card-id="card.id">
        <span class="kanban-card__title">
            {{ card.title }}
        </span>

        <p v-if="card.description" class="kanban-card__description">
            {{ card.description }}
        </p>
    </div>
</template>

<style scoped lang="scss">
.kanban-card {
    padding: 16px;
    border-radius: var(--radius-md);
    background-color: var(--color-bg);
    cursor: grab;

    &__title {
        color: var(--color-text);
    }

    &__description {
        margin: 8px 0 0;
        font-size: 12px;
    }
}
</style>

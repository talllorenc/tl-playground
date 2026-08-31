<script setup lang="ts">
import type { KanbanCard } from "../../types/kanban.types";

defineProps<{
    card: KanbanCard;
}>();
</script>

<template>
    <div class="kanban-card">
        <h3 class="kanban-card__title">
            {{ card.title }}
        </h3>

        <p v-if="card.description" class="kanban-card__description">
            {{ card.description }}
        </p>
    </div>
</template>

<style scoped lang="scss">
.kanban-card {
    padding: 16px;
    border-radius: var(--radius-md);
    background-color: green;
    cursor: grab;

    &__title {
        color: rgb(255, 255, 255);
    }

    &__description {
        margin: 8px 0 0;
        font-size: 12px;
    }
}
</style>

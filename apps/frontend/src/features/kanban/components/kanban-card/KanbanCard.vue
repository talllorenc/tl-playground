<script setup lang="ts">
import { ref, computed } from "vue";
import { useSortable } from "@dnd-kit/vue/sortable";
import type { IKanbanCard } from "@/features/kanban/types/kanban.types.ts";

const props = defineProps<{
    card: IKanbanCard;
    index: number;
}>();

const element = ref<HTMLElement | null>(null);

const { isDragging } = useSortable({
    id: computed(() => props.card.id),
    index: computed(() => props.index),
    group: computed(() => props.card.columnId),
    element,
});

const handleClick = () => {
    console.log("clicked", props.card);
};
</script>

<template>
    <div
        ref="element"
        class="kanban-card"
        :class="{
            'kanban-card--dragging': isDragging,
        }"
        @click="handleClick"
    >
        <span class="kanban-card__title">
            {{ card.title }}
        </span>

        <p class="kanban-card__description">{{ card.description }}</p>
    </div>
</template>

<style scoped lang="scss">
.kanban-card {
    padding: 16px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-bg);
    cursor: grab;

    &:active {
        cursor: grabbing;
    }

    &--dragging {
        border: 1px dotted var(--color-border);
    }

    &__title {
        color: var(--color-text);
    }

    &__description {
        color: var(--color-text-secondary);
    }
}
</style>

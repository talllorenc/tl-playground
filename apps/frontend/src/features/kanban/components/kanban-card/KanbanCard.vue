<script setup lang="ts">
import { ref, computed } from "vue";
import { useDraggable } from "@dnd-kit/vue";

type Card = {
    id: string;
    title: string;
    columnId: string;
};

const props = defineProps<{
    card: Card;
}>();

const element = ref<HTMLElement | null>(null);

const { isDragging } = useDraggable({
    id: computed(() => props.card.id),
    element,
});
</script>

<template>
    <div
        ref="element"
        class="kanban-card"
        :class="{
            'kanban-card--dragging': isDragging,
        }"
    >
        <span class="kanban-card__title">
            {{ card.title }}
        </span>
    </div>
</template>

<style scoped lang="scss">
.kanban-card {
    padding: 16px;

    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);

    background: var(--color-bg);

    cursor: grab;

    transition:
        box-shadow 150ms ease,
        opacity 150ms ease;

    &:active {
        cursor: grabbing;
    }

    &--dragging {
        opacity: 0.5;
    }

    &__title {
        color: var(--color-text);
    }
}
</style>

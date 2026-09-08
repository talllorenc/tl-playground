<script setup lang="ts">
import type { IKanbanCard } from "@/features/kanban/types/kanban.types.ts";
import DateBadge from "@/shared/ui/date-badge/DateBadge.vue";

const props = defineProps<{
    card: IKanbanCard;
}>();
</script>

<template>
    <div class="kanban-card kanban-card__animation">
        <span>ORDER - {{ props.card.order }}</span>
        <h4 class="kanban-card__title">{{ props.card.title }}</h4>
        <DateBadge :date="props.card.created_at" />
    </div>
</template>

<style scoped lang="scss">
.kanban-card {
    border-radius: var(--radius-md);
    background-color: var(--color-bg-card);
    padding: 16px;
    cursor: grab;
    display: flex;
    flex-direction: column;
    gap: 8px;

    &__animation {
        animation: showCard 0.3s ease-in-out;
    }

    &__title {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
    }

    @keyframes showCard {
        from {
            transform: scale(0.9) translateY(-5px);
            opacity: 0.4;
        }

        to {
            transform: scale(1) translateY(0);
            opacity: 1;
        }
    }
}
</style>

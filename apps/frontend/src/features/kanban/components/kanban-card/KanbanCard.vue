<script setup lang="ts">
import type { IKanbanCard } from "@/features/kanban/types/kanban.types.ts";
import DateBadge from "@/shared/ui/date-badge/DateBadge.vue";
import KanbanTagBadge from "@/features/kanban/components/kanban-tag-badge/KanbanTagBadge.vue";

const props = defineProps<{
    card: IKanbanCard;
}>();
</script>

<template>
    <div class="kanban-card kanban-card__animation">
        <KanbanTagBadge :tag="props.card.tag" />
        <h4 class="kanban-card__title">{{ props.card.title }}</h4>

        <div class="kanban-card__content">
            <span class="kanban-card__description">
                {{ props.card.description }}
            </span>
            <DateBadge :date="props.card.created_at" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.kanban-card {
    border-radius: var(--radius-md);
    background-color: var(--color-bg);
    border: 1px solid var(--color-border);
    padding: 12px;
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

    &__content {
        display: flex;
        flex-direction: column;
        gap: 16px;
        background-color: var(--color-bg-muted);
        padding: 16px;
        border-radius: var(--radius-md);
    }

    &__description {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        overflow: hidden;
        color: var(--color-text-secondary);
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

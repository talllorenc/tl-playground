<script setup lang="ts">
import { IconDotsVertical } from "@tabler/icons-vue";
import type { IKanbanCard } from "@/features/kanban/types/kanban.types.ts";
import DateBadge from "@/shared/ui/date-badge/DateBadge.vue";
import KanbanTagBadge from "@/features/kanban/components/kanban-tag-badge/KanbanTagBadge.vue";
import { useDraggable } from "@dnd-kit/vue";
import { ref } from "vue";

const props = defineProps<{
    card: IKanbanCard;
    index: number;
}>();

const element = ref<HTMLElement | null>(null);
const { isDragging } = useDraggable({ id: props.card.id, element });
</script>

<template>
    <div ref="element" :data-dragging="isDragging" class="kanban-card kanban-card__animation">
        <div class="kanban-card__header">
            <KanbanTagBadge :tag="props.card.tag" />
            <button class="kanban-card__actions" type="button">
                <IconDotsVertical size="18" />
            </button>
        </div>
        <p class="kanban-card__title">{{ props.card.title }}</p>

        <div v-if="props.card.description" class="kanban-card__content">
            <span class="kanban-card__description">
                {{ props.card.description }}
            </span>
        </div>

        <DateBadge :date="props.card.created_at" />
    </div>
</template>

<style scoped lang="scss">
.kanban-card {
    border-radius: var(--radius-md);
    background-color: var(--color-bg-card);
    border: 1px solid var(--color-border);
    padding: 12px;
    cursor: grab;
    display: flex;
    flex-direction: column;
    gap: 8px;

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__animation {
        animation: showCard 0.3s ease-in-out;
    }
    &__actions {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        padding: 0;
        border: 0;
        border-radius: var(--radius-sm);
        color: var(--color-text);
        cursor: pointer;

        &:hover {
            background-color: var(--color-bg-muted);
            color: var(--color-text-primary);
        }
    }

    &__title {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        color: var(--color-black);
        font-weight: var(--font-w-md);
    }

    &__content {
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

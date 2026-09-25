<script setup lang="ts">
import { IconDotsVertical } from "@tabler/icons-vue";
import type { IKanbanCard } from "@/features/kanban/types/kanban.types.ts";
import DateBadge from "@/shared/ui/date-badge/DateBadge.vue";
import KanbanTagBadge from "@/features/kanban/components/kanban-tag-badge/KanbanTagBadge.vue";
import { useDraggable } from "@dnd-kit/vue";
import { computed, ref } from "vue";
import { useKanbanCardDetail } from "@/features/kanban/hooks/useKanbanCardDetail.ts";
import ActionsMenu from "@/shared/ui/actions-menu/ActionsMenu.vue";
import { getKanbanCardActions } from "@/features/kanban/components/kanban-card/kanban-card-action.ts";
import { useKanbanCardDelete } from "@/features/kanban/hooks/useKanbanCardDelete.ts";

const props = defineProps<{
    card: IKanbanCard;
}>();

const { mutate, isPending } = useKanbanCardDelete();
const element = ref<HTMLElement | null>(null);
const { isDragging, isDragSource } = useDraggable({ id: props.card.id, element });

const { openCard, selectedCardId } = useKanbanCardDetail();
const isCardOpen = computed(() => selectedCardId.value === props.card.id);
const actions = computed(() =>
    getKanbanCardActions({
        onDelete: handleDelete,
        isDeletePending: isPending.value,
    }),
);

function handleDelete() {
    mutate(props.card.id);
}

function handleCardClick() {
    if (!isDragging.value) {
        openCard(props.card.id);
    }
}
</script>

<template>
    <div
        ref="element"
        :data-dragging="isDragging"
        :data-is-dragsource="isDragSource"
        :class="{ 'kanban-card--open': isCardOpen, 'kanban-card--pending': isPending }"
        class="kanban-card kanban-card__animation"
        @click="handleCardClick"
    >
        <div class="kanban-card__header">
            <KanbanTagBadge :tag="props.card.tag" />
            <ActionsMenu :items="actions">
                <template #trigger>
                    <button class="kanban-card__actions" type="button">
                        <IconDotsVertical :size="18" />
                    </button>
                </template>
            </ActionsMenu>
        </div>
        <span class="kanban-card__title">{{ props.card.title }}</span>

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
    gap: var(--space-2);

    &:hover {
        border-color: var(--color-accent);
    }

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
        rotate: 90deg;

        &:hover {
            background-color: var(--color-bg-muted);
            color: var(--color-black);
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

    &--open {
        border-color: var(--color-accent);
    }

    &--pending {
        opacity: 0.5;
        pointer-events: none;
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

    &[data-is-dragsource="true"] {
        border-color: var(--color-accent);
    }
}
</style>

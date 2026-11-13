<script setup lang="ts">
import { IconDotsVertical, IconGripVertical } from "@tabler/icons-vue";
import type { IKanbanCardPreview } from "@/features/kanban/types/kanban.types.ts";
import DateBadge from "@/shared/ui/date-badge/DateBadge.vue";
import KanbanTagBadge from "@/features/kanban/components/kanban-tag-badge/KanbanTagBadge.vue";
import { useDraggable } from "@dnd-kit/vue";
import { computed, ref } from "vue";
import { useKanbanCardDetail } from "@/features/kanban/hooks/useKanbanCardDetail.ts";
import ActionsMenu from "@/shared/ui/actions-menu/ActionsMenu.vue";
import { getKanbanCardActions } from "@/features/kanban/components/kanban-card/kanban-card-action.ts";
import { useKanbanCardDelete } from "@/features/kanban/hooks/useKanbanCardDelete.ts";

const props = defineProps<{
    card: IKanbanCardPreview;
}>();

const { mutate, isPending } = useKanbanCardDelete();
const element = ref<HTMLElement | null>(null);
const handle = ref<HTMLElement | null>(null);

const { isDragging, isDragSource } = useDraggable({ id: props.card.id, element, handle });

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

function handleOpen() {
    openCard(props.card.id);
}
</script>

<template>
    <article
        ref="element"
        :data-dragging="isDragging"
        :data-is-dragsource="isDragSource"
        :class="{ 'kanban-card--open': isCardOpen, 'kanban-card--pending': isPending }"
        class="kanban-card kanban-card__animation"
        :aria-busy="isPending || undefined"
    >
        <div class="kanban-card__header">
            <button
                ref="handle"
                class="kanban-card__control kanban-card__handle"
                type="button"
                :aria-label="`Переместить карточку «${props.card.title}»`"
            >
                <IconGripVertical :size="18" aria-hidden="true" />
            </button>

            <KanbanTagBadge :tag="props.card.tag" />

            <ActionsMenu :items="actions" class="kanban-card__menu">
                <template #trigger="{ props: triggerProps }">
                    <button
                        v-bind="triggerProps"
                        class="kanban-card__control kanban-card__actions"
                        type="button"
                        :aria-label="`Действия с карточкой «${props.card.title}»`"
                    >
                        <IconDotsVertical :size="18" aria-hidden="true" />
                    </button>
                </template>
            </ActionsMenu>
        </div>

        <h4 class="kanban-card__title">
            <button
                class="kanban-card__open"
                type="button"
                :aria-current="isCardOpen || undefined"
                @click="handleOpen"
            >
                <span class="kanban-card__open-text">{{ props.card.title }}</span>
            </button>
        </h4>

        <DateBadge :date="props.card.created_at" />
    </article>
</template>

<style scoped lang="scss">
.kanban-card {
    position: relative;
    border-radius: var(--radius-sm);
    background-color: var(--color-bg-surface);
    border: 1px solid var(--color-border);
    padding: var(--space-3);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    transition: border-color var(--transition-fast);

    &:hover {
        border-color: var(--color-accent);
    }

    &__header {
        display: flex;
        align-items: center;
        gap: var(--space-1);
    }

    &__animation {
        animation: showCard var(--transition-normal);
    }

    &__control {
        position: relative;
        z-index: 1;
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
        transition: background-color var(--transition-fast);

        &:hover {
            background-color: var(--color-bg-hover);
        }
    }

    &__handle {
        margin-left: calc(-1 * var(--space-1));
        color: var(--color-text-secondary);
        cursor: grab;
        touch-action: none;

        &:active {
            cursor: grabbing;
        }
    }

    &__menu {
        position: relative;
        z-index: 1;
        margin-left: auto;
    }

    &__actions {
        rotate: 90deg;
    }

    &__title {
        margin: 0;
        font-size: var(--font-sm);
        font-weight: var(--font-w-md);
    }

    &__open {
        display: block;
        width: 100%;
        padding: 0;
        color: var(--color-text);
        font-weight: inherit;
        text-align: left;

        &:focus-visible {
            outline: none;
        }

        &-text {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }

        &::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: inherit;
        }
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

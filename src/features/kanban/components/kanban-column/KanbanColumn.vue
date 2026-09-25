<script setup lang="ts">
import KanbanCard from "@/features/kanban/components/kanban-card/KanbanCard.vue";
import type {
    IKanbanCard,
    IKanbanColumn,
    KanbanColumnColor,
} from "@/features/kanban/types/kanban.types.ts";
import { computed, ref } from "vue";
import { useDroppable } from "@dnd-kit/vue";
import { IconPlus, IconX } from "@tabler/icons-vue";
import KanbanCreateCardForm from "../kanban-create-card-form/KanbanCreateCardForm.vue";
import ActionsMenu from "@/shared/ui/actions-menu/ActionsMenu.vue";
import { getKanbanColumnActions } from "@/features/kanban/components/kanban-column/kanban-column-action.ts";
import KanbanColorBadge from "@/features/kanban/components/kanban-color-badge/KanbanColorBadge.vue";
import { COLOR_CONFIG } from "@/features/kanban/config/kanban-colors-config.ts";
import { useKanbanColumnColorUpdate } from "@/features/kanban/hooks/useKanbanColumnColorUpdate.ts";

const props = defineProps<{
    column: IKanbanColumn;
    cards: IKanbanCard[];
}>();

const element = ref<HTMLElement | null>(null);
const isCreatingCard = ref(false);
const { mutate } = useKanbanColumnColorUpdate();
const actions = getKanbanColumnActions(handleColorSelect);

useDroppable({
    id: props.column.id,
    element,
});

function handleToggleCardForm() {
    isCreatingCard.value = !isCreatingCard.value;
}

const columnBackgroundColor = computed(() => {
    const color = props.column.color;

    return color ? COLOR_CONFIG[color].background : "transparent";
});

function handleColorSelect(color: KanbanColumnColor | null) {
    if (color === props.column.color) return;

    mutate({ columnId: props.column.id, color });
}
</script>

<template>
    <div ref="element" class="kanban-column" :style="{ backgroundColor: columnBackgroundColor }">
        <div class="kanban-column__header">
            <div class="kanban-column__info">
                <h3 class="kanban-column__title">{{ props.column.title }}</h3>
                <span class="kanban-column__count">{{ props.cards.length }}</span>
            </div>
            <div class="kanban-column__actions">
                <ActionsMenu :items="actions">
                    <template #trigger>
                        <KanbanColorBadge :color="props.column.color" />
                    </template>
                </ActionsMenu>
                <button
                    class="kanban-column__createBtn"
                    :class="{ 'kanban-column__createBtn--active': isCreatingCard }"
                    type="button"
                    @click="handleToggleCardForm"
                >
                    <IconX v-if="isCreatingCard" size="18" />
                    <IconPlus v-else size="18" />
                </button>
            </div>
        </div>

        <div class="kanban-column__cards">
            <KanbanCreateCardForm
                v-if="isCreatingCard"
                :columnId="props.column.id"
                @card-created="isCreatingCard = false"
            />
            <KanbanCard v-for="card in props.cards" :key="card.id" :card="card" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.kanban-column {
    width: 350px;
    min-width: 350px;
    display: flex;
    flex-direction: column;
    border-radius: var(--radius-md);
    padding: 8px;
    transition: background-color 0.15s ease;

    &__header {
        position: sticky;
        top: 0;
        z-index: var(--z-sticky);

        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-2);

        background-color: var(--color-white);
        border-radius: var(--radius-md);
        border-bottom: 1px solid var(--color-border);
        padding: 12px;
    }

    &__info {
        display: flex;
        align-items: center;
        gap: var(--space-2);
    }

    &__actions {
        display: flex;
        align-items: center;
        gap: var(--space-2);
    }

    &__title {
        margin: 0;
        font-size: 15px;
        color: var(--color-black);
    }

    &__count {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--color-accent);
        color: var(--color-white);
        border-radius: 50%;
        font-size: var(--font-sm);
        font-weight: var(--font-w-md);
        line-height: 1;
    }

    &__cards {
        display: flex;
        flex-direction: column;
        gap: var(--space-4);
        margin-top: 24px;
    }

    &__createBtn {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--radius-sm);
        color: var(--color-text);
        cursor: pointer;
        width: 28px;
        height: 28px;
        padding: 0;
        border: 0;

        &:hover {
            background-color: var(--color-bg-muted);
            color: var(--color-black);
        }
    }
}
</style>

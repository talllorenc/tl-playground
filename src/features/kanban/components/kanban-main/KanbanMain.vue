<script setup lang="ts">
import KanbanColumn from "@/features/kanban/components/kanban-column/KanbanColumn.vue";
import { computed } from "vue";
import { DragDropProvider, type DragEndEvent } from "@dnd-kit/vue";
import { useKanbanColumns } from "@/features/kanban/hooks/useKanbanColumns.ts";
import { useKanbanCards } from "@/features/kanban/hooks/useKanbanCards.ts";
import { useKanbanCardColumnUpdate } from "@/features/kanban/hooks/useKanbanCardColumnUpdate.ts";
import { useKanbanCardDetail } from "@/features/kanban/hooks/useKanbanCardDetail.ts";
import KanbanCardDetail from "@/features/kanban/components/kanban-card-detail/KanbanCardDetail.vue";
import type { IKanbanCard } from "@/features/kanban/types/kanban.types.ts";
import SkeletonItem from "@/shared/ui/skeleton/SkeletonItem.vue";
import Skeleton from "@/shared/ui/skeleton/Skeleton.vue";
import Button from "@/shared/ui/button/Button.vue";

const columnsQuery = useKanbanColumns();
const cardsQuery = useKanbanCards();
const { mutate: moveCard } = useKanbanCardColumnUpdate();

const columns = computed(() => columnsQuery.data.value ?? []);
const cards = computed(() => cardsQuery.data.value ?? []);

const cardsByColumn = computed(() => {
    const map = new Map<number, IKanbanCard[]>();

    for (const card of cards.value) {
        const columnCards = map.get(card.columnId);

        if (columnCards) {
            columnCards.push(card);
        } else {
            map.set(card.columnId, [card]);
        }
    }

    return map;
});

const isLoading = computed(() => columnsQuery.isLoading.value || cardsQuery.isLoading.value);
const isError = computed(() => columnsQuery.isError.value || cardsQuery.isError.value);

const { selectedCardId, closeCard } = useKanbanCardDetail();

function handleRetry() {
    if (columnsQuery.isError.value) void columnsQuery.refetch();
    if (cardsQuery.isError.value) void cardsQuery.refetch();
}

function handleDragEnd(event: DragEndEvent) {
    const { source, target } = event.operation;

    if (!source || !target) return;

    const cardId = Number(source.id);
    const columnId = Number(target.id);
    const card = cards.value.find((card) => card.id === cardId);

    if (!card || card.columnId === columnId) return;

    moveCard({ cardId, columnId });
}
</script>

<template>
    <div v-if="isLoading">
        <Skeleton variant="horizontal">
            <SkeletonItem height="500px" width="300px" />
            <SkeletonItem height="500px" width="300px" />
            <SkeletonItem height="500px" width="300px" />
        </Skeleton>
    </div>

    <div v-else-if="isError" class="kanban-state">
        <span>Не удалось загрузить канбан</span>
        <Button variant="secondary" @click="handleRetry">Повторить</Button>
    </div>

    <DragDropProvider v-else @dragEnd="handleDragEnd">
        <div class="kanban">
            <div class="kanban__body">
                <KanbanColumn
                    v-for="column in columns"
                    :key="column.id"
                    :column="column"
                    :cards="cardsByColumn.get(column.id) ?? []"
                />
            </div>
        </div>
    </DragDropProvider>

    <Teleport to="body">
        <Transition name="drawer">
            <KanbanCardDetail
                v-if="selectedCardId !== null"
                :card-id="selectedCardId"
                @close="closeCard"
            />
        </Transition>
    </Teleport>
</template>

<style scoped lang="scss">
.kanban {
    width: 100%;

    &__body {
        display: flex;
        align-items: flex-start;
        gap: var(--space-6);
    }
}

.kanban-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-4);
    padding: 48px 24px;
    color: var(--color-text-muted);
}

.drawer-enter-active,
.drawer-leave-active {
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.drawer-enter-from,
.drawer-leave-to {
    transform: translateX(100%);
}
</style>

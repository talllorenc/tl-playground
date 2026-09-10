<script setup lang="ts">
import KanbanColumn from "@/features/kanban/components/kanban-column/KanbanColumn.vue";
import { computed } from "vue";
import { useKanbanColumnsQuery } from "@/features/kanban/hooks/useKanbanColumnsQuery";
import { useKanbanCardsQuery } from "@/features/kanban/hooks/useKanbanCardsQuery";
import { useQuery } from "@tanstack/vue-query";
import PageHeader from "@/shared/ui/page-header/PageHeader.vue";
import { DragDropProvider, type DragEndEvent } from "@dnd-kit/vue";
import { useKanbanCardColumnUpdate } from "@/features/kanban/hooks/useKanbanCardColumnUpdate.ts";

const columnsQuery = useQuery(useKanbanColumnsQuery());
const cardsQuery = useQuery(useKanbanCardsQuery());
const cardUpdateColumnMutation = useKanbanCardColumnUpdate();

const columns = computed(() => columnsQuery.data.value ?? []);
const cards = computed(() => cardsQuery.data.value ?? []);

const isLoading = computed(() => columnsQuery.isLoading.value || cardsQuery.isLoading.value);
const isError = computed(() => columnsQuery.error.value || cardsQuery.error.value);

function handleDragEnd(event: DragEndEvent) {
    const { source, target } = event.operation;

    const columnId = target?.id;
    const cardId = source?.id;

    if (!columnId || !cardId) return;

    const card = cards.value.find((card) => card.id === cardId);

    if (!card) return;

    if (card.columnId === columnId) return;

    cardUpdateColumnMutation.mutate({
        cardId: Number(cardId),
        columnId: Number(columnId),
    });
}
</script>

<template>
    <PageHeader title="Канбан доска">
        <template #breadcrumbs>
            <span>Брэдкрамбс</span>
        </template>
    </PageHeader>

    <div v-if="isLoading" class="kanban-state">Загрузка...</div>

    <div v-else-if="isError" class="kanban-state">Не удалось загрузить канбан</div>

    <DragDropProvider v-else @dragEnd="handleDragEnd">
        <div class="kanban">
            <div class="kanban__body">
                <KanbanColumn
                    v-for="column in columns"
                    :key="column.id"
                    :column="column"
                    :cards="cards.filter((card) => card.columnId === column.id)"
                />
            </div>
        </div>
    </DragDropProvider>
</template>

<style scoped lang="scss">
.kanban {
    width: 100%;

    &__body {
        display: flex;
        align-items: flex-start;
        gap: 24px;
    }
}

.kanban-state {
    padding: 48px 24px;
    text-align: center;
    color: var(--color-text-muted);
}
</style>

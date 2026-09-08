<script setup lang="ts">
import KanbanColumn from "@/features/kanban/components/kanban-column/KanbanColumn.vue";
import { computed, ref } from "vue";
import type { IKanbanCard, IKanbanColumn } from "@/features/kanban/types/kanban.types.ts";
import { useKanbanColumnsQuery } from "@/features/kanban/hooks/useKanbanColumnsQuery";
import { useKanbanCardsQuery } from "@/features/kanban/hooks/useKanbanCardsQuery";
import { useQuery } from "@tanstack/vue-query";
import PageHeader from "@/shared/ui/page-header/PageHeader.vue";

const dragCardRef = ref<IKanbanCard | null>(null);
const sourceColumnRef = ref<IKanbanColumn | null>(null);

const columnsQuery = useQuery(useKanbanColumnsQuery());
const cardsQuery = useQuery(useKanbanCardsQuery());

const columns = computed(() => columnsQuery.data.value ?? []);
const cards = computed(() => cardsQuery.data.value ?? []);

const isLoading = computed(() => columnsQuery.isLoading.value || cardsQuery.isLoading.value);
const isError = computed(() => columnsQuery.error.value || cardsQuery.error.value);
</script>

<template>
    <PageHeader title="Канбан доска">
        <template #breadcrumbs>
            <span>Брэдкрамбс</span>
        </template>
    </PageHeader>

    <div v-if="isLoading" class="kanban-state">Загрузка...</div>

    <div v-else-if="isError" class="kanban-state">Не удалось загрузить канбан</div>

    <div v-else class="kanban">
        <KanbanColumn
            v-for="column in columns"
            :key="column.id"
            :column="column"
            :cards="cards.filter((card) => card.columnId === column.id)"
        />
    </div>
</template>

<style scoped lang="scss">
.kanban {
    display: flex;
    align-items: flex-start;
    gap: 24px;
    width: 100%;
    overflow-x: auto;
}

.kanban-state {
    padding: 48px 24px;
    text-align: center;
    color: var(--color-text-muted);
}
</style>

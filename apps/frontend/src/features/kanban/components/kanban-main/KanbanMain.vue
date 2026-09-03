<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { DragDropProvider } from "@dnd-kit/vue";

import KanbanColumn from "../kanban-column/KanbanColumn.vue";

import { useKanbanStore } from "@/features/kanban/store/kanban-store.ts";
import { getKanbanCards, getKanbanColumns } from "@/features/kanban/api/kanban-api.ts";

const kanbanStore = useKanbanStore();

const { isPending: isColumnsPending } = useQuery({
    queryKey: ["kanban", "columns"],
    queryFn: async () => {
        const data = await getKanbanColumns();

        kanbanStore.setColumns(data);

        return data;
    },
});

const { isPending: isCardsPending } = useQuery({
    queryKey: ["kanban", "cards"],
    queryFn: async () => {
        const data = await getKanbanCards();

        kanbanStore.setCards(data);

        return data;
    },
});

const handleDragOver = (event: any) => {
    const { source, target } = event.operation;

    if (!target) return;

    const column = kanbanStore.columns.find((column) => column.id === target.id);

    if (!column) return;

    kanbanStore.moveCard(source.id, column.id);
};
</script>

<template>
    <div v-if="isColumnsPending || isCardsPending">Loading...</div>

    <DragDropProvider v-else @drag-over="handleDragOver">
        <div class="kanban">
            <KanbanColumn
                v-for="column in kanbanStore.columns"
                :key="column.id"
                :column="column"
                :cards="kanbanStore.getCards(column.id)"
            />
        </div>
    </DragDropProvider>
</template>

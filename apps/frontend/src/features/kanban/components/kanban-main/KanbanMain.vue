<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { DragDropProvider } from "@dnd-kit/vue";

import KanbanColumn from "../kanban-column/KanbanColumn.vue";

import { useKanbanStore } from "@/features/kanban/store/kanban-store.ts";
import {
    getKanbanCards,
    getKanbanColumns,
    updateCardColumn,
} from "@/features/kanban/api/kanban-api.ts";

const kanbanStore = useKanbanStore();
const queryClient = useQueryClient();

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

interface PersistCardColumnVars {
    cardId: string;
    columnId: string;
    previousColumnId: string;
}

const { mutate: persistCardColumn } = useMutation({
    mutationFn: ({ cardId, columnId }: PersistCardColumnVars) => updateCardColumn(cardId, columnId),
    onError: (error, { cardId, previousColumnId }: PersistCardColumnVars) => {
        console.error("Failed to persist card column, rolling back", error);
        kanbanStore.moveCard(cardId, previousColumnId);
    },
    onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["kanban", "cards"] });
    },
});

let dragStartColumnId: string | null = null;

const resolveColumnId = (target: any): string | null => {
    if (!target) return null;

    return String(target.group ?? target.id);
};

const handleDragStart = (event: any) => {
    const card = kanbanStore.cards.find((card) => card.id === event.operation.source?.id);

    dragStartColumnId = card?.columnId ?? null;
};

const handleDragOver = (event: any) => {
    const { source, target } = event.operation;

    const columnId = resolveColumnId(target);

    if (!columnId) return;

    kanbanStore.moveCard(source.id, columnId);
};

const handleDragEnd = (event: any) => {
    const { source, canceled } = event.operation;

    if (canceled || !source) return;

    const cardId = String(source.id);
    const card = kanbanStore.cards.find((card) => card.id === cardId);

    if (!card || !dragStartColumnId || card.columnId === dragStartColumnId) return;

    persistCardColumn({
        cardId,
        columnId: card.columnId,
        previousColumnId: dragStartColumnId,
    });
};
</script>

<template>
    <div v-if="isColumnsPending || isCardsPending">Loading...</div>

    <DragDropProvider
        v-else
        @drag-start="handleDragStart"
        @drag-over="handleDragOver"
        @drag-end="handleDragEnd"
    >
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

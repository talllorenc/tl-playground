import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { IKanbanCard, IKanbanColumn } from "../types/kanban.types";

export const useKanbanStore = defineStore("kanban", () => {
    const columns = ref<IKanbanColumn[]>([]);
    const cards = ref<IKanbanCard[]>([]);
    const selectedCardId = ref<string | null>(null);

    const selectedCard = computed(() => {
        return cards.value.find((card) => card.id === selectedCardId.value) ?? null;
    });

    function getCards(columnId: string) {
        return cards.value
            .filter((card) => card.columnId === columnId)
            .sort((a, b) => a.order - b.order);
    }

    function selectCard(cardId: string) {
        selectedCardId.value = cardId;
    }

    function closeCard() {
        selectedCardId.value = null;
    }

    function setColumns(data: IKanbanColumn[]) {
        columns.value = data;
    }

    function setCards(data: IKanbanCard[]) {
        cards.value = data;
    }

    function moveCard(cardId: string, columnId: string) {
        const card = cards.value.find((card) => card.id === cardId);

        if (!card) return;

        card.columnId = columnId;
    }

    return {
        columns,
        cards,
        selectedCard,
        selectCard,
        closeCard,
        moveCard,
        getCards,
        setColumns,
        setCards,
    };
});

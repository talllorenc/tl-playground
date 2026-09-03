import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { IKanbanCard, IKanbanColumn } from "../types/kanban.types";

export const useKanbanStore = defineStore("kanban", () => {
    const columns = ref<IKanbanColumn[]>([
        {
            id: "todo",
            title: "Todo",
        },
        {
            id: "progress",
            title: "In progress",
        },
        {
            id: "done",
            title: "Done",
        },
    ]);

    const cards = ref<IKanbanCard[]>([
        {
            id: "card-1",
            title: "Card 1",
            description: "Card 1 Description",
            columnId: "todo",
        },
        {
            id: "card-2",
            title: "Card 2",
            description: "Card 2 Description",
            columnId: "todo",
        },
        {
            id: "card-3",
            title: "Card 3",
            description: "Card 3 Description",
            columnId: "progress",
        },
    ]);

    const selectedCardId = ref<string | null>(null);

    const selectedCard = computed(() => {
        return cards.value.find((card) => card.id === selectedCardId.value) ?? null;
    });

    function selectCard(cardId: string) {
        selectedCardId.value = cardId;
    }

    function closeCard() {
        selectedCardId.value = null;
    }

    function getCards(columnId: string) {
        return cards.value.filter((card) => card.columnId === columnId);
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
    };
});

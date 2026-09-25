import type { MaybeRefOrGetter } from "vue";

export const kanbanKeys = {
    all: ["kanban"] as const,
    columns: () => [...kanbanKeys.all, "columns"] as const,
    cards: () => [...kanbanKeys.all, "cards"] as const,
    card: (cardId: MaybeRefOrGetter<number>) => [...kanbanKeys.all, "card", cardId] as const,
};

export const kanbanMutationKeys = {
    createCard: () => [...kanbanKeys.all, "create-card"] as const,
    updateCard: () => [...kanbanKeys.all, "update-card"] as const,
    deleteCard: () => [...kanbanKeys.all, "delete-card"] as const,
    moveCard: () => [...kanbanKeys.all, "move-card"] as const,
    updateColumnColor: () => [...kanbanKeys.all, "update-column-color"] as const,
};

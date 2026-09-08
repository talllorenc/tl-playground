import type { IKanbanCard } from "../types/kanban.types";

export function groupCardsByColumn(cards: IKanbanCard[]): Record<number, IKanbanCard[]> {
    return cards.reduce<Record<number, IKanbanCard[]>>((acc, card) => {
        const columnCards = acc[card.columnId] ?? [];

        columnCards.push(card);
        acc[card.columnId] = columnCards;

        return acc;
    }, {});
}

import { sanity } from "@/shared/api/sanity";
import type { IKanbanCard, IKanbanColumn } from "../types/kanban.types";

export async function getKanbanColumns(): Promise<IKanbanColumn[]> {
    const query = `
        *[_type == "kanbanColumn"] | order(order asc) {
            "id": _id,
            title,
            order
        }
    `;

    return await sanity.fetch<IKanbanColumn[]>(query);
}

export async function getKanbanCards(): Promise<IKanbanCard[]> {
    const query = `
        *[_type == "kanbanCard"] | order(order asc) {
            "id": _id,
            title,
            description,
            "columnId": column._ref,
            order
        }
    `;

    return await sanity.fetch<IKanbanCard[]>(query);
}

import { supabase } from "@/shared/api/supabase";
import type { IKanbanCard, IKanbanCardPositionUpdate, IKanbanColumn } from "../types/kanban.types";

export async function getKanbanColumns(): Promise<IKanbanColumn[]> {
    const { data, error } = await supabase.from("kanban_columns").select("*");

    if (error) {
        throw error;
    }

    return data;
}

export async function getKanbanCards(): Promise<IKanbanCard[]> {
    const { data, error } = await supabase
        .from("kanban_cards")
        .select("*")
        .order("order", { ascending: true });

    if (error) {
        throw error;
    }

    return data;
}

export async function updateCardPositions(updates: IKanbanCardPositionUpdate[]): Promise<void> {
    const results = await Promise.all(
        updates.map(({ id, columnId, order }) =>
            supabase.from("kanban_cards").update({ columnId, order }).eq("id", id),
        ),
    );

    const failed = results.find((result) => result.error);

    if (failed?.error) {
        throw failed.error;
    }
}

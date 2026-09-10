import { supabase } from "@/shared/api/supabase";
import type { IKanbanCard, IKanbanColumn } from "../types/kanban.types";
import { sentryCaptureApiError } from "@/utils/sentry-capture-api-error.ts";

export async function getKanbanColumns(): Promise<IKanbanColumn[]> {
    const { data, error } = await supabase.from("kanban_columns").select("*");

    if (error) {
        sentryCaptureApiError(error, "get-kanban-columns");
        throw error;
    }

    return data;
}

export async function getKanbanCards(): Promise<IKanbanCard[]> {
    const { data, error } = await supabase.from("kanban_cards").select("*");

    if (error) {
        sentryCaptureApiError(error, "get-kanban-cards");
        throw error;
    }

    return data;
}

export async function updateCardColumn(cardId: number, columnId: number): Promise<void> {
    const { error } = await supabase
        .from("kanban_cards")
        .update({
            columnId,
        })
        .eq("id", cardId);

    if (error) {
        throw error;
    }
}

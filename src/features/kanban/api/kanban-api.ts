import { supabase } from "@/shared/api/supabase";
import type { ICreateKanbanCardDto, IKanbanCard, IKanbanColumn } from "../types/kanban.types";
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
    const { data, error } = await supabase
        .from("kanban_cards")
        .select("*")
        .order("position", { ascending: true });

    if (error) {
        sentryCaptureApiError(error, "get-kanban-cards");
        throw error;
    }

    return data;
}

export async function getKanbanCardById(cardId: number): Promise<IKanbanCard> {
    const { data, error } = await supabase
        .from("kanban_cards")
        .select("*")
        .eq("id", cardId)
        .single();

    if (error) {
        sentryCaptureApiError(error, "get-kanban-card-by-id");
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
        sentryCaptureApiError(error, "update-kanban-card-column");
        throw error;
    }
}

export async function createKanbanCard(title: string, columnId: number): Promise<IKanbanCard> {
    const newCard: ICreateKanbanCardDto = {
        title,
        columnId,
    };

    const { data, error } = await supabase.from("kanban_cards").insert(newCard).select().single();

    if (error) {
        sentryCaptureApiError(error, "create-kanban-card");
        throw error;
    }

    return data;
}

export async function deleteKanbanCard(cardId: number): Promise<void> {
    const { error } = await supabase.from("kanban_cards").delete().eq("id", cardId);

    if (error) {
        sentryCaptureApiError(error, "delete-kanban-card");
        throw error;
    }
}

import { supabase } from "@/shared/api/supabase";
import type { CreateKanbanCardDto, IKanbanCard, IKanbanColumn } from "../types/kanban.types";
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

export async function createKanbanCard(columnId: number): Promise<IKanbanCard> {
    const newCard: CreateKanbanCardDto = {
        title: "New Kanban Card",
        description: "New Kanban Card Description",
        columnId,
        tag: "work",
        position: 0,
    };

    const { data, error } = await supabase.from("kanban_cards").insert(newCard).select().single();

    if (error) {
        sentryCaptureApiError(error, "create-kanban-card");
        throw error;
    }

    return data;
}

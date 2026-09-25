import { supabase } from "@/shared/api/supabase";
import type {
    ICreateKanbanCardDto,
    IKanbanCard,
    IKanbanCardUpdateDto,
    IKanbanColumn,
    KanbanColumnColor,
} from "../types/kanban.types";

export async function getKanbanColumns(): Promise<IKanbanColumn[]> {
    const { data } = await supabase
        .from("kanban_columns")
        .select("*")
        .order("position", { ascending: true })
        .throwOnError();

    return data;
}

export async function getKanbanCards(): Promise<IKanbanCard[]> {
    const { data } = await supabase
        .from("kanban_cards")
        .select("*")
        .order("position", { ascending: true })
        .throwOnError();

    return data;
}

export async function getKanbanCardById(cardId: number): Promise<IKanbanCard> {
    const { data } = await supabase
        .from("kanban_cards")
        .select("*")
        .eq("id", cardId)
        .single()
        .throwOnError();

    return data;
}

export async function updateCardColumn(cardId: number, columnId: number): Promise<void> {
    await supabase.from("kanban_cards").update({ columnId }).eq("id", cardId).throwOnError();
}

export async function updateKanbanColumnColor(
    columnId: number,
    color: KanbanColumnColor | null,
): Promise<IKanbanColumn> {
    const { data } = await supabase
        .from("kanban_columns")
        .update({ color })
        .eq("id", columnId)
        .select()
        .single()
        .throwOnError();

    return data;
}

export async function createKanbanCard(dto: ICreateKanbanCardDto): Promise<IKanbanCard> {
    const { data } = await supabase
        .from("kanban_cards")
        .insert(dto)
        .select()
        .single()
        .throwOnError();

    return data;
}

export async function deleteKanbanCard(cardId: number): Promise<void> {
    await supabase.from("kanban_cards").delete().eq("id", cardId).throwOnError();
}

export async function updateKanbanCard(
    cardId: number,
    dto: IKanbanCardUpdateDto,
): Promise<IKanbanCard> {
    const { data } = await supabase
        .from("kanban_cards")
        .update(dto)
        .eq("id", cardId)
        .select()
        .single()
        .throwOnError();

    return data;
}

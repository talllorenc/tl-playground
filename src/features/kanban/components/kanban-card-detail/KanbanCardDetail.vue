<script setup lang="ts">
import { IconChevronsRight, IconLink } from "@tabler/icons-vue";
import TextEditor from "@/shared/ui/text-editor/TextEditor.vue";
import { onBeforeUnmount, onMounted, toRef, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import BaseInput from "@/shared/ui/input/BaseInput.vue";
import Button from "@/shared/ui/button/Button.vue";
import { kanbanQueries } from "@/features/kanban/api/kanban-queries.ts";
import { useKanbanCardUpdate } from "@/features/kanban/hooks/useKanbanCardUpdate.ts";
import {
    updateCardSchema,
    type UpdateCardFormValues,
} from "@/features/kanban/schemas/kanban-card-schema.ts";
import type { IKanbanCard } from "@/features/kanban/types/kanban.types.ts";
import KanbanTagBadge from "@/features/kanban/components/kanban-tag-badge/KanbanTagBadge.vue";
import DateBadge from "@/shared/ui/date-badge/DateBadge.vue";
import Skeleton from "@/shared/ui/skeleton/Skeleton.vue";
import SkeletonItem from "@/shared/ui/skeleton/SkeletonItem.vue";

const props = defineProps<{
    cardId: number;
}>();

const emit = defineEmits<{
    (e: "close"): void;
}>();

const cardId = toRef(props, "cardId");

const { data: card, isLoading, isError, refetch } = useQuery(kanbanQueries.card(cardId));

const { mutate, isPending } = useKanbanCardUpdate();

const { errors, defineField, handleSubmit, resetForm, meta } = useForm<UpdateCardFormValues>({
    validationSchema: toTypedSchema(updateCardSchema),
});

const [title, titleAttrs] = defineField("title");
const [description, descriptionAttrs] = defineField("description");

function resetFormFromCard(card: IKanbanCard) {
    resetForm({
        values: {
            title: card.title,
            description: card.description ?? "",
            tag: card.tag,
        },
    });
}

// Заполняем форму данными карточки при открытии и после сохранения
watch(
    card,
    (card) => {
        if (card) resetFormFromCard(card);
    },
    { immediate: true },
);

const onSubmit = handleSubmit((values) => {
    mutate({
        cardId: cardId.value,
        dto: {
            ...values,
            description: values.description || null,
        },
    });
});

function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
        emit("close");
    }
}

onMounted(() => document.addEventListener("keydown", handleKeydown));
onBeforeUnmount(() => document.removeEventListener("keydown", handleKeydown));
</script>

<template>
    <aside class="card-detail-drawer">
        <div class="card-detail-drawer__header">
            <button
                class="card-detail-drawer__action"
                type="button"
                aria-label="Закрыть"
                @click="emit('close')"
            >
                <IconChevronsRight size="18" />
            </button>

            <button
                class="card-detail-drawer__action"
                type="button"
                aria-label="Скопировать ссылку"
            >
                <IconLink size="18" />
            </button>
        </div>

        <div v-if="isLoading">
            <Skeleton>
                <SkeletonItem height="24px" />
                <SkeletonItem height="40px" />
                <SkeletonItem height="120px" />
            </Skeleton>
        </div>

        <div v-else-if="isError" class="card-detail-drawer__state">
            <span>Не удалось загрузить карточку</span>
            <Button variant="secondary" @click="refetch()">Повторить</Button>
        </div>

        <form v-else-if="card" @submit="onSubmit" class="card-detail-drawer__form">
            <div class="card-detail-drawer__body">
                <div class="card-detail-drawer__meta">
                    <KanbanTagBadge :tag="card.tag" />
                    <DateBadge :date="card.created_at" />
                </div>

                <BaseInput v-model="title" v-bind="titleAttrs" :error="errors.title" />

                <TextEditor v-model="description" v-bind="descriptionAttrs" />
            </div>

            <div class="card-detail-drawer__footer">
                <Button type="submit" :loading="isPending" :disabled="!meta.dirty">
                    Сохранить
                </Button>
            </div>
        </form>
    </aside>
</template>

<style scoped lang="scss">
.card-detail-drawer {
    position: fixed;
    top: var(--header-height);
    right: 0;
    z-index: var(--z-drawer);
    width: calc((100vw - var(--sidebar-width)) * 0.5);
    max-width: 800px;
    height: calc(100vh - var(--header-height));
    background-color: var(--color-white);
    border-left: 1px solid var(--color-border);
    display: flex;
    flex-direction: column;
    padding: 12px;
    pointer-events: auto;

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
    }

    &__state {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: var(--space-4);
        color: var(--color-text-muted);
    }

    &__meta {
        display: flex;
        align-items: center;
        gap: var(--space-4);
    }

    &__action {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--radius-sm);
        color: var(--color-text);
        cursor: pointer;
        width: 28px;
        height: 28px;
        padding: 0;
        border: 0;

        &:hover {
            background-color: var(--color-bg-muted);
            color: var(--color-black);
        }
    }

    &__form {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-height: 0;
    }

    &__body {
        display: flex;
        flex-direction: column;
        gap: var(--space-4);
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        padding-bottom: 12px;
    }

    &__footer {
        flex-shrink: 0;
        padding-top: 12px;
        border-top: 1px solid var(--color-border);
    }
}
</style>

<script setup lang="ts">
import { IconChevronsRight, IconLink } from "@tabler/icons-vue";
import TextEditor from "@/shared/ui/text-editor/TextEditor.vue";
import { useKanbanSingleCardQuery } from "@/features/kanban/hooks/useKanbanSingleCardQuery.ts";
import { computed, toRef, watch } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import BaseInput from "@/shared/ui/input/BaseInput.vue";
import Button from "@/shared/ui/button/Button.vue";
import { useKanbanCardUpdate } from "@/features/kanban/hooks/useKanbanCardUpdate.ts";
import type { KanbanCardTag } from "@/features/kanban/types/kanban.types.ts";
import KanbanTagBadge from "@/features/kanban/components/kanban-tag-badge/KanbanTagBadge.vue";
import DateBadge from "@/shared/ui/date-badge/DateBadge.vue";

const props = defineProps<{
    cardId: number;
}>();

const emit = defineEmits<{
    (e: "close"): void;
}>();

const cardId = toRef(props, "cardId");
const singleCardQuery = useKanbanSingleCardQuery(cardId);

const card = computed(() => singleCardQuery.data.value ?? null);
const isLoading = computed(() => singleCardQuery.isLoading.value);
const isError = computed(() => singleCardQuery.error.value);
const isSuccess = computed(() => singleCardQuery.isSuccess.value);

const { mutate, isPending } = useKanbanCardUpdate();

const validationSchema = z.object({
    title: z
        .string()
        .nonempty("Заполните поле")
        .min(6, "Минимум 6 символов")
        .max(100, "Максимум 100 символов"),

    description: z.string(),
    tag: z.string(),
});

const { errors, defineField, handleSubmit, resetForm } = useForm<{
    title: string;
    description: string;
    tag: KanbanCardTag;
}>({
    validationSchema: toTypedSchema(validationSchema),
    initialValues: {
        title: "",
        description: "",
        tag: "personal",
    },
});

const [title, titleAttrs] = defineField("title");
const [description, descriptionAttrs] = defineField("description");
const [tag, tagAttrs] = defineField("tag");

watch(
    isSuccess,
    (success) => {
        if (success && card.value) {
            resetForm({
                values: {
                    title: card.value.title ?? "",
                    description: card.value.description ?? "",
                },
            });
        }
    },
    { immediate: true },
);

const onSubmit = handleSubmit((values) => {
    mutate({
        cardId: cardId.value,
        dto: values,
    });
});
</script>

<template>
    <aside class="card-detail-drawer">
        <div class="card-detail-drawer__header">
            <button class="card-detail-drawer__action" type="button" @click="emit('close')">
                <IconChevronsRight size="18" />
            </button>

            <button class="card-detail-drawer__action" type="button">
                <IconLink size="18" />
            </button>
        </div>

        <div v-if="isLoading" class="card-detail-drawer__state">Загрузка...</div>

        <div v-else-if="isError" class="card-detail-drawer__state">
            Не удалось загрузить карточку
        </div>

        <form v-else-if="card" @submit="onSubmit" class="card-detail-drawer__form">
            <div class="card-detail-drawer__body">
                <div class="card-detail-drawer__header">
                    <KanbanTagBadge :tag="card.tag" />
                    <DateBadge :date="card.created_at" />
                </div>

                <BaseInput id="title" v-model="title" v-bind="titleAttrs" :error="errors.title" />

                <TextEditor v-model="description" v-bind="descriptionAttrs" />
            </div>

            <div class="card-detail-drawer__footer">
                <Button type="submit" :loading="isPending"> Сохранить </Button>
            </div>
        </form>
    </aside>
</template>

<style scoped lang="scss">
.card-detail-drawer {
    position: fixed;
    top: var(--header-height);
    right: 0;
    z-index: var(--z-tooltip);
    width: calc(100vw - var(--sidebar-width));
    max-width: 600px;
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

    &__header {
        display: flex;
        align-items: center;
        gap: var(--space-4);
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

    &__state {
        padding: 48px 24px;
        text-align: center;
        color: var(--color-text-muted);
    }
}
</style>

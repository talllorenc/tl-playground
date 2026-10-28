<script setup lang="ts">
import { IconChevronsRight, IconLink } from "@tabler/icons-vue";
import TextEditor from "@/shared/ui/text-editor/TextEditor.vue";
import { computed, nextTick, ref, toRef, watch } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import BaseInput from "@/shared/ui/input/BaseInput.vue";
import Button from "@/shared/ui/button/Button.vue";
import { useKanbanCard } from "@/features/kanban/hooks/useKanbanCard.ts";
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
import Modal from "@/shared/ui/modal/Modal.vue";
import { copyToClipboard } from "@/utils/copy-to-clipboard.ts";
import { useEscapeKey } from "@/utils/handle-escape-key.ts";

const props = defineProps<{
    cardId: number;
}>();

const emit = defineEmits<{
    (e: "close"): void;
}>();

const cardId = toRef(props, "cardId");

const { data: card, isLoading, isError, refetch } = useKanbanCard(cardId);

const { mutate, isPending } = useKanbanCardUpdate();

const isCloseConfirmOpen = ref<boolean>(false);

const isTitleEditing = ref<boolean>(false);
const isDescriptionEditing = ref<boolean>(false);
const descriptionEditor = ref<InstanceType<typeof TextEditor> | null>(null);

const { errors, defineField, handleSubmit, resetForm, resetField, meta } =
    useForm<UpdateCardFormValues>({
        validationSchema: toTypedSchema(updateCardSchema),
    });

const [title, titleAttrs] = defineField("title");
const [description, descriptionAttrs] = defineField("description");

// An empty description has nothing to show, so the editor is open right away
const isDescriptionEditorShown = computed(() => isDescriptionEditing.value || !description.value);

let formCardId: number | null = null;

function resetFormFromCard(card: IKanbanCard) {
    formCardId = card.id;

    resetForm({
        values: {
            title: card.title,
            description: card.description ?? "",
            tag: card.tag,
        },
    });
}

watch(
    card,
    (card) => {
        if (card && (card.id !== formCardId || !meta.value.dirty)) {
            resetFormFromCard(card);
        }
    },
    { immediate: true },
);

const onSubmit = handleSubmit((values) => {
    mutate(
        {
            cardId: cardId.value,
            dto: {
                ...values,
                description: values.description || null,
            },
        },
        {
            onSuccess: (updatedCard) => resetFormFromCard(updatedCard),
        },
    );
});

function startTitleEditing() {
    isTitleEditing.value = true;
}

function finishTitleEditing(event: KeyboardEvent) {
    (event.target as HTMLInputElement).blur();
}

function cancelTitleEditing(event: KeyboardEvent) {
    resetField("title");
    (event.target as HTMLInputElement).blur();
}

async function startDescriptionEditing(position?: number) {
    isDescriptionEditing.value = true;

    await nextTick();
    descriptionEditor.value?.focus(position ?? "end");
}

function handleDescriptionClick(event: MouseEvent) {
    if (isDescriptionEditing.value || (event.target as HTMLElement).closest("a")) return;

    void startDescriptionEditing(
        descriptionEditor.value?.getPositionAtCoords(event.clientX, event.clientY),
    );
}

function handleDescriptionFocusIn() {
    // Keeps the editor open once the first character makes the description non-empty
    if (!description.value) {
        isDescriptionEditing.value = true;
    }
}

function handleDescriptionFocusOut(event: FocusEvent) {
    const wrapper = event.currentTarget as HTMLElement;
    const nextTarget = event.relatedTarget as Node | null;

    if (!document.hasFocus() || (nextTarget && wrapper.contains(nextTarget))) return;

    isDescriptionEditing.value = false;
}

function handleDescriptionEscape(event: KeyboardEvent) {
    if (!isDescriptionEditing.value) return;

    event.stopPropagation();
    isDescriptionEditing.value = false;
}

function requestClose() {
    if (!meta.value.dirty) {
        emit("close");
        return;
    }

    isCloseConfirmOpen.value = true;
}

function confirmClose() {
    isCloseConfirmOpen.value = false;
    emit("close");
}

function copyLink() {
    void copyToClipboard(window.location.href, "Ссылка на карточку скопирована");
}

// Esc while the confirm modal is open closes only the modal itself
useEscapeKey(requestClose, () => !isCloseConfirmOpen.value);
</script>

<template>
    <aside class="card-detail-drawer">
        <div class="card-detail-drawer__header">
            <button
                class="card-detail-drawer__action"
                type="button"
                aria-label="Закрыть"
                @click="requestClose"
            >
                <IconChevronsRight size="18" />
            </button>

            <button
                class="card-detail-drawer__action"
                type="button"
                aria-label="Скопировать ссылку"
                @click="copyLink"
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

                <BaseInput
                    v-if="isTitleEditing || errors.title"
                    v-model="title"
                    v-bind="titleAttrs"
                    type="borderless"
                    class="card-detail-drawer__title-input"
                    aria-label="Название карточки"
                    :error="errors.title"
                    autofocus
                    @blur="isTitleEditing = false"
                    @keydown.enter.prevent="finishTitleEditing"
                    @keydown.esc.stop="cancelTitleEditing"
                />

                <h2 v-else class="card-detail-drawer__title">
                    <button
                        class="card-detail-drawer__title-trigger"
                        type="button"
                        :aria-label="`Изменить название: ${title || 'Без названия'}`"
                        @click="startTitleEditing"
                    >
                        {{ title || "Без названия" }}
                    </button>
                </h2>

                <div
                    class="card-detail-drawer__description"
                    :class="{
                        'card-detail-drawer__description--editing': isDescriptionEditorShown,
                    }"
                    @focusin="handleDescriptionFocusIn"
                    @focusout="handleDescriptionFocusOut"
                    @keydown.esc="handleDescriptionEscape"
                >
                    <div
                        class="card-detail-drawer__description-view"
                        :role="isDescriptionEditorShown ? undefined : 'button'"
                        :tabindex="isDescriptionEditorShown ? -1 : 0"
                        :aria-label="isDescriptionEditorShown ? undefined : 'Изменить описание'"
                        @click="handleDescriptionClick"
                        @keydown.enter.self.prevent="startDescriptionEditing()"
                        @keydown.space.self.prevent="startDescriptionEditing()"
                    >
                        <TextEditor
                            ref="descriptionEditor"
                            v-model="description"
                            v-bind="descriptionAttrs"
                            :readonly="!isDescriptionEditorShown"
                        />
                    </div>
                </div>
            </div>

            <div class="card-detail-drawer__footer">
                <Button type="submit" :loading="isPending" :disabled="!meta.dirty">
                    <span>Сохранить</span>
                </Button>
            </div>
        </form>

        <Modal v-model:open="isCloseConfirmOpen" title="Несохранённые изменения">
            Закрыть карточку без сохранения?

            <template #actions>
                <Button variant="secondary" @click="isCloseConfirmOpen = false">Остаться</Button>
                <Button variant="danger" @click="confirmClose">Закрыть</Button>
            </template>
        </Modal>
    </aside>
</template>

<style scoped lang="scss">
.card-detail-drawer {
    position: fixed;
    top: 0;
    right: 0;
    z-index: var(--z-drawer);
    width: calc((100vw - var(--sidebar-width)) * 0.6);
    max-width: 800px;
    height: 100vh;
    background-color: var(--color-bg-surface);
    border-left: 1px solid var(--color-border);
    display: flex;
    flex-direction: column;
    padding: var(--space-3);
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
        color: var(--color-text-secondary);
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
        transition: background-color var(--transition-fast);

        &:hover {
            background-color: var(--color-bg-hover);
        }
    }

    &__title {
        margin: 0;
        font-size: var(--font-h2);
        font-weight: var(--font-w-lg);
    }

    &__title-trigger {
        max-width: 100%;
        // Same box as the borderless input, so the title does not jump when editing starts
        padding: 4px 0;
        border: 0;
        border-bottom: 1px solid transparent;
        background: none;
        color: inherit;
        font: inherit;
        text-align: left;
        cursor: text;
        outline: none;
    }

    &__description:not(&__description--editing) {
        cursor: text;
    }

    &__description-view:focus-visible {
        border-radius: var(--radius-sm);
        outline: 2px solid var(--color-accent);
    }

    &__title-input :deep(.input__field) {
        padding: var(--space-1) 0;
        font-size: var(--font-h2);
        font-weight: var(--font-w-lg);
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

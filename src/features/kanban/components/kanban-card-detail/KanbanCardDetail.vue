<script setup lang="ts">
import { IconLink, IconPencil, IconX, IconMaximize, IconMinimize } from "@tabler/icons-vue";
import TextEditor from "@/shared/ui/text-editor/TextEditor.vue";
import { computed, ref, toRef, useId, watch } from "vue";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import BaseInput from "@/shared/ui/input/BaseInput.vue";
import Button from "@/shared/ui/button/Button.vue";
import { useKanbanCard } from "@/features/kanban/hooks/useKanbanCard.ts";
import { useKanbanCardUpdate } from "@/features/kanban/hooks/useKanbanCardUpdate.ts";
import { useKanbanCardDetail } from "@/features/kanban/hooks/useKanbanCardDetail.ts";
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
import Tooltip from "@/shared/ui/tooltip/Tooltip.vue";
import KbdKey from "@/shared/ui/kbd-key/KbdKey.vue";
import { copyToClipboard } from "@/utils/copy-to-clipboard.ts";
import { handleKey } from "@/utils/handle-key.ts";
import { getAriaKeyshortcuts } from "@/utils/keyboard-shortcut.ts";

const EDIT_SHORTCUT = "$mod+KeyE";
const FULLSCREEN_SHORTCUT = "KeyF";

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

const isEditing = ref<boolean>(false);

const { isFullScreen, toggleFullScreen } = useKanbanCardDetail();

const titleId = useId();
const panel = ref<HTMLElement | null>(null);

useFocusTrap(panel, {
    immediate: true,
    escapeDeactivates: false,
    allowOutsideClick: true,
    fallbackFocus: () => panel.value ?? document.body,
});

let isPointerDownOnOverlay = false;

const { errors, defineField, handleSubmit, resetForm, resetField, meta } =
    useForm<UpdateCardFormValues>({
        validationSchema: toTypedSchema(updateCardSchema),
    });

const [title, titleAttrs] = defineField("title");
const [description, descriptionAttrs] = defineField("description");

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

watch(cardId, () => {
    isEditing.value = false;
});

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
            onSuccess: (updatedCard) => {
                resetFormFromCard(updatedCard);
                isEditing.value = false;
            },
        },
    );
});

function toggleEditing() {
    isEditing.value = !isEditing.value;
}

const canToggleEditing = computed(() => !!card.value && !isCloseConfirmOpen.value);
const canClose = computed(() => !isCloseConfirmOpen.value);

function finishTitleEditing(event: KeyboardEvent) {
    (event.target as HTMLInputElement).blur();
}

function cancelTitleEditing(event: KeyboardEvent) {
    resetField("title");
    (event.target as HTMLInputElement).blur();
}

function requestClose() {
    if (!meta.value.dirty) {
        emit("close");
        return;
    }

    isCloseConfirmOpen.value = true;
}

function handleOverlayPointerDown(event: PointerEvent) {
    isPointerDownOnOverlay = event.target === event.currentTarget;
}

function handleOverlayClick(event: MouseEvent) {
    if (isPointerDownOnOverlay && event.target === event.currentTarget) {
        requestClose();
    }

    isPointerDownOnOverlay = false;
}

function confirmClose() {
    isCloseConfirmOpen.value = false;
    emit("close");
}

function copyLink() {
    void copyToClipboard(window.location.href, "Ссылка на карточку скопирована");
}

handleKey(EDIT_SHORTCUT, toggleEditing, {
    allowInInputs: true,
    enabled: canToggleEditing,
});
handleKey(FULLSCREEN_SHORTCUT, toggleFullScreen, {
    enabled: canClose,
});
handleKey("Escape", requestClose, {
    allowInInputs: true,
    preventDefault: false,
    enabled: canClose,
});
</script>

<template>
    <div
        class="card-detail"
        :class="{ 'card-detail--fullscreen': isFullScreen }"
        @pointerdown="handleOverlayPointerDown"
        @click="handleOverlayClick"
    >
        <section
            ref="panel"
            class="card-detail__panel"
            tabindex="-1"
            role="dialog"
            aria-modal="true"
            :aria-labelledby="titleId"
            aria-label="Карточка"
        >
            <div class="card-detail__header">
                <Tooltip>
                    <button
                        class="card-detail__action"
                        type="button"
                        aria-label="Закрыть"
                        @click="requestClose"
                    >
                        <IconX size="18" />
                    </button>
                    <template #content>Закрыть</template>
                </Tooltip>

                <div class="card-detail__header-actions">
                    <Tooltip>
                        <button
                            class="card-detail__action"
                            :class="{ 'card-detail__action--active': isEditing }"
                            type="button"
                            aria-label="Редактировать карточку"
                            :aria-keyshortcuts="getAriaKeyshortcuts(EDIT_SHORTCUT)"
                            :aria-pressed="isEditing"
                            :disabled="!card"
                            @click="toggleEditing"
                        >
                            <IconPencil size="18" />
                        </button>
                        <template #content
                            >Редактировать
                            <KbdKey :shortcut="EDIT_SHORTCUT" />
                        </template>
                    </Tooltip>

                    <Tooltip>
                        <button
                            class="card-detail__action"
                            type="button"
                            aria-label="Полноэкранный режим"
                            :aria-keyshortcuts="getAriaKeyshortcuts(FULLSCREEN_SHORTCUT)"
                            :aria-pressed="isFullScreen"
                            @click="toggleFullScreen"
                        >
                            <IconMinimize v-if="isFullScreen" size="18" />
                            <IconMaximize v-else size="18" />
                        </button>
                        <template #content>
                            <span class="card-detail__tooltip">
                                {{ isFullScreen ? "Свернуть" : "Развернуть" }}
                                <KbdKey :shortcut="FULLSCREEN_SHORTCUT" />
                            </span>
                        </template>
                    </Tooltip>

                    <Tooltip>
                        <button
                            class="card-detail__action"
                            type="button"
                            aria-label="Скопировать ссылку"
                            @click="copyLink"
                        >
                            <IconLink size="18" />
                        </button>
                        <template #content>Скопировать ссылку</template>
                    </Tooltip>
                </div>
            </div>

            <div v-if="isLoading">
                <Skeleton>
                    <SkeletonItem height="24px" width="200px" />
                    <SkeletonItem height="40px" />
                    <SkeletonItem height="300px" />
                </Skeleton>
            </div>

            <div v-else-if="isError" class="card-detail__state">
                <span>Не удалось загрузить карточку</span>
                <Button variant="secondary" @click="refetch()">Повторить</Button>
            </div>

            <form v-else-if="card" @submit="onSubmit" class="card-detail__form">
                <div class="card-detail__body">
                    <div class="card-detail__meta">
                        <KanbanTagBadge :tag="card.tag" />
                        <DateBadge :date="card.created_at" />
                    </div>

                    <BaseInput
                        v-if="isEditing || errors.title"
                        v-model="title"
                        v-bind="titleAttrs"
                        type="borderless"
                        class="card-detail__title-input"
                        aria-label="Название карточки"
                        :error="errors.title"
                        @keydown.enter.prevent="finishTitleEditing"
                        @keydown.esc.stop="cancelTitleEditing"
                    />

                    <h2 v-else :id="titleId" class="card-detail__title">
                        {{ title || "Без названия" }}
                    </h2>

                    <TextEditor
                        v-if="isEditing || description"
                        v-model="description"
                        v-bind="descriptionAttrs"
                        :readonly="!isEditing"
                    />

                    <p v-else class="card-detail__empty">Описания нет</p>
                </div>

                <div class="card-detail__footer">
                    <Button type="submit" :loading="isPending" :disabled="!meta.dirty">
                        <span>Сохранить</span>
                    </Button>
                </div>
            </form>

            <Modal v-model:open="isCloseConfirmOpen" title="Несохранённые изменения">
                Закрыть карточку без сохранения?

                <template #actions>
                    <Button variant="secondary" @click="isCloseConfirmOpen = false"
                        >Остаться</Button
                    >
                    <Button variant="danger" @click="confirmClose">Закрыть</Button>
                </template>
            </Modal>
        </section>
    </div>
</template>

<style scoped lang="scss">
.card-detail {
    position: fixed;
    inset: 0;
    z-index: var(--z-dialog);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-6) var(--space-4);
    background-color: rgb(0 0 0 / 50%);
    backdrop-filter: blur(2px);
    transition: padding var(--transition-normal);

    &--fullscreen {
        padding: 0;
    }

    &__panel {
        display: flex;
        flex-direction: column;
        width: 600px;
        max-width: 100%;
        height: 100%;
        padding: var(--space-3);
        background-color: var(--color-bg-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        transition:
            width var(--transition-normal),
            border-radius var(--transition-normal);

        &:focus {
            outline: none;
        }
    }

    &--fullscreen &__panel {
        width: 100%;
        border-color: transparent;
        border-radius: 0;
    }

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
    }

    &__header-actions {
        display: flex;
        align-items: center;
        gap: var(--space-1);
    }

    &__empty {
        margin: 0;
        color: var(--color-text-secondary);
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

        &:hover,
        &--active {
            background-color: var(--color-bg-hover);
        }

        &:disabled {
            cursor: not-allowed;
            opacity: 0.6;
        }
    }

    &__title {
        margin: 0;
        padding: 4px 0;
        border-bottom: 1px solid transparent;
        font-size: var(--font-h2);
        font-weight: var(--font-w-lg);
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

.card-detail-enter-active,
.card-detail-leave-active {
    transition: opacity var(--transition-normal);

    .card-detail__panel {
        transition: transform var(--transition-normal);
    }
}

.card-detail-enter-from,
.card-detail-leave-to {
    opacity: 0;

    .card-detail__panel {
        transform: scale(0.96);
    }
}
</style>

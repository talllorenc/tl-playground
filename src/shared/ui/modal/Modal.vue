<script setup lang="ts">
import { ref, useId, watch } from "vue";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import { useEscapeKey } from "@/utils/handle-escape-key.ts";

const props = defineProps<{
    title?: string;
}>();

const isOpen = defineModel<boolean>("open", { required: true });

const slots = defineSlots<{
    default?(): unknown;
    actions?(): unknown;
}>();

const titleId = useId();
const modalBody = ref<HTMLElement | null>(null);

const { deactivate } = useFocusTrap(modalBody, {
    immediate: true,
    escapeDeactivates: false,
    allowOutsideClick: true,
    fallbackFocus: () => modalBody.value ?? document.body,
});

function close() {
    isOpen.value = false;
}

useEscapeKey(close, isOpen);

watch(isOpen, (open) => {
    if (!open) {
        deactivate();
    }
});
</script>

<template>
    <Teleport to="body">
        <div v-if="isOpen" class="modal" @click.self="close">
            <div
                ref="modalBody"
                class="modal__body"
                tabindex="-1"
                role="dialog"
                aria-modal="true"
                :aria-labelledby="props.title ? titleId : undefined"
            >
                <h2 v-if="props.title" :id="titleId" class="modal__title">{{ props.title }}</h2>

                <div v-if="slots.default" class="modal__content">
                    <slot />
                </div>

                <div v-if="slots.actions" class="modal__actions">
                    <slot name="actions" />
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style scoped lang="scss">
.modal {
    position: fixed;
    inset: 0;
    z-index: var(--z-modal);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(0 0 0 / 50%);
    backdrop-filter: blur(2px);

    &__body {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
        min-width: 320px;
        max-width: calc(100vw - var(--space-8));
        padding: var(--space-3);
        background-color: var(--color-bg);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        color: var(--color-text);

        &:focus {
            outline: none;
        }
    }

    &__title {
        font-size: var(--font-md);
        font-weight: var(--font-w-md);
        color: var(--color-text);
    }

    &__content {
        color: var(--color-text-secondary);
    }

    &__actions {
        display: flex;
        justify-content: flex-end;
        gap: var(--space-2);
        margin-top: var(--space-2);
    }
}
</style>

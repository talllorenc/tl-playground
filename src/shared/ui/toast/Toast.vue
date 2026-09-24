<script setup lang="ts">
import { type Component } from "vue";
import { type ToastActionVariant, useToastStore } from "@/stores/toast-store.ts";
import { IconCircleCheck, IconCircleX, IconX } from "@tabler/icons-vue";

const toast = useToastStore();

const TOAST_CONFIG: Record<ToastActionVariant, { icon: Component; class: string }> = {
    success: {
        icon: IconCircleCheck,
        class: "toast--success",
    },
    error: {
        icon: IconCircleX,
        class: "toast--error",
    },
};
</script>

<template>
    <Teleport to="body">
        <div class="toast-container">
            <TransitionGroup name="toast">
                <div
                    v-for="item in toast.toasts"
                    :key="item.id"
                    class="toast"
                    :class="TOAST_CONFIG[item.variant].class"
                >
                    <div class="toast__body">
                        <component
                            :is="TOAST_CONFIG[item.variant].icon"
                            class="toast__icon"
                            :size="18"
                        />

                        <span class="toast__title">
                            {{ item.title }}
                        </span>

                        <button
                            class="toast__close"
                            type="button"
                            aria-label="Закрыть"
                            @click="toast.closeToast(item.id)"
                        >
                            <IconX :size="18" />
                        </button>

                        <span class="toast__message">
                            {{ item.message }}
                        </span>
                    </div>
                </div>
            </TransitionGroup>
        </div>
    </Teleport>
</template>

<style scoped lang="scss">
.toast-container {
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: var(--z-toast);

    display: flex;
    flex-direction: column;
    gap: var(--space-2);
}

.toast {
    &--success {
        .toast__icon {
            color: var(--color-success);
        }
    }

    &--error {
        .toast__icon {
            color: var(--color-error);
        }
    }

    &__body {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr) auto;
        grid-template-rows: auto auto;
        align-items: center;
        column-gap: var(--space-2);
        row-gap: var(--space-1);

        max-width: 400px;
        padding: 16px;

        background-color: var(--color-white);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
    }

    &__icon {
        grid-column: 1;
        grid-row: 1;

        margin-top: 1px;
    }

    &__title {
        grid-column: 2;
        grid-row: 1;

        font-weight: var(--font-w-md);
        color: var(--color-black);
    }

    &__message {
        grid-column: 2;
        grid-row: 2;

        color: var(--color-text-muted);
    }

    &__close {
        grid-column: 3;
        grid-row: 1;

        display: flex;
        align-items: center;
        justify-content: center;

        width: 28px;
        height: 28px;
        padding: 0;

        border: 0;
        border-radius: var(--radius-sm);
        background: transparent;
        color: var(--color-text-muted);
        cursor: pointer;

        &:hover {
            background-color: var(--color-bg-muted);
            color: var(--color-black);
        }
    }
}

.toast-enter-active,
.toast-leave-active {
    transition:
        opacity 0.3s ease,
        transform 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
    opacity: 0;
    transform: translateY(8px);
}

.toast-move {
    transition: transform 0.3s ease;
}
</style>

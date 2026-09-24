<script setup lang="ts">
import { IconLoader2 } from "@tabler/icons-vue";

type ButtonVariant = "primary" | "secondary" | "danger";
type ButtonSize = "sm" | "md";

const props = withDefaults(
    defineProps<{
        variant?: ButtonVariant;
        size?: ButtonSize;
        loading?: boolean;
        disabled?: boolean;
    }>(),
    {
        variant: "primary",
        size: "sm",
        loading: false,
        disabled: false,
    },
);
</script>

<template>
    <button
        class="button"
        :class="[`button--${props.size}`, `button--${props.variant}`]"
        v-bind="$attrs"
        :disabled="props.loading || props.disabled"
    >
        <IconLoader2 v-if="props.loading" size="18" class="button__iconLoader" />
        <span>
            <slot />
        </span>
    </button>
</template>

<style scoped lang="scss">
.button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    border: none;
    border-radius: var(--radius-sm);
    cursor: pointer;
    font-weight: var(--font-w-md);

    &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }

    &--sm {
        min-height: 32px;
        padding: 6px 12px;
        font-size: var(--font-xs);
    }

    &--md {
        min-height: 40px;
        padding: 8px 16px;
        font-size: var(--font-md);
    }

    &--primary {
        background-color: var(--color-accent);
        color: var(--color-white);

        &:hover:not(:disabled) {
            opacity: 0.9;
        }
    }

    &--secondary {
        background-color: var(--color-bg-muted);
        color: var(--color-black);

        &:hover:not(:disabled) {
            background-color: var(--color-bg-secondary);
        }
    }

    &--danger {
        background-color: var(--color-red);
        color: var(--color-white);

        &:hover:not(:disabled) {
            opacity: 0.9;
        }
    }

    &__iconLoader {
        width: 18px;
        height: 18px;
        animation: spin 0.7s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
}
</style>

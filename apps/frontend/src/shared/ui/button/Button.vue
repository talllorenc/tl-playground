<script setup lang="ts">
import { IconLoader2 } from "@tabler/icons-vue";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "md";

const props = withDefaults(
    defineProps<{
        variant?: ButtonVariant;
        size?: ButtonSize;
        loading?: boolean;
    }>(),
    {
        variant: "primary",
        size: "sm",
        loading: false,
    },
);
</script>

<template>
    <button
        class="button"
        :class="[`button--${props.size}`, `button--${props.variant}`]"
        v-bind="$attrs"
        :disabled="props.loading"
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
    gap: 8px;
    border: none;
    border-radius: var(--radius-md);
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

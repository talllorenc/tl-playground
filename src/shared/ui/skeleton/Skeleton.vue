<script setup lang="ts">
withDefaults(
    defineProps<{
        variant?: "horizontal" | "vertical";
    }>(),
    {
        variant: "vertical",
    },
);
</script>

<template>
    <div class="skeleton" :class="`skeleton--${variant}`">
        <slot />
    </div>
</template>

<style scoped lang="scss">
.skeleton {
    display: flex;

    &--horizontal {
        flex-direction: row;
        gap: var(--space-2);
    }

    &--vertical {
        flex-direction: column;
        gap: var(--space-2);
    }
}
</style>

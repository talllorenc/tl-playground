<script setup lang="ts">
withDefaults(
    defineProps<{
        width?: string;
        height?: string;
    }>(),
    {
        width: "100%",
        height: "24px",
    },
);
</script>

<template>
    <div
        class="skeleton-item"
        :style="{
            width,
            height,
        }"
    />
</template>

<style scoped lang="scss">
.skeleton-item {
    flex-shrink: 0;
    background-color: var(--color-bg-secondary);
    animation: skeleton-pulse 1.5s ease-in-out infinite;
    border-radius: var(--radius-md);
}

@keyframes skeleton-pulse {
    0%,
    100% {
        opacity: 0.5;
    }

    50% {
        opacity: 1;
    }
}
</style>

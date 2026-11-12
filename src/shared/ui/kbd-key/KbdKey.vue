<script setup lang="ts">
defineProps<{
    shortcut: string;
}>();
</script>

<template>
    <kbd class="kbd">{{ shortcut }}</kbd>
</template>

<style scoped lang="scss">
.kbd {
    background-color: var(--color-bg-elevated);
    color: var(--color-text-secondary);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    font-size: var(--font-sm);
    width: 24px;
    height: 24px;
    font-weight: var(--font-w-lg);
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
</style>

<script setup lang="ts">
import { computed } from "vue";
import { getShortcutLabel } from "@/utils/keyboard-shortcut.ts";

const props = defineProps<{
    shortcut: string;
}>();

const label = computed(() => getShortcutLabel(props.shortcut));
</script>

<template>
    <kbd class="kbd">{{ label }}</kbd>
</template>

<style scoped lang="scss">
.kbd {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 24px;
    height: 24px;
    padding: 0 var(--space-1);
    background-color: var(--color-bg-elevated);
    color: var(--color-text-secondary);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    font-family: inherit;
    font-size: var(--font-sm);
    font-weight: var(--font-w-lg);
    white-space: nowrap;
}
</style>

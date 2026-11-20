<script setup lang="ts">
import type { KanbanColumnColor } from "@/features/kanban/types/kanban.types.ts";
import { COLOR_CONFIG } from "@/features/kanban/config/kanban-colors-config.ts";

const props = defineProps<{
    color: KanbanColumnColor | null;
}>();
</script>

<template>
    <span
        class="kanban-color"
        :style="{
            backgroundColor: props.color ? COLOR_CONFIG[props.color].indicator : undefined,
        }"
    />
</template>

<style scoped lang="scss">
.kanban-color {
    display: block;
    width: var(--size-indicator);
    height: var(--size-indicator);
    min-width: var(--size-indicator);
    min-height: var(--size-indicator);
    flex-shrink: 0;
    border-radius: var(--radius-full);
    border: 1px solid var(--color-border);
    transition: opacity var(--transition-fast);

    &:hover {
        opacity: 0.7;
    }
}
</style>

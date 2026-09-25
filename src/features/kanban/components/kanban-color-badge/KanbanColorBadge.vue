<script setup lang="ts">
import type { KanbanColumnColor } from "@/features/kanban/types/kanban.types.ts";
import { COLOR_VALUES } from "@/features/kanban/components/kanban-color-badge/kanban-colors-config.ts";

const props = defineProps<{
    color: KanbanColumnColor;
}>();
</script>

<template>
    <span
        class="kanban-color"
        :style="{
            backgroundColor: props.color ? COLOR_VALUES[props.color] : undefined,
        }"
    />
</template>

<style scoped lang="scss">
.kanban-color {
    display: block;
    width: 16px;
    height: 16px;
    min-width: 16px;
    min-height: 16px;
    flex-shrink: 0;
    border-radius: 50%;
    border: 1px solid var(--color-border);

    &:hover {
        opacity: 0.7;
    }
}
</style>

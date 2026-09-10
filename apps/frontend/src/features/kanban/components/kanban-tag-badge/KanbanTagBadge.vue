<script setup lang="ts">
import type { KanbanCardTag } from "@/features/kanban/types/kanban.types.ts";
import { TAG_CONFIG } from "@/features/kanban/components/kanban-tag-badge/kanban-tags-config.ts";

const props = defineProps<{
    tag: KanbanCardTag;
}>();
</script>

<template>
    <span class="kanban-tag" :class="TAG_CONFIG[props.tag].class">
        {{ TAG_CONFIG[props.tag].label }}
    </span>
</template>

<style scoped lang="scss">
.kanban-tag {
    display: inline-flex;
    align-items: center;
    width: fit-content;
    padding: 4px 8px;
    border-radius: var(--radius-sm);
    font-size: var(--font-sm);
    font-weight: 500;

    &--personal {
        color: #6d28d9;
        background-color: #f3e8ff;
    }

    &--work {
        color: #1d4ed8;
        background-color: #dbeafe;
    }

    &--urgent {
        color: #b91c1c;
        background-color: #fee2e2;
    }

    &--debt {
        color: #b45309;
        background-color: #fef3c7;
    }
}
</style>

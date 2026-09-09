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
    font-size: 12px;
    font-weight: 500;

    &--personal {
        // стили personal
    }

    &--work {
        // стили work
    }

    &--urgent {
        // стили urgent
    }

    &--debt {
        // стили important
    }
}
</style>

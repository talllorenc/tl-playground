<script setup lang="ts">
import type { KanbanCardTag } from "@/features/kanban/types/kanban.types.ts";
import { TAG_CONFIG } from "@/features/kanban/config/kanban-tags-config.ts";

const props = defineProps<{
    tag?: KanbanCardTag | null;
}>();
</script>

<template>
    <span v-if="props.tag" class="kanban-tag" :class="TAG_CONFIG[props.tag].class">
        {{ TAG_CONFIG[props.tag].label }}
    </span>
</template>

<style scoped lang="scss">
.kanban-tag {
    display: inline-flex;
    align-items: center;
    width: fit-content;
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-sm);
    font-size: var(--font-sm);
    font-weight: var(--font-w-md);

    &--personal {
        color: var(--color-tag-personal);
        background-color: var(--color-tag-personal-bg);
    }

    &--work {
        color: var(--color-tag-work);
        background-color: var(--color-tag-work-bg);
    }

    &--urgent {
        color: var(--color-tag-urgent);
        background-color: var(--color-tag-urgent-bg);
    }

    &--debt {
        color: var(--color-tag-debt);
        background-color: var(--color-tag-debt-bg);
    }
}
</style>

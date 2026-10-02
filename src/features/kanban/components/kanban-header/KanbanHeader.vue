<script setup lang="ts">
import Button from "@/shared/ui/button/Button.vue";
import { IconPlus, IconAdjustmentsHorizontal, IconArrowsSort } from "@tabler/icons-vue";
</script>

<template>
    <div class="kanban-header">
        <div class="kanban-header__body">
            <Button :icon="IconPlus"> Колонка </Button>
            <Button :icon="IconAdjustmentsHorizontal"> Фильтры </Button>

            <Button :icon="IconArrowsSort"> Сортировка </Button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.kanban-header {
    background-color: var(--color-bg-muted);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--space-2);
    position: sticky;
    left: 0;
    width: fit-content;

    &__body {
        display: flex;
        align-items: center;
        gap: var(--space-2);
    }
}
</style>

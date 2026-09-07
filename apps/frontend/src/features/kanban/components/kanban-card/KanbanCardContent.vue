<script setup lang="ts"></script>

<template>
    <div class="kanban-card-content">
        <span class="kanban-card-content__description"> Description </span>
    </div>
</template>

<style scoped lang="scss">
.kanban-card-content {
    display: flex;
    flex-direction: column;
    align-items: start;

    &__description {
        color: var(--color-text-muted);
    }
}
</style>

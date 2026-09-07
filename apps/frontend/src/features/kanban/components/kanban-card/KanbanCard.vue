<script setup lang="ts"></script>

<template>
    <div ref="element" class="kanban-card">
        <span class="kanban-card__title"> Title </span>

        <p class="kanban-card__description">Description</p>
    </div>
</template>

<style scoped lang="scss">
.kanban-card {
    padding: 12px 14px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    background: var(--color-bg);
    cursor: grab;
    display: flex;
    flex-direction: column;
    gap: 4px;
    transition:
        box-shadow 0.15s ease,
        opacity 0.15s ease;

    &__title {
        font-weight: var(--font-w-md);
        color: var(--color-text);
    }

    &__description {
        margin: 0;
        font-size: 13px;
        color: var(--color-text-muted);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
}
</style>

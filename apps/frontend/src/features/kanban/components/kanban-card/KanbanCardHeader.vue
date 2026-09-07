<script setup lang="ts"></script>

<template>
    <div class="kanban-card-header">
        <span class="kanban-card-header__title"> Title </span>
    </div>
</template>

<style scoped lang="scss">
.kanban-card-header {
    display: flex;
    flex-direction: column;
    align-items: start;

    &__title {
        font-weight: var(--font-w-md);
        color: var(--color-text);
    }
}
</style>

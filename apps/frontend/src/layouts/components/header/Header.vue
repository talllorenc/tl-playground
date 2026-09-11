<script setup lang="ts"></script>

<template>
    <header class="header">
        <div class="header__brand">TL Playground</div>
    </header>
</template>

<style scoped lang="scss">
.header {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 24px;
    background-color: var(--color-white);
    border-bottom: 1px solid var(--color-border);
    color: var(--color-text);

    &__brand {
        font-size: 16px;
        font-weight: 600;
        color: var(--color-text);
    }
}
</style>

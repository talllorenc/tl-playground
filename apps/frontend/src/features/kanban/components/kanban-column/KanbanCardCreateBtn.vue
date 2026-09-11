<script setup lang="ts">
import { IconPlus } from "@tabler/icons-vue";
</script>

<template>
    <button class="plus" type="button">
        <IconPlus size="18" />
    </button>
</template>

<style scoped lang="scss">
.plus {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-sm);
    color: var(--color-text);
    cursor: pointer;
    width: 28px;
    height: 28px;
    padding: 0;
    border: 0;

    &:hover {
        background-color: var(--color-bg-muted);
        color: var(--color-black);
    }
}
</style>

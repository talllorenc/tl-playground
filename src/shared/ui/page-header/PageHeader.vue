<script setup lang="ts">
const props = defineProps<{
    title: string;
}>();
</script>

<template>
    <div class="page-header">
        <slot name="breadcrumbs" />

        <h1>
            {{ props.title }}
        </h1>
    </div>
</template>

<style scoped lang="scss">
.page-header {
    position: sticky;
    left: 0;
    margin-bottom: var(--space-8);
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
}
</style>

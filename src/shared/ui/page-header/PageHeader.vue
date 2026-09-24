<script setup lang="ts">
const props = defineProps<{
    title: string;
}>();
</script>

<template>
    <header class="page-header">
        <div class="page-header__breadcrumbs">
            <slot name="breadcrumbs" />
        </div>

        <h1>
            {{ props.title }}
        </h1>
    </header>
</template>

<style scoped lang="scss">
.page-header {
    margin-bottom: 56px;

    &__breadcrumbs {
        margin-bottom: 8px;
    }
}
</style>

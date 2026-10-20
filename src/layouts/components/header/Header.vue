<script setup lang="ts">
import SearchButton from "@/shared/ui/search-button/SearchButton.vue";
import Notifications from "@/shared/ui/notifications/Notifications.vue";
</script>

<template>
    <header class="header">
        <div class="header__controls">
            <SearchButton />
            <Notifications />
        </div>
    </header>
</template>

<style scoped lang="scss">
.header {
    display: flex;
    align-items: center;
    justify-content: end;
    height: 100%;
    padding: 0 var(--space-4);

    &__controls {
        display: flex;
        align-items: center;
        gap: var(--space-2);
    }
}
</style>

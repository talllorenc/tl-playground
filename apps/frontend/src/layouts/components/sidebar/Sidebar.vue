<script setup lang="ts">
import { sidebarLinks } from "@/layouts/components/sidebar/sidebar.links.ts";
</script>

<template>
    <aside class="sidebar">
        <nav class="sidebar__nav">
            <RouterLink
                v-for="item in sidebarLinks"
                :key="item.to"
                :to="item.to"
                class="sidebar__link"
            >
                {{ item.label }}
            </RouterLink>
        </nav>
    </aside>
</template>

<style scoped lang="scss">
.sidebar {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 24px 16px;
    border-right: 1px solid var(--color-border);

    &__nav {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    &__link {
        padding: 8px;
        border-radius: var(--radius-sm);
        font-size: 14px;
        color: var(--color-text);
        transition:
            background-color var(--transition-fast),
            color var(--transition-fast);

        &:hover {
            color: var(--color-text);
            background-color: var(--color-bg-secondary);
        }
    }
}
</style>

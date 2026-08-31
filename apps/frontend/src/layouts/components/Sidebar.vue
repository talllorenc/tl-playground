<script setup lang="ts">
interface NavItem {
    label: string;
    to: string;
}

const navItems: NavItem[] = [
    { label: "Главная", to: "/" },
    { label: "Канбан", to: "/kanban" },
];
</script>

<template>
    <aside class="sidebar">
        <div class="sidebar__brand">TL Playground</div>

        <nav class="sidebar__nav">
            <RouterLink
                v-for="item in navItems"
                :key="item.to"
                :to="item.to"
                class="sidebar__link"
                active-class="sidebar__link--active"
            >
                {{ item.label }}
            </RouterLink>
        </nav>
    </aside>
</template>

<style scoped>
.sidebar {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 24px 16px;
    background-color: var(--color-bg-secondary);
    border-right: 1px solid var(--color-border);
}

.sidebar__brand {
    padding: 0 12px;
    margin-bottom: 24px;
    font-size: 16px;
    font-weight: 600;
    color: var(--color-text);
}

.sidebar__nav {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.sidebar__link {
    padding: 8px 12px;
    border-radius: var(--radius-sm);
    font-size: 14px;
    color: var(--color-text-secondary);
    transition:
        background-color 0.15s ease,
        color 0.15s ease;
}

.sidebar__link:hover {
    color: var(--color-text);
    background-color: var(--color-border);
}

.sidebar__link--active {
    color: var(--color-primary-foreground);
    background-color: var(--color-primary);
}
</style>

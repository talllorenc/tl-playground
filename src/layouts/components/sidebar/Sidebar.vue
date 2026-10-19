<script setup lang="ts">
import { SIDEBAR_LINKS } from "@/layouts/components/sidebar/sidebar-links.ts";
import AuthUserBox from "@/features/auth/components/AuthUserBox/AuthUserBox.vue";
</script>

<template>
    <aside class="sidebar">
        <AuthUserBox />

        <nav class="sidebar__nav" aria-label="Основное меню">
            <ul class="sidebar__list">
                <li v-for="link in SIDEBAR_LINKS" :key="link.id">
                    <span
                        v-if="link.disabled"
                        class="sidebar__link sidebar__link--disabled"
                        aria-disabled="true"
                    >
                        <component :is="link.icon" size="18" aria-hidden="true" />
                        {{ link.label }}
                    </span>
                    <RouterLink
                        v-else
                        :to="link.to"
                        class="sidebar__link"
                        exact-active-class="sidebar__link--active"
                    >
                        <component :is="link.icon" size="18" aria-hidden="true" />
                        {{ link.label }}
                    </RouterLink>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<style scoped lang="scss">
.sidebar {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: var(--space-4);
    background-color: var(--color-bg);

    &__nav {
        margin-top: var(--space-8);
    }

    &__list {
        display: flex;
        gap: var(--space-1);
        flex-direction: column;
    }

    &__link {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        border-radius: var(--radius-sm);
        padding: var(--space-2);
        color: var(--color-text);
        border: 1px solid transparent;

        transition:
            background-color var(--transition-fast),
            color var(--transition-fast);

        &:hover {
            color: var(--color-text);
            background-color: var(--color-bg-secondary);
        }

        &--active,
        &--active:hover {
            background-color: var(--color-bg-surface);
            border-color: var(--color-border);
        }

        &--disabled {
            color: var(--color-text-secondary);
            cursor: not-allowed;

            &:hover {
                color: var(--color-text-secondary);
                background-color: transparent;
            }
        }
    }
}
</style>

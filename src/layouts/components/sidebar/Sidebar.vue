<script setup lang="ts">
import { SIDEBAR_SECTIONS } from "@/layouts/components/sidebar/sidebar-links.ts";
import AuthUserBox from "@/features/auth/components/AuthUserBox/AuthUserBox.vue";

const visibleSections = SIDEBAR_SECTIONS.filter((section) => section.links.length > 0);
</script>

<template>
    <aside class="sidebar">
        <AuthUserBox />

        <nav class="sidebar__nav" aria-label="Основное меню">
            <ul class="sidebar__sections">
                <li v-for="section in visibleSections" :key="section.id">
                    <span :id="`sidebar-section-${section.id}`" class="sidebar__section-title">
                        {{ section.title }}
                    </span>
                    <ul class="sidebar__list" :aria-labelledby="`sidebar-section-${section.id}`">
                        <li v-for="link in section.links" :key="link.id">
                            <a
                                v-if="link.disabled"
                                class="sidebar__link sidebar__link--disabled"
                                role="link"
                                aria-disabled="true"
                            >
                                <component :is="link.icon" size="18" aria-hidden="true" />
                                {{ link.label }}
                            </a>
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

    &__sections {
        display: flex;
        flex-direction: column;
        gap: var(--space-6);
    }

    &__section-title {
        display: block;
        font-size: var(--font-xs);
        font-weight: var(--font-w-md);
        color: var(--color-text-secondary);
        text-transform: uppercase;
    }

    &__list {
        display: flex;
        gap: var(--space-1);
        flex-direction: column;
        margin-top: var(--space-2);
    }

    &__link {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        border-radius: var(--radius-sm);
        padding: var(--space-2);
        color: var(--color-text-inverse-secondary);
        border: 1px solid transparent;

        transition:
            background-color var(--transition-fast),
            color var(--transition-fast);

        &:hover {
            color: var(--color-text-inverse);
            background-color: var(--color-bg-hover-inverse);
        }

        &--active,
        &--active:hover {
            background-color: var(--color-accent);
            color: var(--color-text-inverse);
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

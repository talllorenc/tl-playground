<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { IconChevronRight, IconHome } from "@tabler/icons-vue";
import { HOME_ROUTE_NAME } from "@/router/routes.ts";

const route = useRoute();

const breadcrumbs = computed(() =>
    route.matched
        .filter((record) => record.meta.breadcrumb && record.name !== HOME_ROUTE_NAME)
        .map((record) => ({
            key: record.path,
            title: record.meta.breadcrumb,
            to: record.name ? { name: record.name } : record.path,
        })),
);
</script>

<template>
    <nav class="breadcrumbs" aria-label="Хлебные крошки">
        <ol class="breadcrumbs__list">
            <li>
                <RouterLink :to="{ name: HOME_ROUTE_NAME }" class="breadcrumbs__list__home">
                    <IconHome :size="18" /> <span>Главная</span>
                </RouterLink>
            </li>
            <template v-for="(crumb, index) in breadcrumbs" :key="crumb.key">
                <li class="breadcrumbs__list__separator" aria-hidden="true">
                    <IconChevronRight :size="16" />
                </li>

                <li class="breadcrumbs__list__item">
                    <RouterLink v-if="index < breadcrumbs.length - 1" :to="crumb.to">
                        {{ crumb.title }}
                    </RouterLink>

                    <span v-else aria-current="page">
                        {{ crumb.title }}
                    </span>
                </li>
            </template>
        </ol>
    </nav>
</template>

<style scoped lang="scss">
.breadcrumbs {
    width: fit-content;

    &__list {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: var(--space-2);

        &__home {
            display: inline-flex;
            align-items: center;
            gap: var(--space-1);

            color: var(--color-text);

            &:hover,
            &[aria-current="page"] {
                color: var(--color-accent);
            }
        }

        &__item {
            display: inline-flex;
            align-items: center;

            span[aria-current="page"] {
                color: var(--color-accent);
            }
        }

        &__separator {
            display: inline-flex;
            align-items: center;
            color: var(--color-text-secondary);
        }
    }
}
</style>

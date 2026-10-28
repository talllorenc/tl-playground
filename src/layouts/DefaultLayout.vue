<script setup lang="ts">
import Sidebar from "@/layouts/components/sidebar/Sidebar.vue";
import PageHeader from "@/shared/ui/page-header/PageHeader.vue";
import Breadcrumbs from "@/shared/ui/breadcrumbs/Breadcrumbs.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
    <div class="layout">
        <Sidebar class="layout__sidebar" />

        <div class="layout__main">
            <main class="layout__content">
                <PageHeader v-if="route.meta.title" :title="route.meta.title">
                    <template #breadcrumbs>
                        <Breadcrumbs />
                    </template>
                </PageHeader>

                <RouterView />
            </main>
        </div>
    </div>
</template>

<style scoped>
.layout {
    display: flex;
    height: 100vh;
}

.layout__sidebar {
    flex: 0 0 var(--sidebar-width);
}

.layout__main {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
}

.layout__content {
    flex: 1;
    min-height: 0;
    margin: var(--space-4) var(--space-4) var(--space-4) 0;
    overflow-y: auto;
    padding: var(--space-6);
    background-color: var(--color-bg-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
}
</style>

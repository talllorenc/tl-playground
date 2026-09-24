<script setup lang="ts">
import Sidebar from "@/layouts/components/sidebar/Sidebar.vue";
import Header from "@/layouts/components/header/Header.vue";
</script>

<template>
    <div class="layout">
        <Header class="layout__header" />

        <div class="layout__body">
            <Sidebar class="layout__sidebar" />

            <main class="layout__content">
                <RouterView />
            </main>
        </div>
    </div>
</template>

<style scoped>
.layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.layout__header {
    flex: 0 0 var(--header-height);
}

.layout__body {
    flex: 1;
    display: flex;
    min-height: 0;
}

.layout__sidebar {
    flex: 0 0 var(--sidebar-width);
}

.layout__content {
    flex: 1;
    min-width: 0;
    height: 100%;
    overflow-y: auto;
    padding: 32px 40px;
}
</style>

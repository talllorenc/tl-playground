<script setup lang="ts">
import Sidebar from "./components/Sidebar.vue";
</script>

<template>
    <div class="layout">
        <Sidebar class="layout__sidebar" />

        <main class="layout__content">
            <RouterView />
        </main>
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

.layout__content {
    flex: 1;
    min-width: 0;
    height: 100%;
    overflow-y: auto;
    padding: 32px 40px;
}
</style>

<script setup lang="ts">
import KanbanMain from "@/features/kanban/components/kanban-main/KanbanMain.vue";
import PageHeader from "@/shared/ui/page-header/PageHeader.vue";
</script>

<template>
    <PageHeader title="Канбан доска">
        <template #breadcrumbs>
            <span>Брэдкрамбс</span>
        </template>
    </PageHeader>
    <KanbanMain />
</template>

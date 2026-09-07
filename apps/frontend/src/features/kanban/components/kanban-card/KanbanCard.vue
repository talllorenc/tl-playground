<script setup lang="ts">
import KanbanCardHeader from "@/features/kanban/components/kanban-card/KanbanCardHeader.vue";
import KanbanCardContent from "@/features/kanban/components/kanban-card/KanbanCardContent.vue";
</script>

<template>
    <div ref="element" class="kanban-card kanban-card__animation">
        <KanbanCardHeader />
        <KanbanCardContent />
    </div>
</template>

<style scoped lang="scss">
.kanban-card {
    padding: 12px 14px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    background: var(--color-bg);
    cursor: grab;
    display: flex;
    flex-direction: column;
    gap: 4px;
    transition:
        box-shadow 0.15s ease,
        opacity 0.15s ease;

    @keyframes showCard {
        from {
            transform: scale(0.9) translateY(-5px);
            opacity: 0.4;
        }

        to {
            transform: scale(1) translateY(0);
            opacity: 1;
        }
    }

    &__animation {
        animation: showCard 0.3s ease-in-out;
    }
}
</style>

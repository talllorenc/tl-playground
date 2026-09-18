<script setup lang="ts">
import { IconChevronsRight, IconLink } from "@tabler/icons-vue";
import TextEditor from "@/shared/ui/text-editor/TextEditor.vue";
import { useKanbanSingleCardQuery } from "@/features/kanban/hooks/useKanbanSingleCardQuery.ts";
import { computed, toRef } from "vue";

const props = defineProps<{
    cardId: number;
}>();

const emit = defineEmits<{
    (e: "close"): void;
}>();

const cardId = toRef(props, "cardId");
const singleCardQuery = useKanbanSingleCardQuery(cardId);

const card = computed(() => singleCardQuery.data.value ?? null);
const isLoading = computed(() => singleCardQuery.isLoading.value);
const isError = computed(() => singleCardQuery.error.value);
</script>

<template>
    <Teleport to="body">
        <Transition name="drawer">
            <aside class="card-detail-drawer">
                <div class="card-detail-drawer__header">
                    <button class="card-detail-drawer__action" type="button" @click="emit('close')">
                        <IconChevronsRight size="18" />
                    </button>

                    <button class="card-detail-drawer__action" type="button">
                        <IconLink size="18" />
                    </button>
                </div>

                <div v-if="isLoading" class="card-detail-drawer__state">Загрузка...</div>

                <div v-else-if="isError" class="card-detail-drawer__state">
                    Не удалось загрузить карточку
                </div>

                <div v-else-if="card" class="card-detail-drawer__body">
                    <h2>Карточка #{{ card.id }}</h2>
                    <p>Содержимое карточки...</p>
                    <TextEditor />
                </div>
            </aside>
        </Transition>
    </Teleport>
</template>

<style scoped lang="scss">
.card-detail-drawer {
    position: fixed;
    top: var(--header-height);
    right: 0;
    z-index: var(--z-tooltip);
    width: 100%;
    max-width: 550px;
    height: 100vh;
    background-color: var(--color-white);
    border-left: 1px solid var(--color-border);
    display: flex;
    flex-direction: column;
    padding: 12px;
    overflow-y: auto;
    pointer-events: auto;

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
    }

    &__action {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--radius-sm);
        color: var(--color-text);
        cursor: pointer;
        width: 28px;
        height: 28px;
        padding: 0;
        border: 0;

        &:hover {
            background-color: var(--color-bg-muted);
            color: var(--color-black);
        }
    }

    &__body {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    &__state {
        padding: 48px 24px;
        text-align: center;
        color: var(--color-text-muted);
    }
}

.drawer-enter-active,
.drawer-leave-active {
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.drawer-enter-from,
.drawer-leave-to {
    transform: translateX(100%);
}
</style>

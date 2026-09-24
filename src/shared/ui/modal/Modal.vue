<script setup lang="ts">
import { useModalStore } from "@/stores/modal-store.ts";
import Button from "@/shared/ui/button/Button.vue";

const modal = useModalStore();
</script>

<template>
    <Teleport to="body">
        <div v-if="modal.isModalOpen" class="modal" @click.self="modal.closeModal()">
            <div class="modal__body">
                <div class="modal__header">
                    {{ modal.options?.title }}
                </div>

                <div class="modal__content">
                    {{ modal.options?.body }}
                </div>

                <div v-if="modal.options?.actions?.length" class="modal__actions">
                    <Button
                        v-for="(action, index) in modal.options?.actions"
                        :key="`${action.label}-${index}`"
                        :variant="action.variant ?? 'primary'"
                        :loading="action.loading"
                        :disabled="action.disabled"
                        @click="action.onClick"
                    >
                        {{ action.label }}
                    </Button>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style scoped lang="scss">
.modal {
    position: fixed;
    inset: 0;
    z-index: var(--z-modal);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(0 0 0 / 50%);

    &__body {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
        width: 320px;
        background-color: var(--color-white);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 16px;
    }
    &__header {
    }
    &__content {
    }
    &__actions {
    }
}
</style>

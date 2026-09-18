<script setup lang="ts">
import { ref } from "vue";
import type { IActionsMenuItem } from "@/shared/ui/actions-menu/actions-menu.types.ts";
import { useClickOutside } from "@/utils/handle-click-outside.ts";
import { IconLoader2 } from "@tabler/icons-vue";

const props = defineProps<{
    items: IActionsMenuItem[];
}>();

const isOpen = ref<boolean>(false);
const actionsMenu = ref<HTMLElement | null>(null);

function toggleMenu() {
    isOpen.value = !isOpen.value;
}

function closeMenu() {
    isOpen.value = false;
}

useClickOutside(actionsMenu, () => {
    closeMenu();
});
</script>

<template>
    <div ref="actionsMenu" class="actions-menu" @click.stop>
        <div
            class="actions-menu__trigger"
            aria-haspopup="menu"
            :aria-expanded="isOpen"
            @click="toggleMenu"
        >
            <slot name="trigger" />
        </div>

        <div v-if="isOpen" class="actions-menu__content" role="menu">
            <button
                v-for="(item, index) in props.items"
                :key="`${item.label}-${index}`"
                class="actions-menu__action"
                type="button"
                :disabled="item.disabled || item.loading"
                role="menuitem"
                @click="item.onClick"
            >
                <IconLoader2
                    v-if="item.loading"
                    :size="18"
                    class="actions-menu__action-icon actions-menu__action-icon--loading"
                />

                <component
                    :is="item.icon"
                    v-else-if="item.icon"
                    :size="18"
                    class="actions-menu__action-icon"
                />
                <span>{{ item.label }}</span>
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.actions-menu {
    position: relative;
    display: inline-flex;

    &__trigger {
        cursor: pointer;
    }

    &__content {
        position: absolute;
        top: calc(100% + 6px);
        right: 0;
        z-index: var(--z-dropdown);
        width: fit-content;
        background-color: var(--color-bg-muted);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 8px;
        flex-shrink: 0;
    }

    &__action {
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;
        justify-content: start;
        padding: 4px 8px;
        border-radius: var(--radius-sm);

        &:hover:not(:disabled) {
            background-color: var(--color-bg-secondary);
        }

        &:disabled {
            cursor: not-allowed;
            opacity: 0.6;
        }
    }
    &__action-icon {
        flex-shrink: 0;

        &--loading {
            animation: spin 0.7s linear infinite;
        }
    }

    &__action span {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
}
</style>

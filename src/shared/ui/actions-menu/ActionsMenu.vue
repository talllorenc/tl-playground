<script setup lang="ts">
import { computed, ref, useId } from "vue";
import type {
    IActionsMenuItem,
    IActionsMenuTriggerProps,
} from "@/shared/ui/actions-menu/actions-menu.types.ts";
import { useClickOutside } from "@/utils/handle-click-outside.ts";
import { IconLoader2 } from "@tabler/icons-vue";

const props = defineProps<{
    items: IActionsMenuItem[];
}>();

defineSlots<{
    trigger(slotProps: { props: IActionsMenuTriggerProps; isOpen: boolean }): unknown;
}>();

const isOpen = ref<boolean>(false);
const actionsMenu = ref<HTMLElement | null>(null);
const triggerId = useId();
const menuId = useId();
let triggerElement: HTMLElement | null = null;

const triggerProps = computed<IActionsMenuTriggerProps>(() => ({
    id: triggerId,
    "aria-expanded": isOpen.value,
    "aria-controls": isOpen.value ? menuId : undefined,
    onClick: handleTriggerClick,
}));

function closeMenu(returnFocus = false) {
    isOpen.value = false;

    if (returnFocus) {
        triggerElement?.focus();
    }
}

function handleTriggerClick(event: MouseEvent) {
    triggerElement = event.currentTarget as HTMLElement;
    isOpen.value = !isOpen.value;
}

function handleFocusout(event: FocusEvent) {
    const nextFocused = event.relatedTarget as Node | null;

    if (isOpen.value && nextFocused && !actionsMenu.value?.contains(nextFocused)) {
        closeMenu();
    }
}

function handleItemClick(item: IActionsMenuItem) {
    item.onClick?.();
    closeMenu(true);
}

useClickOutside(actionsMenu, () => closeMenu(), isOpen);
</script>

<template>
    <div ref="actionsMenu" class="actions-menu" @click.stop @focusout="handleFocusout">
        <slot name="trigger" :props="triggerProps" :is-open="isOpen" />

        <div
            v-if="isOpen"
            :id="menuId"
            class="actions-menu__content"
            role="group"
            :aria-labelledby="triggerId"
        >
            <button
                v-for="(item, index) in props.items"
                :key="`${item.label}-${index}`"
                class="actions-menu__action"
                type="button"
                :disabled="item.disabled || item.loading"
                :aria-busy="item.loading || undefined"
                @click="handleItemClick(item)"
            >
                <IconLoader2
                    v-if="item.loading"
                    :size="18"
                    class="actions-menu__action-icon actions-menu__action-icon--loading"
                    aria-hidden="true"
                />

                <component
                    :is="item.icon"
                    v-else-if="item.icon"
                    :size="18"
                    class="actions-menu__action-icon"
                    aria-hidden="true"
                />

                <span
                    v-else-if="item.indicator"
                    class="actions-menu__action-indicator"
                    :style="{ backgroundColor: item.indicator }"
                    aria-hidden="true"
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

    &__content {
        position: absolute;
        top: calc(100% + 6px);
        right: 0;
        z-index: var(--z-dropdown);
        width: fit-content;
        background-color: var(--color-bg-elevated);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
        padding: var(--space-1);
        flex-shrink: 0;
    }

    &__action {
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: var(--space-2);
        justify-content: start;
        padding: var(--space-2);
        border-radius: var(--radius-sm);
        transition: background-color var(--transition-fast);

        &:hover:not(:disabled),
        &:focus-visible {
            background-color: var(--color-bg-hover);
            outline: none;
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

    &__action-indicator {
        width: 16px;
        height: 16px;
        flex-shrink: 0;
        border-radius: 50%;
        border: 1px solid var(--color-border);
    }

    &__action span {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: var(--font-sm);
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
}
</style>

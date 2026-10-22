<script setup lang="ts">
import { computed, nextTick, ref, useId } from "vue";
import type { IPopoverTriggerProps } from "@/shared/ui/popover/popover.types.ts";
import { useClickOutside } from "@/utils/handle-click-outside.ts";

const props = defineProps<{
    label: string;
}>();

defineSlots<{
    trigger(slotProps: { props: IPopoverTriggerProps; isOpen: boolean }): unknown;
    default(slotProps: { close: () => void }): unknown;
}>();

const isOpen = ref<boolean>(false);
const popover = ref<HTMLElement | null>(null);
const content = ref<HTMLElement | null>(null);
const triggerId = useId();
const contentId = useId();
let triggerElement: HTMLElement | null = null;

const triggerProps = computed<IPopoverTriggerProps>(() => ({
    id: triggerId,
    "aria-haspopup": "dialog",
    "aria-expanded": isOpen.value,
    "aria-controls": isOpen.value ? contentId : undefined,
    onClick: handleTriggerClick,
}));

async function openPopover() {
    isOpen.value = true;
    await nextTick();
    content.value?.focus();
}

function closePopover(returnFocus = false) {
    isOpen.value = false;

    if (returnFocus) {
        triggerElement?.focus();
    }
}

function handleTriggerClick(event: MouseEvent) {
    triggerElement = event.currentTarget as HTMLElement;

    if (isOpen.value) {
        closePopover();
    } else {
        void openPopover();
    }
}

function handleFocusout(event: FocusEvent) {
    const nextFocused = event.relatedTarget as Node | null;

    if (isOpen.value && nextFocused && !popover.value?.contains(nextFocused)) {
        closePopover();
    }
}

useClickOutside(popover, () => closePopover(), isOpen);
</script>

<template>
    <div ref="popover" class="popover" @focusout="handleFocusout">
        <slot name="trigger" :props="triggerProps" :is-open="isOpen" />

        <Transition name="popover">
            <div
                v-if="isOpen"
                :id="contentId"
                ref="content"
                class="popover__content"
                role="dialog"
                :aria-label="props.label"
                tabindex="-1"
            >
                <slot :close="() => closePopover(true)" />
            </div>
        </Transition>
    </div>
</template>

<style scoped lang="scss">
.popover {
    position: relative;
    display: inline-flex;

    &__content {
        position: absolute;
        top: calc(100% + 8px);
        right: 0;
        z-index: var(--z-dropdown);
        min-width: 450px;
        background-color: var(--color-bg);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        padding: var(--space-3);

        &:focus {
            outline: none;
        }
    }
}

.popover-enter-active,
.popover-leave-active {
    transition:
        opacity 150ms ease,
        translate 150ms ease;
}

.popover-enter-from,
.popover-leave-to {
    opacity: 0;
    translate: 0 -2px;
}
</style>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, useId, useTemplateRef } from "vue";
import { computePosition, flip, offset, shift, autoUpdate } from "@floating-ui/vue";

const isVisible = ref<boolean>(false);
const triggerRef = useTemplateRef<HTMLElement>("triggerRef");
const tooltipRef = useTemplateRef<HTMLElement>("tooltipRef");
const tooltipStyle = ref<Record<string, string>>({});
const tooltipId = `tooltip-${useId()}`;
let cleanupAutoUpdate: (() => void) | undefined;

function stopAutoUpdate() {
    cleanupAutoUpdate?.();
    cleanupAutoUpdate = undefined;
}

async function updatePosition() {
    if (!triggerRef.value || !tooltipRef.value || !isVisible.value) return;

    const { x, y } = await computePosition(triggerRef.value, tooltipRef.value, {
        placement: "top",
        strategy: "fixed",
        middleware: [offset(8), flip(), shift({ padding: 8 })],
    });

    tooltipStyle.value = {
        left: `${x}px`,
        top: `${y}px`,
    };
}

async function show() {
    if (isVisible.value) return;

    isVisible.value = true;

    await nextTick();

    stopAutoUpdate();

    const reference = triggerRef.value;
    const floating = tooltipRef.value;

    if (!reference || !floating) return;

    cleanupAutoUpdate = autoUpdate(reference, floating, updatePosition);
}

function hide() {
    isVisible.value = false;
    stopAutoUpdate();
}

function handleFocusOut(event: FocusEvent) {
    const nextTarget = event.relatedTarget as Node | null;

    if (triggerRef.value && nextTarget && triggerRef.value.contains(nextTarget)) return;

    hide();
}

onBeforeUnmount(stopAutoUpdate);
</script>

<template>
    <span
        ref="triggerRef"
        class="tooltip-trigger"
        :aria-describedby="isVisible ? tooltipId : undefined"
        @mouseenter="show"
        @mouseleave="hide"
        @focusin="show"
        @focusout="handleFocusOut"
    >
        <slot />
        <Teleport to="body">
            <div
                ref="tooltipRef"
                v-if="isVisible"
                :id="tooltipId"
                class="tooltip"
                :style="tooltipStyle"
                role="tooltip"
            >
                <div class="tooltip__content" @click.stop>
                    <slot name="content" />
                </div>
            </div>
        </Teleport>
    </span>
</template>

<style scoped lang="scss">
.tooltip-trigger {
    display: inline-block;
    width: fit-content;
}

.tooltip {
    position: fixed;
    z-index: var(--z-tooltip);
    max-width: 120px;
    padding: var(--space-1);
    border-radius: var(--radius-sm);
    background-color: var(--color-bg-elevated);
    border: 1px solid var(--color-border);

    &__content {
        max-height: 60px;
        overflow-y: auto;
        word-wrap: break-word;
        font-size: var(--font-sm);
        color: var(--color-text-secondary);
    }
}
</style>

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

async function handleMouseEnter() {
    isVisible.value = true;

    await nextTick();

    stopAutoUpdate();

    const reference = triggerRef.value;
    const floating = tooltipRef.value;

    if (!reference || !floating) return;

    cleanupAutoUpdate = autoUpdate(reference, floating, updatePosition);
}

function handleMouseLeave() {
    isVisible.value = false;
    stopAutoUpdate();
}

onBeforeUnmount(stopAutoUpdate);
</script>

<template>
    <div
        ref="triggerRef"
        aria-live="polite"
        :aria-hidden="isVisible ? 'false' : 'true'"
        :aria-describedby="isVisible ? tooltipId : undefined"
        class="tooltip-trigger"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
    >
        <slot />
        <Teleport to="body">
            <div
                ref="tooltipRef"
                v-if="isVisible"
                :id="tooltipId"
                class="tooltip"
                :style="tooltipStyle"
            >
                <div class="tooltip__content" role="tooltip" @click.stop>
                    <slot name="content" />
                </div>
            </div>
        </Teleport>
    </div>
</template>

<style scoped lang="scss">
.tooltip-trigger {
    display: inline-block;
    width: fit-content;
    cursor: pointer;
}

.tooltip {
    position: fixed;
    z-index: var(--z-tooltip);
    max-width: 120px;
    padding: var(--space-1);
    border-radius: var(--radius-sm);
    background-color: var(--color-bg-elevated);

    &__content {
        max-height: 60px;
        overflow-y: auto;
        word-wrap: break-word;
    }
}
</style>

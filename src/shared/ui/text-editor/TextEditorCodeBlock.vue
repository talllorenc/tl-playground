<script setup lang="ts">
import { NodeViewContent, NodeViewWrapper, type NodeViewProps } from "@tiptap/vue-3";
import { IconCopy } from "@tabler/icons-vue";
import { copyToClipboard } from "@/utils/copy-to-clipboard.ts";

const props = defineProps<NodeViewProps>();

function handleCopy() {
    void copyToClipboard(props.node.textContent, "Код скопирован");
}
</script>

<template>
    <NodeViewWrapper class="code-block">
        <button
            class="code-block__copy"
            type="button"
            contenteditable="false"
            aria-label="Скопировать код"
            @mousedown.prevent
            @click="handleCopy"
        >
            <IconCopy :size="16" aria-hidden="true" />
        </button>

        <pre><NodeViewContent as="code" /></pre>
    </NodeViewWrapper>
</template>

<style scoped lang="scss">
.code-block {
    position: relative;

    &__copy {
        position: absolute;
        top: var(--space-2);
        right: var(--space-2);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border-radius: var(--radius-sm);
        border: 1px solid var(--color-border);
        background-color: var(--color-bg-elevated);
        transition: background-color var(--transition-fast);

        &:hover {
            background-color: var(--color-bg-hover);
        }
    }
}
</style>

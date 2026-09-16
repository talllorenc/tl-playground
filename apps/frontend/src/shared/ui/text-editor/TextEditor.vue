<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { onBeforeUnmount } from "vue";
import { IconBold, IconItalic } from "@tabler/icons-vue";

const editor = useEditor({
    content: "",
    extensions: [StarterKit],
});

onBeforeUnmount(() => {
    editor.value?.destroy();
});
</script>

<template>
    <div class="rich-editor">
        <div v-if="editor" class="rich-editor__toolbar">
            <button
                type="button"
                class="rich-editor__toolbar-button"
                :class="{ 'is-active': editor.isActive('bold') }"
                aria-label="Жирный текст"
                title="Жирный"
                @click="editor.chain().focus().toggleBold().run()"
            >
                <IconBold :size="18" />
            </button>
            <button
                type="button"
                class="rich-editor__toolbar-button"
                :class="{ 'is-active': editor.isActive('italic') }"
                aria-label="Курсивный текст"
                title="Курсив"
                @click="editor.chain().focus().toggleItalic().run()"
            >
                <IconItalic :size="18" />
            </button>
        </div>

        <EditorContent :editor="editor" class="rich-editor__content" />
    </div>
</template>

<style scoped lang="scss">
.rich-editor {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;

    &__toolbar {
        display: flex;
        align-items: center;
        gap: 4px;
        background-color: var(--color-white);
        border-radius: var(--radius-md);
        border: 1px solid var(--color-border);
        padding: 8px;
        width: fit-content;
    }

    &__toolbar-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        padding: 0;
        border: 1px solid transparent;
        border-radius: var(--radius-sm);
        background: transparent;
        cursor: pointer;

        &:hover {
            background-color: var(--color-bg-muted);
            color: var(--color-black);
        }

        &.is-active {
            border-color: var(--color-accent);
        }
    }

    &__content {
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background-color: var(--color-white);
    }

    :deep(.tiptap) {
        min-height: 160px;
        padding: 16px;
        outline: none;
    }

    &__content:focus-within {
        border-color: var(--color-accent);
    }
}
</style>

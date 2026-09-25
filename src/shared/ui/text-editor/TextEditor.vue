<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { onBeforeUnmount } from "vue";
import {
    IconBlockquote,
    IconBold,
    IconCode,
    IconCodeDots,
    IconItalic,
    IconList,
    IconListNumbers,
} from "@tabler/icons-vue";

const model = defineModel<string>({
    default: "",
});

const editor = useEditor({
    content: model.value,
    extensions: [StarterKit],

    onUpdate: ({ editor }) => {
        const html = editor.getHTML();

        model.value = html === "<p></p>" ? "" : html;
    },
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
            <button
                type="button"
                class="rich-editor__toolbar-button"
                :class="{ 'is-active': editor.isActive('bulletList') }"
                aria-label="Маркированный список"
                title="Маркированный список"
                @click="editor.chain().focus().toggleBulletList().run()"
            >
                <IconList :size="18" />
            </button>

            <button
                type="button"
                class="rich-editor__toolbar-button"
                :class="{ 'is-active': editor.isActive('orderedList') }"
                aria-label="Нумерованный список"
                title="Нумерованный список"
                @click="editor.chain().focus().toggleOrderedList().run()"
            >
                <IconListNumbers :size="18" />
            </button>
            <button
                type="button"
                class="rich-editor__toolbar-button"
                :class="{ 'is-active': editor.isActive('blockquote') }"
                aria-label="Цитата"
                title="Цитата"
                @click="editor.chain().focus().toggleBlockquote().run()"
            >
                <IconBlockquote :size="18" />
            </button>

            <button
                type="button"
                class="rich-editor__toolbar-button"
                :class="{ 'is-active': editor.isActive('code') }"
                aria-label="Код"
                title="Код"
                @click="editor.chain().focus().toggleCode().run()"
            >
                <IconCode :size="18" />
            </button>

            <button
                type="button"
                class="rich-editor__toolbar-button"
                :class="{ 'is-active': editor.isActive('codeBlock') }"
                aria-label="Блок кода"
                title="Блок кода"
                @click="editor.chain().focus().toggleCodeBlock().run()"
            >
                <IconCodeDots :size="18" />
            </button>
        </div>

        <EditorContent :editor="editor" class="rich-editor__content" />
    </div>
</template>

<style scoped lang="scss">
.rich-editor {
    display: flex;
    flex-direction: column;
    width: 100%;

    &__toolbar {
        display: flex;
        align-items: center;
        gap: var(--space-1);
        background-color: var(--color-white);
        border-top-right-radius: var(--radius-sm);
        border-top-left-radius: var(--radius-sm);
        border-left: 1px solid var(--color-border);
        border-right: 1px solid var(--color-border);
        border-top: 1px solid var(--color-border);
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
        border-bottom-left-radius: var(--radius-sm);
        border-bottom-right-radius: var(--radius-sm);
        border-top-right-radius: var(--radius-sm);

        background-color: var(--color-white);
    }

    :deep(.tiptap) {
        min-height: 160px;
        padding: 16px;
        outline: none;

        ul,
        ol {
            padding-left: var(--space-6);
        }

        ul {
            list-style: disc;
        }

        ol {
            list-style: decimal;
        }

        blockquote {
            padding-left: var(--space-2);
            border-left: 3px solid var(--color-accent);
            color: var(--color-black);
        }

        code {
            white-space: nowrap;
            padding: 2px 4px;
            border-radius: var(--radius-sm);
            background-color: var(--color-bg-secondary);
            font-family: monospace;
        }

        pre {
            padding: 12px;
            overflow-x: auto;
            border-radius: var(--radius-sm);
            background-color: var(--color-bg-secondary);

            code {
                padding: 0;
                background: transparent;
            }
        }
    }

    &__content:focus-within {
        border-color: var(--color-accent);
    }
}
</style>

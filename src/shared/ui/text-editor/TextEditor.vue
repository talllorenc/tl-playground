<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { TaskList, TaskItem } from "@tiptap/extension-list";
import { onBeforeUnmount, watch } from "vue";
import {
    IconBlockquote,
    IconBold,
    IconCode,
    IconCodeDots,
    IconItalic,
    IconList,
    IconListNumbers,
    IconLink,
    IconCheckbox,
} from "@tabler/icons-vue";

const model = defineModel<string>({
    default: "",
});

const editor = useEditor({
    content: model.value,
    extensions: [
        StarterKit,
        Link.configure({
            openOnClick: false,
            markdownLinks: true,
            defaultProtocol: "https",
        }),
        TaskList,
        TaskItem.configure({
            nested: true,
        }),
    ],

    onUpdate: ({ editor }) => {
        const html = editor.getHTML();

        model.value = html === "<p></p>" ? "" : html;
    },
});

watch(model, (value) => {
    if (!editor.value) return;

    const current = editor.value.getHTML();

    if (value !== (current === "<p></p>" ? "" : current)) {
        editor.value.commands.setContent(value, { emitUpdate: false });
    }
});

function handleToggleLink() {
    if (!editor.value) return;

    if (editor.value.isActive("link")) {
        editor.value.chain().focus().unsetLink().run();
        return;
    }

    const href = window.prompt("Введите URL");

    if (!href) return;

    editor.value.chain().focus().setLink({ href }).run();
}

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
                :class="{ 'is-active': editor.isActive('link') }"
                aria-label="Ссылка"
                title="Ссылка"
                @click="handleToggleLink"
            >
                <IconLink :size="18" />
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
                :class="{ 'is-active': editor?.isActive('taskList') }"
                aria-label="Чек-лист"
                title="Чек-лист"
                @click="editor?.chain().focus().toggleTaskList().run()"
            >
                <IconCheckbox :size="18" />
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
        background-color: var(--color-bg-input);
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
            background-color: var(--color-bg-secondary);
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
        background-color: var(--color-bg-input);
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

        ul[data-type="taskList"] {
            padding-left: 0;
            list-style: none;

            li {
                display: flex;
                align-items: flex-start;
                gap: 8px;

                > label {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex: 0 0 18px;
                    width: 18px;
                    height: 18px;
                    margin-top: 3px;
                    cursor: pointer;

                    input {
                        display: block;
                        width: 18px;
                        height: 18px;
                        margin: 0;
                        cursor: pointer;
                        accent-color: var(--color-accent);
                    }
                }

                > div {
                    flex: 1;
                    min-width: 0;
                }

                p {
                    margin: 0;
                }

                &[data-checked="true"] {
                    > div > p {
                        color: var(--color-text-secondary);
                    }
                }
            }
        }

        blockquote {
            padding-left: var(--space-2);
            border-left: 3px solid var(--color-accent);
        }

        a {
            border-bottom: 1px solid var(--color-accent);
            color: var(--color-accent);
        }

        code {
            white-space: nowrap;
            padding: 2px 8px;
            border-radius: var(--radius-sm);
            background-color: var(--color-bg-muted);
            font-family: monospace;
        }

        pre {
            padding: 12px;
            overflow-x: auto;
            border-radius: var(--radius-sm);
            background-color: var(--color-bg-muted);

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

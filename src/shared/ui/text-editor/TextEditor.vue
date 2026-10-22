<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import { computed, watch, ref } from "vue";
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
    IconSeparatorHorizontal,
    IconHighlight,
    IconPhoto,
} from "@tabler/icons-vue";
import {
    CHARACTER_LIMIT,
    textEditorExtensions,
} from "@/shared/ui/text-editor/text-editor-extensions.ts";
import { normalizeEditorHtml, toggleLink } from "@/shared/ui/text-editor/text-editor-utils.ts";

const model = defineModel<string>({
    default: "",
});

let lastEmittedHtml = model.value;
const imageInput = ref<HTMLInputElement | null>(null);

const editor = useEditor({
    content: model.value,

    extensions: textEditorExtensions,

    onUpdate: ({ editor }) => {
        lastEmittedHtml = normalizeEditorHtml(editor.getHTML());
        model.value = lastEmittedHtml;
    },
});

watch(model, (value) => {
    if (!editor.value || value === lastEmittedHtml) return;

    lastEmittedHtml = value;
    editor.value.commands.setContent(value, { emitUpdate: false });
});

function handleToggleLink() {
    if (!editor.value) return;

    toggleLink(editor.value);
}

function handleOpenImagePicker() {
    imageInput.value?.click();
}

function handleImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file || !editor.value) return;

    const src = URL.createObjectURL(file);

    editor.value.chain().focus().setImage({ src, alt: file.name }).run();

    input.value = "";
}

const characterCount = computed(() => editor.value?.storage.characterCount.characters() ?? 0);

const characterPercentage = computed(() =>
    Math.round((100 / CHARACTER_LIMIT) * characterCount.value),
);
</script>

<template>
    <div v-if="editor" class="rich-editor">
        <div class="rich-editor__toolbar">
            <div class="rich-editor__toolbar__control">
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
                    :class="{ 'is-active': editor.isActive('highlight') }"
                    aria-label="Выделение текста"
                    title="Выделение текста"
                    @click="editor.chain().focus().toggleHighlight().run()"
                >
                    <IconHighlight :size="18" />
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
                    disabled
                    type="button"
                    class="rich-editor__toolbar-button"
                    :class="{ 'is-active': editor.isActive('image') }"
                    aria-label="Вставить изображение"
                    title="Вставить изображение"
                    @click="handleOpenImagePicker"
                >
                    <IconPhoto :size="18" />
                </button>

                <input
                    disabled
                    ref="imageInput"
                    type="file"
                    accept="image/*"
                    hidden
                    @change="handleImageChange"
                />
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

                <button
                    type="button"
                    class="rich-editor__toolbar-button"
                    aria-label="Горизонтальная линия"
                    title="Горизонтальная линия"
                    @click="editor.chain().focus().setHorizontalRule().run()"
                >
                    <IconSeparatorHorizontal :size="18" />
                </button>
            </div>

            <div
                :class="{
                    'character-count': true,
                    'character-count--warning': characterCount >= CHARACTER_LIMIT,
                }"
            >
                <svg height="20" width="20" viewBox="0 0 20 20">
                    <circle r="10" cx="10" cy="10" fill="#eef1f4" />

                    <circle
                        r="5"
                        cx="10"
                        cy="10"
                        fill="transparent"
                        stroke="#6366f1"
                        stroke-width="10"
                        :stroke-dasharray="`${(characterPercentage * 31.4) / 100} 31.4`"
                        transform="rotate(-90) translate(-20)"
                    />
                </svg>

                <span>
                    {{ characterCount }}
                    /
                    {{ CHARACTER_LIMIT }}</span
                >
            </div>
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
        justify-content: space-between;
        flex-wrap: wrap;
        position: sticky;
        overflow: scroll;
        top: 0;
        gap: var(--space-2);
        z-index: var(--z-sticky);
        width: 100%;
        padding: var(--space-2);
        background-color: var(--color-bg-input);
        border: 1px solid var(--color-border);

        &__control {
            display: flex;
            align-items: center;
            gap: var(--space-2);
        }
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

        &:hover:not(:disabled) {
            background-color: var(--color-bg-secondary);
        }

        &:disabled {
            cursor: not-allowed;
            opacity: 0.6;
        }

        &.is-active {
            border-color: var(--color-accent);
        }
    }

    &__content {
        border-left: 1px solid var(--color-border);
        border-right: 1px solid var(--color-border);
        border-bottom: 1px solid var(--color-border);
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

        mark {
            padding: 1px 3px;
            border-radius: var(--radius-sm);
            background-color: var(--color-accent);
            color: var(--color-white);
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
            cursor: pointer;
        }

        code {
            white-space: nowrap;
            padding: var(--space-0) var(--space-1);
            border-radius: var(--radius-sm);
            background-color: var(--color-bg-secondary);
            color: var(--color-accent);
            font-family: monospace;
        }

        pre {
            background: var(--color-bg);
            border-radius: 8px;
            padding: 16px;
            overflow-x: auto;

            code {
                background: transparent;
                color: #24292f;
                font-family: "JetBrainsMono", monospace;
                font-size: 0.85rem;
                line-height: 1.7;
                white-space: pre;
                padding: 0;
            }

            .hljs-comment,
            .hljs-quote {
                color: #596779;
                font-style: italic;
            }

            .hljs-keyword,
            .hljs-selector-tag,
            .hljs-literal {
                color: #0550ae;
            }

            .hljs-string,
            .hljs-symbol,
            .hljs-bullet {
                color: #116329;
            }

            .hljs-number,
            .hljs-built_in,
            .hljs-builtin-name {
                color: #953800;
            }

            .hljs-title,
            .hljs-section {
                color: #8250df;
            }

            .hljs-type,
            .hljs-params {
                color: #0550ae;
            }

            .hljs-variable,
            .hljs-template-variable {
                color: #953800;
            }

            .hljs-attribute {
                color: #0550ae;
            }

            .hljs-tag,
            .hljs-name {
                color: #116329;
            }

            .hljs-meta,
            .hljs-regexp,
            .hljs-link {
                color: #cf222e;
            }

            .hljs-emphasis {
                font-style: italic;
            }

            .hljs-strong {
                font-weight: 700;
            }
        }

        hr {
            border: none;
            border-top: 1px solid var(--color-border);
            cursor: pointer;
            margin: var(--space-4) 0;
        }
    }

    .character-count {
        align-items: center;
        color: var(--color-text);
        display: flex;
        font-size: var(--font-xs);
        gap: 0.5rem;

        svg {
            color: var(--color-accent);
        }

        &--warning,
        &--warning svg {
            color: var(--color-red);
        }
    }
}
</style>

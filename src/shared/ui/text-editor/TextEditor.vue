<script setup lang="ts">
import { useEditor, EditorContent, type FocusPosition } from "@tiptap/vue-3";
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
    IconTablePlus,
    IconTableMinus,
    IconRowInsertBottom,
    IconRowRemove,
    IconColumnInsertRight,
    IconColumnRemove,
    IconArrowMergeBoth,
    IconArrowsSplit2,
} from "@tabler/icons-vue";
import {
    CHARACTER_LIMIT,
    textEditorExtensions,
} from "@/shared/ui/text-editor/text-editor-extensions.ts";
import Tooltip from "@/shared/ui/tooltip/Tooltip.vue";
import { normalizeEditorHtml, toggleLink } from "@/shared/ui/text-editor/text-editor-utils.ts";

const props = withDefaults(
    defineProps<{
        readonly?: boolean;
    }>(),
    {
        readonly: false,
    },
);

const model = defineModel<string>({
    default: "",
});

let lastEmittedHtml = model.value;
const imageInput = ref<HTMLInputElement | null>(null);

const editor = useEditor({
    content: model.value,

    editable: !props.readonly,

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

watch(
    () => props.readonly,
    (readonly) => {
        if (!editor.value) return;

        editor.value.setEditable(!readonly, false);
    },
);

function getPositionAtCoords(left: number, top: number) {
    return editor.value?.view.posAtCoords({ left, top })?.pos;
}

function focus(position: FocusPosition = "end") {
    editor.value?.commands.focus(position);
}

defineExpose({ getPositionAtCoords, focus });

function handleToggleLink() {
    if (!editor.value) return;

    toggleLink(editor.value);
}

function handleInsertTable() {
    editor.value?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
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
    <div v-if="editor" class="rich-editor" :class="{ 'rich-editor--readonly': props.readonly }">
        <div v-if="!props.readonly" class="rich-editor__toolbar" @mousedown.prevent>
            <div class="rich-editor__toolbar__control">
                <Tooltip>
                    <button
                        type="button"
                        class="rich-editor__toolbar-button"
                        :class="{ 'is-active': editor.isActive('bold') }"
                        aria-label="Жирный текст"
                        @click="editor.chain().focus().toggleBold().run()"
                    >
                        <IconBold :size="18" />
                    </button>
                    <template #content>Жирный</template>
                </Tooltip>
                <Tooltip>
                    <button
                        type="button"
                        class="rich-editor__toolbar-button"
                        :class="{ 'is-active': editor.isActive('italic') }"
                        aria-label="Курсивный текст"
                        @click="editor.chain().focus().toggleItalic().run()"
                    >
                        <IconItalic :size="18" />
                    </button>
                    <template #content>Курсив</template>
                </Tooltip>
                <Tooltip>
                    <button
                        type="button"
                        class="rich-editor__toolbar-button"
                        :class="{ 'is-active': editor.isActive('link') }"
                        aria-label="Ссылка"
                        @click="handleToggleLink"
                    >
                        <IconLink :size="18" />
                    </button>
                    <template #content>Ссылка</template>
                </Tooltip>
                <Tooltip>
                    <button
                        type="button"
                        class="rich-editor__toolbar-button"
                        :class="{ 'is-active': editor.isActive('highlight') }"
                        aria-label="Выделение текста"
                        @click="editor.chain().focus().toggleHighlight().run()"
                    >
                        <IconHighlight :size="18" />
                    </button>
                    <template #content>Выделение текста</template>
                </Tooltip>
                <Tooltip>
                    <button
                        type="button"
                        class="rich-editor__toolbar-button"
                        :class="{ 'is-active': editor.isActive('bulletList') }"
                        aria-label="Маркированный список"
                        @click="editor.chain().focus().toggleBulletList().run()"
                    >
                        <IconList :size="18" />
                    </button>
                    <template #content>Маркированный список</template>
                </Tooltip>

                <Tooltip>
                    <button
                        type="button"
                        class="rich-editor__toolbar-button"
                        :class="{ 'is-active': editor.isActive('orderedList') }"
                        aria-label="Нумерованный список"
                        @click="editor.chain().focus().toggleOrderedList().run()"
                    >
                        <IconListNumbers :size="18" />
                    </button>
                    <template #content>Нумерованный список</template>
                </Tooltip>
                <Tooltip>
                    <button
                        type="button"
                        class="rich-editor__toolbar-button"
                        :class="{ 'is-active': editor?.isActive('taskList') }"
                        aria-label="Чек-лист"
                        @click="editor?.chain().focus().toggleTaskList().run()"
                    >
                        <IconCheckbox :size="18" />
                    </button>
                    <template #content>Чек-лист</template>
                </Tooltip>
                <Tooltip>
                    <button
                        disabled
                        type="button"
                        class="rich-editor__toolbar-button"
                        :class="{ 'is-active': editor.isActive('image') }"
                        aria-label="Вставить изображение"
                        @click="handleOpenImagePicker"
                    >
                        <IconPhoto :size="18" />
                    </button>
                    <template #content>Вставить изображение</template>
                </Tooltip>

                <input
                    disabled
                    ref="imageInput"
                    type="file"
                    accept="image/*"
                    hidden
                    @change="handleImageChange"
                />
                <Tooltip>
                    <button
                        type="button"
                        class="rich-editor__toolbar-button"
                        :class="{ 'is-active': editor.isActive('blockquote') }"
                        aria-label="Цитата"
                        @click="editor.chain().focus().toggleBlockquote().run()"
                    >
                        <IconBlockquote :size="18" />
                    </button>
                    <template #content>Цитата</template>
                </Tooltip>

                <Tooltip>
                    <button
                        type="button"
                        class="rich-editor__toolbar-button"
                        :class="{ 'is-active': editor.isActive('code') }"
                        aria-label="Код"
                        @click="editor.chain().focus().toggleCode().run()"
                    >
                        <IconCode :size="18" />
                    </button>
                    <template #content>Код</template>
                </Tooltip>

                <Tooltip>
                    <button
                        type="button"
                        class="rich-editor__toolbar-button"
                        :class="{ 'is-active': editor.isActive('codeBlock') }"
                        aria-label="Блок кода"
                        @click="editor.chain().focus().toggleCodeBlock().run()"
                    >
                        <IconCodeDots :size="18" />
                    </button>
                    <template #content>Блок кода</template>
                </Tooltip>

                <Tooltip>
                    <button
                        type="button"
                        class="rich-editor__toolbar-button"
                        aria-label="Горизонтальная линия"
                        @click="editor.chain().focus().setHorizontalRule().run()"
                    >
                        <IconSeparatorHorizontal :size="18" />
                    </button>
                    <template #content>Горизонтальная линия</template>
                </Tooltip>

                <Tooltip>
                    <button
                        type="button"
                        class="rich-editor__toolbar-button"
                        :class="{ 'is-active': editor.isActive('table') }"
                        aria-label="Вставить таблицу"
                        :disabled="editor.isActive('table')"
                        @click="handleInsertTable"
                    >
                        <IconTablePlus :size="18" />
                    </button>
                    <template #content>Вставить таблицу</template>
                </Tooltip>

                <div
                    v-if="editor.isActive('table')"
                    class="rich-editor__toolbar-group"
                    role="group"
                    aria-label="Работа с таблицей"
                >
                    <Tooltip>
                        <button
                            type="button"
                            class="rich-editor__toolbar-button"
                            aria-label="Добавить строку"
                            @click="editor.chain().focus().addRowAfter().run()"
                        >
                            <IconRowInsertBottom :size="18" />
                        </button>
                        <template #content>Добавить строку</template>
                    </Tooltip>
                    <Tooltip>
                        <button
                            type="button"
                            class="rich-editor__toolbar-button"
                            aria-label="Удалить строку"
                            @click="editor.chain().focus().deleteRow().run()"
                        >
                            <IconRowRemove :size="18" />
                        </button>
                        <template #content>Удалить строку</template>
                    </Tooltip>
                    <Tooltip>
                        <button
                            type="button"
                            class="rich-editor__toolbar-button"
                            aria-label="Добавить столбец"
                            @click="editor.chain().focus().addColumnAfter().run()"
                        >
                            <IconColumnInsertRight :size="18" />
                        </button>
                        <template #content>Добавить столбец</template>
                    </Tooltip>
                    <Tooltip>
                        <button
                            type="button"
                            class="rich-editor__toolbar-button"
                            aria-label="Удалить столбец"
                            @click="editor.chain().focus().deleteColumn().run()"
                        >
                            <IconColumnRemove :size="18" />
                        </button>
                        <template #content>Удалить столбец</template>
                    </Tooltip>
                    <Tooltip>
                        <button
                            type="button"
                            class="rich-editor__toolbar-button"
                            aria-label="Объединить ячейки"
                            :disabled="!editor.can().mergeCells()"
                            @click="editor.chain().focus().mergeCells().run()"
                        >
                            <IconArrowMergeBoth :size="18" />
                        </button>
                        <template #content>Объединить ячейки</template>
                    </Tooltip>
                    <Tooltip>
                        <button
                            type="button"
                            class="rich-editor__toolbar-button"
                            aria-label="Разделить ячейку"
                            :disabled="!editor.can().splitCell()"
                            @click="editor.chain().focus().splitCell().run()"
                        >
                            <IconArrowsSplit2 :size="18" />
                        </button>
                        <template #content>Разделить ячейку</template>
                    </Tooltip>
                    <Tooltip>
                        <button
                            type="button"
                            class="rich-editor__toolbar-button"
                            aria-label="Удалить таблицу"
                            @click="editor.chain().focus().deleteTable().run()"
                        >
                            <IconTableMinus :size="18" />
                        </button>
                        <template #content>Удалить таблицу</template>
                    </Tooltip>
                </div>
            </div>

            <div
                :class="{
                    'character-count': true,
                    'character-count--warning': characterCount >= CHARACTER_LIMIT,
                }"
            >
                <svg height="20" width="20" viewBox="0 0 20 20">
                    <circle r="10" cx="10" cy="10" fill="#f4bfc9" />

                    <circle
                        r="5"
                        cx="10"
                        cy="10"
                        fill="transparent"
                        stroke="#d82e5a"
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
        overflow: auto;
        top: 0;
        gap: var(--space-2);
        z-index: var(--z-sticky);
        width: 100%;
        padding: var(--space-2);
        background-color: var(--color-bg-elevated);
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
        transition:
            background-color var(--transition-fast),
            border-color var(--transition-fast);

        &:hover:not(:disabled) {
            background-color: var(--color-bg-hover);
        }

        &:disabled {
            cursor: not-allowed;
            opacity: 0.6;
        }

        &.is-active {
            border-color: var(--color-accent);
        }
    }

    &__toolbar-group {
        display: flex;
        align-items: center;
        gap: var(--space-1);
        padding: 2px var(--space-1);
        border: 1px solid var(--color-border-accent);
        border-radius: var(--radius-sm);
        background-color: var(--color-bg-accent-subtle);
    }

    &__content {
        border-left: 1px solid var(--color-border);
        border-right: 1px solid var(--color-border);
        border-bottom: 1px solid var(--color-border);
        background-color: var(--color-bg-surface);
    }

    &--readonly &__content {
        border: none;
        background-color: transparent;
    }

    :deep(.tiptap) {
        min-height: 160px;
        padding: var(--space-4);
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
            color: var(--color-bg-surface);
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
            white-space: break-spaces;
            padding: var(--space-0) var(--space-2);
            border-radius: var(--radius-sm);
            background-color: var(--color-bg-elevated);
            color: var(--color-text-secondary);
        }

        pre {
            background: var(--color-bg-elevated);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-sm);
            padding: var(--space-4);
            overflow-x: auto;

            code {
                background: transparent;
                color: var(--color-text);
                font-family: "JetBrainsMono", monospace;
                font-size: 0.85rem;
                line-height: 1.7;
                white-space: pre;
                padding: 0;
            }

            .hljs-comment,
            .hljs-quote {
                color: #6e7781;
                font-style: italic;
            }

            .hljs-keyword,
            .hljs-selector-tag,
            .hljs-meta .hljs-keyword {
                color: #cf222e;
            }

            .hljs-string,
            .hljs-regexp,
            .hljs-meta .hljs-string {
                color: #0a3069;
            }

            .hljs-number,
            .hljs-literal,
            .hljs-attr,
            .hljs-attribute,
            .hljs-variable,
            .hljs-template-variable,
            .hljs-operator,
            .hljs-meta,
            .hljs-selector-attr,
            .hljs-selector-class,
            .hljs-selector-id {
                color: #0550ae;
            }

            .hljs-title,
            .hljs-title.class_,
            .hljs-title.function_ {
                color: #8250df;
            }

            .hljs-type,
            .hljs-bullet,
            .hljs-params {
                color: #953800;
            }

            .hljs-built_in,
            .hljs-symbol {
                color: #e36209;
            }

            .hljs-name,
            .hljs-selector-pseudo {
                color: #116329;
            }

            .hljs-section {
                color: #0550ae;
                font-weight: 700;
            }

            .hljs-link {
                color: #0a3069;
                text-decoration: underline;
            }

            .hljs-emphasis {
                font-style: italic;
            }

            .hljs-strong {
                font-weight: 700;
            }
        }

        table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
        }

        th,
        td {
            position: relative;
            min-width: 80px;
            padding: var(--space-2);
            border: 1px solid var(--color-border);
            vertical-align: top;

            p {
                margin: 0;
            }
        }

        th {
            background-color: var(--color-bg-elevated);
            font-weight: var(--font-w-md);
            text-align: left;
        }

        .selectedCell::after {
            content: "";
            position: absolute;
            inset: 0;
            background-color: var(--color-accent);
            opacity: 0.15;
            pointer-events: none;
        }

        hr {
            border: none;
            border-top: 1px solid var(--color-border);
            cursor: pointer;
            margin: var(--space-4) 0;
        }
    }

    &--readonly :deep(.tiptap) {
        min-height: 0;
        padding: 0;
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

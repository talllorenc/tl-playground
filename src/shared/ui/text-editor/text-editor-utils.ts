import type { Editor } from "@tiptap/vue-3";

export function normalizeEditorHtml(html: string) {
    return html === "<p></p>" ? "" : html;
}

export function toggleLink(editor: Editor) {
    if (editor.isActive("link")) {
        editor.chain().focus().unsetLink().run();
        return;
    }

    const href = window.prompt("Введите URL");

    if (!href) return;

    editor.chain().focus().setLink({ href }).run();
}

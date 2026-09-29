import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { TaskList, TaskItem } from "@tiptap/extension-list";
import { createLowlight } from "lowlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Highlight from "@tiptap/extension-highlight";
import { CharacterCount } from "@tiptap/extensions";

import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import json from "highlight.js/lib/languages/json";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import scss from "highlight.js/lib/languages/scss";

const lowlight = createLowlight();
lowlight.register("javascript", javascript);
lowlight.register("typescript", typescript);
lowlight.register("json", json);
lowlight.register("html", xml);
lowlight.register("css", css);
lowlight.register("scss", scss);

export const CHARACTER_LIMIT = 5000;

export const textEditorExtensions = [
    StarterKit.configure({
        codeBlock: false,
    }),

    CodeBlockLowlight.configure({
        lowlight,
    }),

    Highlight.configure({
        multicolor: false,
    }),

    CharacterCount.configure({
        limit: CHARACTER_LIMIT,
    }),

    HorizontalRule,

    Link.configure({
        openOnClick: false,
        markdownLinks: false,
        defaultProtocol: "https",
    }),

    TaskList,

    TaskItem.configure({
        nested: true,
    }),
];

type Modifier = "Meta" | "Control" | "Alt" | "Shift";

export const IS_MAC = /Mac|iPod|iPhone|iPad/.test(navigator.platform);

const MODIFIER_ALIASES: Record<string, Modifier> = {
    $mod: IS_MAC ? "Meta" : "Control",
    meta: "Meta",
    cmd: "Meta",
    control: "Control",
    ctrl: "Control",
    alt: "Alt",
    option: "Alt",
    shift: "Shift",
};

const MODIFIER_LABELS: Record<Modifier, string> = IS_MAC
    ? { Meta: "⌘", Control: "⌃", Alt: "⌥", Shift: "⇧" }
    : { Meta: "Win", Control: "Ctrl", Alt: "Alt", Shift: "Shift" };

interface IParsedShortcut {
    modifiers: Modifier[];
    key: string;
}

function toModifier(part: string): Modifier | undefined {
    return MODIFIER_ALIASES[part] ?? MODIFIER_ALIASES[part.toLowerCase()];
}

function toKeyName(part: string): string {
    const match = /^(?:Key|Digit)(.)$/.exec(part);

    return match?.[1] ?? (part.length === 1 ? part.toUpperCase() : part);
}

function parseShortcut(shortcut: string): IParsedShortcut {
    const parts = shortcut.split("+");
    const key = parts.pop() ?? "";
    const modifiers = parts.map(toModifier).filter((mod) => mod !== undefined);

    return { modifiers, key: toKeyName(key) };
}

export function getShortcutLabel(shortcut: string): string {
    const { modifiers, key } = parseShortcut(shortcut);
    const labels = [...modifiers.map((mod) => MODIFIER_LABELS[mod]), key];

    return labels.join(IS_MAC ? "" : "+");
}

export function getAriaKeyshortcuts(shortcut: string): string {
    const { modifiers, key } = parseShortcut(shortcut);

    return [...modifiers, key].join("+");
}

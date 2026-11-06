import { getCurrentScope, onScopeDispose, unref, watchEffect, type MaybeRef } from "vue";
import { tinykeys } from "tinykeys";

interface IHotkeyOptions {
    global?: boolean;
    target?: MaybeRef<HTMLElement | null>;
    preventDefault?: boolean;
    allowInInputs?: boolean;
    enabled?: MaybeRef<boolean>;
}

function isEditable(target: EventTarget | null) {
    if (!(target instanceof HTMLElement)) return false;

    return target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
}

export function handleKey(
    keys: string | string[],
    handler: (event: KeyboardEvent) => void,
    options: IHotkeyOptions = {},
) {
    const {
        global = true,
        target,
        preventDefault = true,
        allowInInputs = false,
        enabled = true,
    } = options;

    const list = Array.isArray(keys) ? keys : [keys];
    const bindings = Object.fromEntries(
        list.map((key) => [
            key,
            (event: KeyboardEvent) => {
                if (!unref(enabled)) return;
                if (preventDefault) event.preventDefault();
                handler(event);
            },
        ]),
    );

    function ignore(event: KeyboardEvent) {
        return (
            event.repeat ||
            event.isComposing ||
            event.defaultPrevented ||
            (!allowInInputs && isEditable(event.target))
        );
    }

    let unbindKeys: (() => void) | undefined;

    function unbind() {
        unbindKeys?.();
        unbindKeys = undefined;
    }

    const stopWatch = watchEffect(() => {
        unbind();

        const element = global ? window : unref(target);

        if (!element) return;

        unbindKeys = tinykeys(element, bindings, { ignore });
    });

    function stop() {
        stopWatch();
        unbind();
    }

    if (getCurrentScope()) onScopeDispose(stop);

    return stop;
}

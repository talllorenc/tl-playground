import { onBeforeUnmount, toValue, watch, type MaybeRefOrGetter } from "vue";

export function useEscapeKey(callback: () => void, enabled: MaybeRefOrGetter<boolean> = true) {
    const listener = (event: KeyboardEvent) => {
        if (event.key !== "Escape" || !toValue(enabled)) {
            return;
        }

        callback();
    };

    const stop = () => document.removeEventListener("keydown", listener);

    watch(
        () => toValue(enabled),
        (isEnabled) => {
            if (isEnabled) {
                document.addEventListener("keydown", listener);
            } else {
                stop();
            }
        },
        { immediate: true },
    );

    onBeforeUnmount(stop);
}

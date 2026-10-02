import { onBeforeUnmount, toValue, watch, type MaybeRefOrGetter, type Ref } from "vue";

export function useClickOutside(
    elementRef: Ref<HTMLElement | null>,
    callback: () => void,
    enabled: MaybeRefOrGetter<boolean> = true,
) {
    const listener = (event: MouseEvent) => {
        const element = elementRef.value;

        if (!element) {
            return;
        }

        if (element.contains(event.target as Node)) {
            return;
        }

        callback();
    };

    const stop = () => document.removeEventListener("click", listener, true);

    watch(
        () => toValue(enabled),
        (isEnabled) => {
            if (isEnabled) {
                document.addEventListener("click", listener, true);
            } else {
                stop();
            }
        },
        { immediate: true },
    );

    onBeforeUnmount(stop);
}

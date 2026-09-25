import { onBeforeUnmount, onMounted, type Ref } from "vue";

export function useClickOutside(elementRef: Ref<HTMLElement | null>, callback: () => void) {
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

    onMounted(() => {
        document.addEventListener("click", listener, true);
    });

    onBeforeUnmount(() => {
        document.removeEventListener("click", listener, true);
    });
}

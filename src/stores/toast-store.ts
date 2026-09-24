import { defineStore } from "pinia";
import { ref } from "vue";

export type ToastActionVariant = "success" | "error";

export interface IToast {
    id: string;
    title: string;
    message: string;
    variant: ToastActionVariant;
}

const MAX_TOASTS = 3;
const TOAST_DURATION = 5000;

export const useToastStore = defineStore("toast", () => {
    const toasts = ref<IToast[]>([]);
    const timers = new Map<string, ReturnType<typeof setTimeout>>();

    function openToast(toast: Omit<IToast, "id">) {
        const newToast: IToast = {
            id: crypto.randomUUID(),
            ...toast,
        };

        toasts.value.push(newToast);

        if (toasts.value.length > MAX_TOASTS) {
            const removedToast = toasts.value.shift();

            if (removedToast) {
                clearToastTimer(removedToast.id);
            }
        }

        const timer = setTimeout(() => {
            closeToast(newToast.id);
        }, TOAST_DURATION);

        timers.set(newToast.id, timer);
    }

    function closeToast(id: string) {
        toasts.value = toasts.value.filter((toast) => toast.id !== id);

        clearToastTimer(id);
    }

    function clearToastTimer(id: string) {
        const timer = timers.get(id);

        if (!timer) {
            return;
        }

        clearTimeout(timer);
        timers.delete(id);
    }

    return {
        openToast,
        closeToast,
        toasts,
    };
});

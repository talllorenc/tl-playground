import { defineStore } from "pinia";
import { ref } from "vue";

const MAX_TOASTS = 3;
const TOAST_DURATION = 5000;

export type ToastActionVariant = "success" | "error";

export interface IToast {
    id: string;
    title: string;
    message: string;
    variant: ToastActionVariant;
}

export interface IToastTimer {
    timeoutId: ReturnType<typeof setTimeout> | null;
    startedAt: number;
    remaining: number;
}

export const useToastStore = defineStore("toast", () => {
    const toasts = ref<IToast[]>([]);
    const timers = new Map<string, IToastTimer>();

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

        timers.set(newToast.id, {
            timeoutId: null,
            startedAt: 0,
            remaining: TOAST_DURATION,
        });

        startToastTimer(newToast.id);
    }

    function closeToast(id: string) {
        toasts.value = toasts.value.filter((toast) => toast.id !== id);

        clearToastTimer(id);
    }

    function pauseToast(id: string) {
        const timer = timers.get(id);

        if (!timer || timer.timeoutId === null) {
            return;
        }

        clearTimeout(timer.timeoutId);
        timer.timeoutId = null;
        timer.remaining -= Date.now() - timer.startedAt;
    }

    function resumeToast(id: string) {
        const timer = timers.get(id);

        if (!timer || timer.timeoutId !== null) {
            return;
        }

        startToastTimer(id);
    }

    function startToastTimer(id: string) {
        const timer = timers.get(id);

        if (!timer) {
            return;
        }

        timer.startedAt = Date.now();
        timer.timeoutId = setTimeout(() => {
            closeToast(id);
        }, timer.remaining);
    }

    function clearToastTimer(id: string) {
        const timer = timers.get(id);

        if (!timer) {
            return;
        }

        if (timer.timeoutId !== null) {
            clearTimeout(timer.timeoutId);
        }

        timers.delete(id);
    }

    return {
        openToast,
        closeToast,
        pauseToast,
        resumeToast,
        toasts,
    };
});

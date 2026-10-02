import { useToastStore } from "@/stores/toast-store.ts";

export async function copyToClipboard(text: string, successMessage = "Скопировано") {
    const toast = useToastStore();

    try {
        await navigator.clipboard.writeText(text);
        toast.openToast({ title: "Скопировано", message: successMessage, variant: "success" });
    } catch {
        toast.openToast({
            title: "Ошибка",
            message: "Не удалось скопировать",
            variant: "error",
        });
    }
}

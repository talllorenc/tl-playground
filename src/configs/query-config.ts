import { MutationCache, QueryCache, QueryClient } from "@tanstack/vue-query";
import { sentryCaptureApiError } from "@/utils/sentry-capture-api-error.ts";
import { useToastStore, type IToast } from "@/stores/toast-store.ts";

declare module "@tanstack/vue-query" {
    interface Register {
        mutationMeta: {
            errorMessage?: string;
            successToast?: Pick<IToast, "title" | "message">;
        };
    }
}

export const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error, query) => {
            sentryCaptureApiError(error, JSON.stringify(query.queryKey));
        },
    }),

    mutationCache: new MutationCache({
        onError: (error, _variables, _context, mutation) => {
            sentryCaptureApiError(
                error,
                JSON.stringify(mutation.options.mutationKey ?? "mutation"),
            );

            if (mutation.meta?.errorMessage) {
                useToastStore().openToast({
                    title: "Ошибка",
                    message: mutation.meta.errorMessage,
                    variant: "error",
                });
            }
        },

        onSuccess: (_data, _variables, _context, mutation) => {
            if (mutation.meta?.successToast) {
                useToastStore().openToast({
                    ...mutation.meta.successToast,
                    variant: "success",
                });
            }
        },
    }),

    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
});

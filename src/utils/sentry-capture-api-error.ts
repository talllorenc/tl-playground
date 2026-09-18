import * as Sentry from "@sentry/vue";

export function sentryCaptureApiError(error: unknown, operation: string) {
    Sentry.captureException(error, {
        tags: {
            operation,
        },
    });
}

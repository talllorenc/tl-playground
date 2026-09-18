import * as Sentry from "@sentry/vue";
import type { App } from "vue";

export function initSentry(app: App) {
    Sentry.init({
        app,
        dsn: import.meta.env.VITE_SENTRY_DSN,
        dataCollection: {
            // userInfo: false,
            // httpBodies: [],
        },
    });
}

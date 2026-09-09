import "@/style.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import { createPinia } from "pinia";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { initSentry } from "@/configs/sentry-config.ts";
import { queryClient } from "@/configs/query-config.ts";

const app = createApp(App);
const pinia = createPinia();

initSentry(app);

app.use(pinia);
app.use(router);
app.use(VueQueryPlugin, {
    queryClient,
});

app.mount("#app");

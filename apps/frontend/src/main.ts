import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import { createPinia } from "pinia";
import { VueQueryPlugin, QueryClient } from "@tanstack/vue-query";
import "@/style.css";

const pinia = createPinia();
const queryClient = new QueryClient();

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(VueQueryPlugin, {
    queryClient,
});

app.mount("#app");

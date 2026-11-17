import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/router/routes.ts";

const APP_NAME = "TL Playground";

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.afterEach((to) => {
    document.title = to.meta.title ? `${to.meta.title} · ${APP_NAME}` : APP_NAME;
});

export default router;

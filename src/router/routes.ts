import type { RouteRecordRaw } from "vue-router";

declare module "vue-router" {
    interface RouteMeta {
        title?: string;
        breadcrumb?: string;
    }
}

export const HOME_ROUTE_NAME = "home";

export const pageRoutes: RouteRecordRaw[] = [
    {
        path: "",
        name: HOME_ROUTE_NAME,
        component: () => import("@/views/HomeView.vue"),
        meta: { title: "Главная", breadcrumb: "Главная" },
    },
    {
        path: "/kanban",
        name: "kanban",
        component: () => import("@/views/KanbanView.vue"),
        meta: { title: "Канбан доска", breadcrumb: "Канбан" },
    },
];

export const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: () => import("@/layouts/DefaultLayout.vue"),
        children: pageRoutes,
    },
];

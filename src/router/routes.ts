import type { RouteRecordInfo, RouteRecordRaw } from "vue-router";

declare module "vue-router" {
    interface RouteMeta {
        title?: string;
        breadcrumb?: string;
    }

    interface TypesConfig {
        RouteNamedMap: {
            home: RouteRecordInfo<"home", "/">;
            kanban: RouteRecordInfo<"kanban", "/kanban">;
            account: RouteRecordInfo<"account", "/account">;
        };
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
    {
        path: "/account",
        name: "account",
        component: () => import("@/views/AccountView.vue"),
        meta: { title: "Аккаунт", breadcrumb: "Аккаунт" },
    },
];

export const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: () => import("@/layouts/DefaultLayout.vue"),
        children: pageRoutes,
    },
];

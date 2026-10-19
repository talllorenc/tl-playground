import { IconHome, IconLayoutColumns } from "@tabler/icons-vue";
import type { ISidebarLink } from "@/layouts/components/sidebar/sidebar.types.ts";

export const SIDEBAR_LINKS: ISidebarLink[] = [
    {
        id: "home",
        label: "Главная",
        to: "/",
        icon: IconHome,
    },
    {
        id: "kanban",
        label: "Канбан",
        to: "/kanban",
        icon: IconLayoutColumns,
    },
];

import { IconHome, IconLayoutColumns } from "@tabler/icons-vue";
import type { ISidebarSection } from "@/layouts/components/sidebar/sidebar.types.ts";

export const SIDEBAR_SECTIONS: ISidebarSection[] = [
    {
        id: "workspace",
        title: "Рабочая область",
        links: [
            {
                id: "home",
                label: "Главная",
                to: { name: "home" },
                icon: IconHome,
            },
            {
                id: "kanban",
                label: "Доска",
                to: { name: "kanban" },
                icon: IconLayoutColumns,
            },
        ],
    },
    {
        id: "help",
        title: "Вспомогательные разделы",
        links: [],
    },
    {
        id: "settings",
        title: "Настройки",
        links: [],
    },
];

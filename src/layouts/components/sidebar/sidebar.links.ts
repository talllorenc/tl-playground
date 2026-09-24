export interface ISidebarLinks {
    label: string;
    to: string;
}

export const sidebarLinks: ISidebarLinks[] = [
    { label: "Главная", to: "/" },
    { label: "Канбан", to: "/kanban" },
];

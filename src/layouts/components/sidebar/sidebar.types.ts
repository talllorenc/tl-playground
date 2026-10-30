import type { Component } from "vue";
import type { RouteLocationRaw } from "vue-router";

export type SidebarSectionId = "workspace" | "help" | "settings";

export interface ISidebarLink {
    id: string;
    label: string;
    to: RouteLocationRaw;
    icon: Component;
    disabled?: boolean;
}

export interface ISidebarSection {
    id: SidebarSectionId;
    title: string;
    links: ISidebarLink[];
}

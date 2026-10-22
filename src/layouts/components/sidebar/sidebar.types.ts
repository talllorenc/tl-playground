import type { Component } from "vue";
import type { RouteLocationRaw } from "vue-router";

export interface ISidebarLink {
    id: string;
    label: string;
    to: RouteLocationRaw;
    icon: Component;
    disabled?: boolean;
}

import type { Component } from "vue";

export interface ISidebarLink {
    id: string;
    label: string;
    to: string;
    icon: Component;
    disabled?: boolean;
}

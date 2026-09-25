import type { Component } from "vue";

export interface IActionsMenuItem {
    label: string;
    icon?: Component;
    indicator?: string;
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
}

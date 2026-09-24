import type { Component } from "vue";

export interface IActionsMenuItem {
    label: string;
    icon?: Component;
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
}

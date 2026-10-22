import type { Component } from "vue";

export interface IActionsMenuItem {
    label: string;
    icon?: Component;
    indicator?: string;
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
}

export interface IActionsMenuTriggerProps {
    id: string;
    "aria-expanded": boolean;
    "aria-controls": string | undefined;
    onClick: (event: MouseEvent) => void;
}

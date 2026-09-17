import { defineStore } from "pinia";
import { ref } from "vue";
import type { Component } from "vue";

export type ModalActionVariant = "primary" | "danger";

export interface IModalAction {
    label: string;
    onClick: () => void;
    variant?: ModalActionVariant;
    disabled?: boolean;
    loading?: boolean;
    icon?: Component;
}

export interface IModalOptions {
    title: string;
    body?: string;
    actions?: IModalAction[];
}

export const useModalStore = defineStore("modal", () => {
    const isModalOpen = ref<boolean>(false);
    const options = ref<IModalOptions | null>(null);

    function openModal(modalOptions: IModalOptions) {
        options.value = modalOptions;
        isModalOpen.value = true;
    }

    function closeModal() {
        isModalOpen.value = false;
        options.value = null;
    }

    return {
        isModalOpen,
        openModal,
        closeModal,
        options,
    };
});

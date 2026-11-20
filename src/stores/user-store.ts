import { defineStore } from "pinia";
import { ref } from "vue";

export interface IUser {
    fullName: string;
    accountType: string;
    avatarUrl: string;
}

const MOCK_USER: IUser = {
    fullName: "Alexandr Boyarchuk",
    accountType: "Личный аккаунт",
    avatarUrl: "/images/avatar-placeholder.svg",
};

export const useUserStore = defineStore("user", () => {
    const user = ref<IUser>(MOCK_USER);

    return { user };
});

<script setup lang="ts">
import { IconSelector, IconUser } from "@tabler/icons-vue";
import ActionsMenu from "@/shared/ui/actions-menu/ActionsMenu.vue";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user-store.ts";

const router = useRouter();
const { user } = storeToRefs(useUserStore());

const actions = computed(() => [
    {
        label: "Аккаунт",
        icon: IconUser,
        onClick: () => router.push("/account"),
    },
]);
</script>

<template>
    <div class="auth-box">
        <img class="auth-box__image" :src="user.avatarUrl" alt="" />
        <div class="auth-box__personal-info">
            <span class="auth-box__fullname">{{ user.fullName }}</span>
            <span class="auth-box__account">{{ user.accountType }}</span>
        </div>

        <ActionsMenu :items="actions">
            <template #trigger="{ props: triggerProps }">
                <button
                    v-bind="triggerProps"
                    class="auth-box__actions"
                    type="button"
                    aria-label="Меню аккаунта"
                >
                    <IconSelector class="auth-box__icon" :size="18" aria-hidden="true" />
                </button>
            </template>
        </ActionsMenu>
    </div>
</template>

<style scoped lang="scss">
.auth-box {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    width: fit-content;
    border-bottom: 1px solid var(--color-border);
    color: var(--color-text);
    padding-bottom: var(--space-2);

    &__image {
        width: 40px;
        height: 40px;
        border-radius: var(--radius-full);
        object-fit: cover;
        border: 1px solid var(--color-border);
    }

    &__personal-info {
        display: flex;
        flex-direction: column;
    }

    &__fullname {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        font-size: var(--font-sm);
        font-weight: var(--font-w-md);
    }

    &__account {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        font-size: var(--font-sm);
        color: var(--color-text-secondary);
    }

    &__actions {
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--size-icon-button);
        height: var(--size-icon-button);
        padding: 0;
        border: 0;
        border-radius: var(--radius-sm);
        color: var(--color-text);
        cursor: pointer;
        transition: background-color var(--transition-fast);

        &:hover {
            background-color: var(--color-bg-hover);
        }
    }
}
</style>

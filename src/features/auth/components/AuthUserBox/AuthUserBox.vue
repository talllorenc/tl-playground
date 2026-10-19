<script setup lang="ts">
import { IconSelector, IconUser } from "@tabler/icons-vue";
import ActionsMenu from "@/shared/ui/actions-menu/ActionsMenu.vue";
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

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
        <img
            class="auth-box__image"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEJhoas0OgqBfmHKHYCZ-r0l_ZQzVJiUZeqTzhwUFnW_gBGAKohBG-C7w&s=10"
            alt="mock user image"
        />
        <div class="auth-box__personal-info">
            <span class="auth-box__fullname">Alexandr Boyarchuk</span>
            <span class="auth-box__account">Личный аккаунт</span>
        </div>

        <ActionsMenu :items="actions">
            <template #trigger>
                <button class="auth-box__actions" type="button">
                    <IconSelector class="auth-box__icon" :size="18" />
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
        width: 28px;
        height: 28px;
        padding: 0;
        border: 0;
        border-radius: var(--radius-sm);
        color: var(--color-text);
        cursor: pointer;

        &:hover {
            background-color: var(--color-bg-secondary);
        }
    }
}
</style>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user-store.ts";

const { user } = storeToRefs(useUserStore());
</script>

<template>
    <section class="account-info" aria-label="Информация об аккаунте">
        <figure class="account-info__header">
            <!-- alt="": the caption with the name describes the avatar -->
            <img class="account-info__image" :src="user.avatarUrl" alt="" />
            <figcaption>
                <p class="account-info__username">{{ user.fullName }}</p>
                <p>{{ user.accountType }}</p>
            </figcaption>
        </figure>
    </section>
</template>

<style scoped lang="scss">
.account-info {
    width: 100%;

    &__header {
        display: flex;
        align-items: end;
        gap: var(--space-4);
    }

    &__image {
        width: 140px;
        height: 140px;
        border-radius: var(--radius-xl);
        object-fit: cover;
        border: 1px solid var(--color-border);
    }

    &__username {
        font-weight: var(--font-w-lg);
        font-size: var(--font-h2);
    }
}
</style>

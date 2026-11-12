<script setup lang="ts"></script>

<template>
    <section class="account-info" aria-label="Информация об аккаунте">
        <figure class="account-info__header">
            <img
                class="account-info__image"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEJhoas0OgqBfmHKHYCZ-r0l_ZQzVJiUZeqTzhwUFnW_gBGAKohBG-C7w&s=10"
                alt="mock user image"
            />
            <div>
                <p class="account-info__username">Test User</p>
                <p>Личный аккаунт</p>
            </div>
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

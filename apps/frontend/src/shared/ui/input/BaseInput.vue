<script setup lang="ts">
const props = defineProps<{
    modelValue: string;
    error?: string;
}>();

const emit = defineEmits<{
    "update:modelValue": [value: string];
}>();

function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;

    emit("update:modelValue", target.value);
}
</script>

<template>
    <div class="input">
        <input
            class="input__field"
            :class="{ 'input__field--error': props.error }"
            v-bind="$attrs"
            :value="props.modelValue"
            @input="handleInput"
        />

        <span v-if="props.error" class="input__error">
            {{ props.error }}
        </span>
    </div>
</template>

<style scoped lang="scss">
.input {
    display: flex;
    flex-direction: column;
    gap: 4px;

    &__field {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid var(--color-border);
        background-color: transparent;
        border-radius: var(--radius-md);
        font-family: inherit;
        color: var(--color-black);
        outline: none;

        &::placeholder {
            color: var(--color-text-secondary);
        }

        &:focus {
            border-color: var(--color-accent);
        }

        &:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }

        &--error {
            border-color: var(--color-border-error);
        }
    }

    &__error {
        color: var(--color-text-error);
        font-size: var(--font-xs);
    }
}
</style>

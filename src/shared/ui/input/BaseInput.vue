<script setup lang="ts">
import { onMounted, ref } from "vue";

const input = ref<HTMLInputElement | null>(null);

const props = withDefaults(
    defineProps<{
        modelValue: string;
        error?: string;
        autofocus?: boolean;
    }>(),
    {
        autofocus: false,
    },
);

const emit = defineEmits<{
    "update:modelValue": [value: string];
}>();

function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;

    emit("update:modelValue", target.value);
}

onMounted(() => {
    if (props.autofocus) {
        input.value?.focus();
    }
});
</script>

<template>
    <div class="input">
        <input
            ref="input"
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
    gap: var(--space-1);

    &__field {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid var(--color-border);
        background-color: transparent;
        border-radius: var(--radius-sm);
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
            border-color: var(--color-error);
        }
    }

    &__error {
        color: var(--color-error);
        font-size: var(--font-xs);
    }
}
</style>

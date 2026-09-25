<script lang="ts" setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { useKanbanCardCreate } from "@/features/kanban/hooks/useKanbanCardCreate.ts";
import {
    createCardSchema,
    type CreateCardFormValues,
} from "@/features/kanban/schemas/kanban-card-schema.ts";
import BaseInput from "@/shared/ui/input/BaseInput.vue";
import Button from "@/shared/ui/button/Button.vue";

const props = defineProps<{
    columnId: number;
}>();

const emit = defineEmits<{
    "card-created": [];
}>();

const { mutate, isPending } = useKanbanCardCreate();

const { errors, defineField, handleSubmit } = useForm<CreateCardFormValues>({
    validationSchema: toTypedSchema(createCardSchema),
    initialValues: {
        title: "",
    },
});

const [title, titleAttrs] = defineField("title");

const onSubmit = handleSubmit((values) => {
    mutate(
        {
            title: values.title,
            columnId: props.columnId,
        },
        {
            onSuccess: () => {
                emit("card-created");
            },
        },
    );
});
</script>

<template>
    <form class="kanban-form-card" @submit="onSubmit">
        <BaseInput
            v-model="title"
            v-bind="titleAttrs"
            :error="errors.title"
            :autofocus="true"
            placeholder="Проектирование интерфейса"
        />

        <Button type="submit" :loading="isPending" :disabled="!!errors.title">Создать</Button>
    </form>
</template>

<style scoped lang="scss">
.kanban-form-card {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    background-color: var(--color-white);
    padding: 12px;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
}
</style>

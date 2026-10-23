<script setup lang="ts">
import { useToastStore } from "@/stores/toast-store.ts";
import Modal from "@/shared/ui/modal/Modal.vue";
import { ref } from "vue";
import Button from "@/shared/ui/button/Button.vue";
import Tooltip from "@/shared/ui/tooltip/Tooltip.vue";

const handleOpen = () => {
    useToastStore().openToast({
        title: "Ошибка",
        message: "Произошла ошибка при обновлении данных",
        variant: "error",
    });
};

const handleOpen2 = () => {
    useToastStore().openToast({
        title: "Успех",
        message: "Данные успешно обновлены",
        variant: "success",
    });
};

const isModalOpen = ref<boolean>(false);
</script>

<template>
    <Tooltip>
        <Button> tooltip </Button>
        <template #content>
            <span>Tooltip</span>
        </template>
    </Tooltip>
    <Button @click="handleOpen2"> success </Button>
    <Button @click="handleOpen"> error </Button>
    <Button @click="isModalOpen = true"> modal </Button>
    <Modal v-model:open="isModalOpen" title="Модальное окно">
        Детальное описание модального окна!
    </Modal>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur blanditiis cum deserunt
    expedita fugiat iure quod repellendus tempora ullam vero! Assumenda consectetur doloribus eius
    est nobis unde! Architecto maiores, pariatur! Lorem ipsum dolor sit amet, consectetur
    adipisicing elit. Aspernatur blanditiis cum deserunt expedita fugiat iure quod repellendus
    tempora ullam vero! Assumenda consectetur doloribus eius est nobis unde! Architecto maiores,
    pariatur! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur blanditiis cum
    deserunt expedita fugiat iure quod repellendus tempora ullam vero! Assumenda consectetur
    doloribus eius est nobis unde! Architecto maiores, pariatur! Lorem ipsum dolor sit amet,
    consectetur adipisicing elit. Aspernatur blanditiis cum deserunt expedita fugiat iure quod
    repellendus tempora ullam vero! Assumenda consectetur doloribus eius est nobis unde! Architecto
    maiores, pariatur! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
    blanditiis cum deserunt expedita fugiat iure quod repellendus tempora ullam vero! Assumenda
    consectetur doloribus eius est nobis unde! Architecto maiores, pariatur! Lorem ipsum dolor sit
    amet, consectetur adipisicing elit. Aspernatur blanditiis cum deserunt expedita fugiat iure quod
    repellendus tempora ullam vero! Assumenda consectetur doloribus eius est nobis unde! Architecto
    maiores, pariatur! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
    blanditiis cum deserunt expedita fugiat iure quod repellendus tempora ullam vero! Assumenda
    consectetur doloribus eius est nobis unde! Architecto maiores, pariatur! Lorem ipsum dolor sit
    amet, consectetur adipisicing elit. Aspernatur blanditiis cum deserunt expedita fugiat iure quod
    repellendus tempora ullam vero! Assumenda consectetur doloribus eius est nobis unde! Architecto
    maiores, pariatur! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
    blanditiis cum deserunt expedita fugiat iure quod repellendus tempora ullam vero! Assumenda
    consectetur doloribus eius est nobis unde! Architecto maiores, pariatur! Lorem ipsum dolor sit
    amet, consectetur adipisicing elit. Aspernatur blanditiis cum deserunt expedita fugiat iure quod
    repellendus tempora ullam vero! Assumenda consectetur doloribus eius est nobis unde! Architecto
    maiores, pariatur! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
    blanditiis cum deserunt expedita fugiat iure quod repellendus tempora ullam vero! Assumenda
    consectetur doloribus eius est nobis unde! Architecto maiores, pariatur! Lorem ipsum dolor sit
    amet, consectetur adipisicing elit. Aspernatur blanditiis cum deserunt expedita fugiat iure quod
    repellendus tempora ullam vero! Assumenda consectetur doloribus eius est nobis unde! Architecto
    maiores, pariatur! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
    blanditiis cum deserunt expedita fugiat iure quod repellendus tempora ullam vero! Assumenda
    consectetur doloribus eius est nobis unde! Architecto maiores, pariatur! Lorem ipsum dolor sit
    amet, consectetur adipisicing elit. Aspernatur blanditiis cum deserunt expedita fugiat iure quod
    repellendus tempora ullam vero! Assumenda consectetur doloribus eius est nobis unde! Architecto
    maiores, pariatur! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
    blanditiis cum deserunt expedita fugiat iure quod repellendus tempora ullam vero! Assumenda
    consectetur doloribus eius est nobis unde! Architecto maiores, pariatur! Lorem ipsum dolor sit
    amet, consectetur adipisicing elit. Aspernatur blanditiis cum deserunt expedita fugiat iure quod
    repellendus tempora ullam vero! Assumenda consectetur doloribus eius est nobis unde! Architecto
    maiores, pariatur! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
    blanditiis cum deserunt expedita fugiat iure quod repellendus tempora ullam vero! Assumenda
    consectetur doloribus eius est nobis unde! Architecto maiores, pariatur! Lorem ipsum dolor sit
    amet, consectetur adipisicing elit. Aspernatur blanditiis cum deserunt expedita fugiat iure quod
    repellendus tempora ullam vero! Assumenda consectetur doloribus eius est nobis unde! Architecto
    maiores, pariatur! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
    blanditiis cum deserunt expedita fugiat iure quod repellendus tempora ullam vero! Assumenda
    consectetur doloribus eius est nobis unde! Architecto maiores, pariatur! Lorem ipsum dolor sit
    amet, consectetur adipisicing elit. Aspernatur blanditiis cum deserunt expedita fugiat iure quod
    repellendus tempora ullam vero! Assumenda consectetur doloribus eius est nobis unde! Architecto
    maiores, pariatur! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
    blanditiis cum deserunt expedita fugiat iure quod repellendus tempora ullam vero! Assumenda
    consectetur doloribus eius est nobis unde! Architecto maiores, pariatur! Lorem ipsum dolor sit
    amet, consectetur adipisicing elit. Aspernatur blanditiis cum deserunt expedita fugiat iure quod
    repellendus tempora ullam vero! Assumenda consectetur doloribus eius est nobis unde! Architecto
    maiores, pariatur! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
    blanditiis cum deserunt expedita fugiat iure quod repellendus tempora ullam vero! Assumenda
    consectetur doloribus eius est nobis unde! Architecto maiores, pariatur! Lorem ipsum dolor sit
    amet, consectetur adipisicing elit. Aspernatur blanditiis cum deserunt expedita fugiat iure quod
    repellendus tempora ullam vero! Assumenda consectetur doloribus eius est nobis unde! Architecto
    maiores, pariatur! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
    blanditiis cum deserunt expedita fugiat iure quod repellendus tempora ullam vero! Assumenda
    consectetur doloribus eius est nobis unde! Architecto maiores, pariatur! Lorem ipsum dolor sit
    amet, consectetur adipisicing elit. Aspernatur blanditiis cum deserunt expedita fugiat iure quod
    repellendus tempora ullam vero! Assumenda consectetur doloribus eius est nobis unde! Architecto
    maiores, pariatur! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
    blanditiis cum deserunt expedita fugiat iure quod repellendus tempora ullam vero! Assumenda
    consectetur doloribus eius est nobis unde! Architecto maiores, pariatur! Lorem ipsum dolor sit
    amet, consectetur adipisicing elit. Aspernatur blanditiis cum deserunt expedita fugiat iure quod
    repellendus tempora ullam vero! Assumenda consectetur doloribus eius est nobis unde! Architecto
    maiores, pariatur! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
    blanditiis cum deserunt expedita fugiat iure quod repellendus tempora ullam vero! Assumenda
    consectetur doloribus eius est nobis unde! Architecto maiores, pariatur! Lorem ipsum dolor sit
    amet, consectetur adipisicing elit. Aspernatur blanditiis cum deserunt expedita fugiat iure quod
    repellendus tempora ullam vero! Assumenda consectetur doloribus eius est nobis unde! Architecto
    maiores, pariatur! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
    blanditiis cum deserunt expedita fugiat iure quod repellendus tempora ullam vero! Assumenda
    consectetur doloribus eius est nobis unde! Architecto maiores, pariatur! Lorem ipsum dolor sit
    amet, consectetur adipisicing elit. Aspernatur blanditiis cum deserunt expedita fugiat iure quod
    repellendus tempora ullam vero! Assumenda consectetur doloribus eius est nobis unde! Architecto
    maiores, pariatur! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
    blanditiis cum deserunt expedita fugiat iure quod repellendus tempora ullam vero! Assumenda
    consectetur doloribus eius est nobis unde! Architecto maiores, pariatur! Lorem ipsum dolor sit
    amet, consectetur adipisicing elit. Aspernatur blanditiis cum deserunt expedita fugiat iure quod
    repellendus tempora ullam vero! Assumenda consectetur doloribus eius est nobis unde! Architecto
    maiores, pariatur! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
    blanditiis cum deserunt expedita fugiat iure quod repellendus tempora ullam vero! Assumenda
    consectetur doloribus eius est nobis unde! Architecto maiores, pariatur! Lorem ipsum dolor sit
    amet, consectetur adipisicing elit. Aspernatur blanditiis cum deserunt expedita fugiat iure quod
    repellendus tempora ullam vero! Assumenda consectetur doloribus eius est nobis unde! Architecto
    maiores, pariatur! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
    blanditiis cum deserunt expedita fugiat iure quod repellendus tempora ullam vero! Assumenda
    consectetur doloribus eius est nobis unde! Architecto maiores, pariatur! Lorem ipsum dolor sit
    amet, consectetur adipisicing elit. Aspernatur blanditiis cum deserunt expedita fugiat iure quod
    repellendus tempora ullam vero! Assumenda consectetur doloribus eius est nobis unde! Architecto
    maiores, pariatur! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
    blanditiis cum deserunt expedita fugiat iure quod repellendus tempora ullam vero! Assumenda
    consectetur doloribus eius est nobis unde! Architecto maiores, pariatur! Lorem ipsum dolor sit
    amet, consectetur adipisicing elit. Aspernatur blanditiis cum deserunt expedita fugiat iure quod
    repellendus tempora ullam vero! Assumenda consectetur doloribus eius est nobis unde! Architecto
    maiores, pariatur! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
    blanditiis cum deserunt expedita fugiat iure quod repellendus tempora ullam vero! Assumenda
    consectetur doloribus eius est nobis unde! Architecto maiores, pariatur! Lorem ipsum dolor sit
    amet, consectetur adipisicing elit. Aspernatur blanditiis cum deserunt expedita fugiat iure quod
    repellendus tempora ullam vero! Assumenda consectetur doloribus eius est nobis unde! Architecto
    maiores, pariatur! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
    blanditiis cum deserunt expedita fugiat iure quod repellendus tempora ullam vero! Assumenda
    consectetur doloribus eius est nobis unde! Architecto maiores, pariatur! Lorem ipsum dolor sit
    amet, consectetur adipisicing elit. Aspernatur blanditiis cum deserunt expedita fugiat iure quod
    repellendus tempora ullam vero! Assumenda consectetur doloribus eius est nobis unde! Architecto
    maiores, pariatur! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
    blanditiis cum deserunt expedita fugiat iure quod repellendus tempora ullam vero! Assumenda
    consectetur doloribus eius est nobis unde! Architecto maiores, pariatur! Lorem ipsum dolor sit
    amet, consectetur adipisicing elit. Aspernatur blanditiis cum deserunt expedita fugiat iure quod
    repellendus tempora ullam vero! Assumenda consectetur doloribus eius est nobis unde! Architecto
    maiores, pariatur! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
    blanditiis cum deserunt expedita fugiat iure quod repellendus tempora ullam vero! Assumenda
    consectetur doloribus eius est nobis unde! Architecto maiores, pariatur! Lorem ipsum dolor sit
    amet, consectetur adipisicing elit. Aspernatur blanditiis cum deserunt expedita fugiat iure quod
    repellendus tempora ullam vero! Assumenda consectetur doloribus eius est nobis unde! Architecto
    maiores, pariatur! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
    blanditiis cum deserunt expedita fugiat iure quod repellendus tempora ullam vero! Assumenda
    consectetur doloribus eius est nobis unde! Architecto maiores, pariatur! Lorem ipsum dolor sit
    amet, consectetur adipisicing elit. Aspernatur blanditiis cum deserunt expedita fugiat iure quod
    repellendus tempora ullam vero! Assumenda consectetur doloribus eius est nobis unde! Architecto
    maiores, pariatur! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
    blanditiis cum deserunt expedita fugiat iure quod repellendus tempora ullam vero! Assumenda
    consectetur doloribus eius est nobis unde! Architecto maiores, pariatur! Lorem ipsum dolor sit
    amet, consectetur adipisicing elit. Aspernatur blanditiis cum deserunt expedita fugiat iure quod
    repellendus tempora ullam vero! Assumenda consectetur doloribus eius est nobis unde! Architecto
    maiores, pariatur! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
    blanditiis cum deserunt expedita fugiat iure quod repellendus tempora ullam vero! Assumenda
    consectetur doloribus eius est nobis unde! Architecto maiores, pariatur! Lorem ipsum dolor sit
    amet, consectetur adipisicing elit. Aspernatur blanditiis cum deserunt expedita fugiat iure quod
    repellendus tempora ullam vero! Assumenda consectetur doloribus eius est nobis unde! Architecto
    maiores, pariatur! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
    blanditiis cum deserunt expedita fugiat iure quod repellendus tempora ullam vero! Assumenda
    consectetur doloribus eius est nobis unde! Architecto maiores, pariatur! Lorem ipsum dolor sit
    amet, consectetur adipisicing elit. Aspernatur blanditiis cum deserunt expedita fugiat iure quod
    repellendus tempora ullam vero! Assumenda consectetur doloribus eius est nobis unde! Architecto
    maiores, pariatur! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
    blanditiis cum deserunt expedita fugiat iure quod repellendus tempora ullam vero! Assumenda
    consectetur doloribus eius est nobis unde! Architecto maiores, pariatur! Lorem ipsum dolor sit
    amet, consectetur adipisicing elit. Aspernatur blanditiis cum deserunt expedita fugiat iure quod
    repellendus tempora ullam vero! Assumenda consectetur doloribus eius est nobis unde! Architecto
    maiores, pariatur! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
    blanditiis cum deserunt expedita fugiat iure quod repellendus tempora ullam vero! Assumenda
    consectetur doloribus eius est nobis unde! Architecto maiores, pariatur! Lorem ipsum dolor sit
    amet, consectetur adipisicing elit. Aspernatur blanditiis cum deserunt expedita fugiat iure quod
    repellendus tempora ullam vero! Assumenda consectetur doloribus eius est nobis unde! Architecto
    maiores, pariatur! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
    blanditiis cum deserunt expedita fugiat iure quod repellendus tempora ullam vero! Assumenda
    consectetur doloribus eius est nobis unde! Architecto maiores, pariatur! Lorem ipsum dolor sit
    amet, consectetur adipisicing elit. Aspernatur blanditiis cum deserunt expedita fugiat iure quod
    repellendus tempora ullam vero! Assumenda consectetur doloribus eius est nobis unde! Architecto
    maiores, pariatur! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
    blanditiis cum deserunt expedita fugiat iure quod repellendus tempora ullam vero! Assumenda
    consectetur doloribus eius est nobis unde! Architecto maiores, pariatur! Lorem ipsum dolor sit
    amet, consectetur adipisicing elit. Aspernatur blanditiis cum deserunt expedita fugiat iure quod
    repellendus tempora ullam vero! Assumenda consectetur doloribus eius est nobis unde! Architecto
    maiores, pariatur!
</template>

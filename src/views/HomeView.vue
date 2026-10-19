<script setup lang="ts">
import { useToastStore } from "@/stores/toast-store.ts";
import { useModalStore } from "@/stores/modal-store.ts";
import Button from "@/shared/ui/button/Button.vue";

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

const handleOpen3 = () => {
    useModalStore().openModal({
        title: "Модальное окно",
        body: "Детальное описание модального окна!",
    });
};
</script>

<template>
    <Button @click="handleOpen2"> success </Button>
    <Button @click="handleOpen"> error </Button>
    <Button @click="handleOpen3"> modal </Button>
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

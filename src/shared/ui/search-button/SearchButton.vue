<script setup lang="ts">
import { IconSearch } from "@tabler/icons-vue";
import Button from "@/shared/ui/button/Button.vue";
import Modal from "@/shared/ui/modal/Modal.vue";
import { ref } from "vue";

const isSearchOpen = ref<boolean>(false);
</script>

<template>
    <Button variant="secondary" @click="isSearchOpen = true">
        <IconSearch :size="18" />
        <span> Поиск </span>
    </Button>

    <Modal v-model:open="isSearchOpen" title="Поиск"> Тут будет поиск </Modal>
</template>

<style scoped lang="scss"></style>

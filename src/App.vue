<script setup lang="ts">
import Toast from "@/shared/ui/toast/Toast.vue";

const obj = [
    { brand: "lada", model: 1 },
    { brand: "lada", model: 2 },
    { brand: "mazda", model: 3 },
    { brand: "bmw", model: 4 },
];

const res = {
    lada: [
        { brand: "lada", model: 1 },
        { brand: "lada", model: 2 },
    ],
    mazda: [{ brand: "mazda", model: 3 }],
    bmw: [{ brand: "bmw", model: 4 }],
};
</script>

<template>
    <RouterView />
    <Toast />
</template>

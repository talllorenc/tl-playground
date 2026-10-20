<script setup lang="ts">
import Button from "@/shared/ui/button/Button.vue";
import { IconBell } from "@tabler/icons-vue";
</script>

<template>
    <Button variant="secondary" disabled>
        <IconBell :size="18" />
    </Button>
</template>

<style scoped lang="scss"></style>

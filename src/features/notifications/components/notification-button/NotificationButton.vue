<script setup lang="ts">
import Button from "@/shared/ui/button/Button.vue";
import { IconBell } from "@tabler/icons-vue";
import Popover from "@/shared/ui/popover/Popover.vue";
import { ref } from "vue";

const isShaking = ref<boolean>(false);

const handleShakeBell = () => {
    console.log("handleShakeBell");
};
</script>

<template>
    <Popover label="Уведомления">
        <template #trigger="{ props: triggerProps }">
            <Button
                v-bind="triggerProps"
                variant="secondary"
                aria-label="Уведомления"
                @click="handleShakeBell"
            >
                <IconBell :size="18" aria-hidden="true" :class="{ 'bell--shaking': isShaking }" />
            </Button>
        </template>

        <template #default>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto asperiores
                atque cumque dicta, dolorum est, labore mollitia odit, possimus sapiente soluta
                tempore tenetur ullam. Animi atque facilis maiores possimus sequi?
            </p>
        </template>
    </Popover>
</template>

<style scoped lang="scss"></style>

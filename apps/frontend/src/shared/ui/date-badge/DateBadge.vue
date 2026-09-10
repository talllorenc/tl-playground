<script setup lang="ts">
import { formatDate } from "@/utils/format-date.ts";
import { IconCalendarWeek } from "@tabler/icons-vue";

const props = defineProps<{
    date: string;
}>();
</script>

<template>
    <div class="date-badge">
        <IconCalendarWeek size="18" />
        <span>{{ formatDate(props.date) }}</span>
    </div>
</template>

<style scoped lang="scss">
.date-badge {
    display: flex;
    align-items: center;
    gap: 4px;
}
</style>

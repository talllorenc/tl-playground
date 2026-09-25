import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

export function useKanbanCardDetail() {
    const route = useRoute();
    const router = useRouter();

    const selectedCardId = computed(() => {
        const cardParam = route.query.c;
        if (typeof cardParam !== "string") return null;

        const id = Number(cardParam);
        return Number.isInteger(id) && id > 0 ? id : null;
    });

    const openCard = (id: number) => {
        void router.replace({
            query: {
                ...route.query,
                c: id,
            },
        });
    };

    const closeCard = () => {
        const query = { ...route.query };
        delete query.c;

        void router.replace({ query });
    };

    return {
        selectedCardId,
        openCard,
        closeCard,
    };
}

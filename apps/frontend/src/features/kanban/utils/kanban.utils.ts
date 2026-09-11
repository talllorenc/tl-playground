import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

export function useKanbanCardDetail() {
    const route = useRoute();
    const router = useRouter();

    const selectedCardId = computed(() => {
        const cardParam = route.query.c;
        return cardParam ? Number(cardParam) : null;
    });

    const openCard = (id: number) => {
        router.push({
            query: {
                ...route.query,
                c: id,
            },
        });
    };

    const closeCard = () => {
        const query = { ...route.query };
        delete query.c;

        router.push({ query });
    };

    return {
        selectedCardId,
        openCard,
        closeCard,
    };
}

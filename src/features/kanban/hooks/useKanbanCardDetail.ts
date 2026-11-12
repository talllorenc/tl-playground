import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const CARD_QUERY_KEY = "c";
const FULLSCREEN_QUERY_KEY = "fs";

export function useKanbanCardDetail() {
    const route = useRoute();
    const router = useRouter();

    const selectedCardId = computed(() => {
        const cardParam = route.query[CARD_QUERY_KEY];
        if (typeof cardParam !== "string") return null;

        const id = Number(cardParam);
        return Number.isInteger(id) && id > 0 ? id : null;
    });

    const openCard = (id: number) => {
        void router.replace({
            query: {
                ...route.query,
                [CARD_QUERY_KEY]: id,
            },
        });
    };

    const closeCard = () => {
        const query = { ...route.query };
        delete query[CARD_QUERY_KEY];
        delete query[FULLSCREEN_QUERY_KEY];

        void router.replace({ query });
    };

    const isFullScreen = computed(() => route.query[FULLSCREEN_QUERY_KEY] === "1");

    function toggleFullScreen() {
        const query = { ...route.query };

        if (isFullScreen.value) {
            delete query[FULLSCREEN_QUERY_KEY];
        } else {
            query[FULLSCREEN_QUERY_KEY] = "1";
        }

        void router.replace({ query });
    }

    return {
        selectedCardId,
        openCard,
        closeCard,
        isFullScreen,
        toggleFullScreen,
    };
}

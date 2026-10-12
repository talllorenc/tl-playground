import { liteClient } from "algoliasearch/lite";

const appId = import.meta.env.VITE_ALGOLIA_APP_ID;
const searchKey = import.meta.env.VITE_ALGOLIA_SEARCH_KEY;

if (!appId || !searchKey) {
    throw new Error("Algolia environment variables are missing");
}

export const algoliaClient = liteClient(appId, searchKey);
export const ALGOLIA_INDEX_NAMES = ["kanban_cards"];

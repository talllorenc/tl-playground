import { defineConfig } from "oxlint";

export default defineConfig({
    categories: {
        correctness: "error",
        suspicious: "warn",
        perf: "warn",
    },
    rules: {
        "eslint/no-unused-vars": "error",
        "eslint/no-console": "error",
    },
});

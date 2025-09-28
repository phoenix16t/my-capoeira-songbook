module.exports = {
    plugins: ["simple-import-sort"],
    rules: {
        "simple-import-sort/imports": [
            "error",
            {
                groups: [
                    ["^\\w"],
                    ["^@/pages"],
                    ["^@/components"],
                    ["^@/hooks"],
                    ["^\\."],
                ],
            },
        ],
        "simple-import-sort/exports": "error",
    },
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
};

const path = require("path");

module.exports = [
    {
        name: "@storybook/preset-typescript",
        options: {
            tsLoaderOptions: {
                compilerOptions: {
                    declaration: false,
                },
            },
        },
    },
];

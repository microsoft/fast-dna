const path = require("path");

const basePath = path.resolve(__dirname);

const commonChromeFlags = [
    "--no-default-browser-check",
    "--no-first-run",
    "--no-sandbox",
    "--no-managed-user-acknowledgment-check",
    "--disable-background-timer-throttling",
    "--disable-backing-store-limit",
    "--disable-boot-animation",
    "--disable-cloud-import",
    "--disable-contextual-search",
    "--disable-default-apps",
    "--disable-extensions",
    "--disable-infobars",
    "--disable-translate",
    "--force-device-scale-factor=1",
];

module.exports = function (config: any) {
    let browsers;
    if (process.env.BROWSERS) {
        browsers = [process.env.BROWSERS];
    } else if (config.browsers) {
        browsers = config.browsers;
    } else {
        browsers = ["Chrome"];
    }

    const setup = "setup-browser" + (config.package ? "-" + config.package : "");
    const options = {
        basePath,
        browserDisconnectTimeout: 10000,
        processKillTimeout: 10000,
        frameworks: ["source-map-support", "mocha"],
        plugins: [
            require("karma-mocha"),
            require("karma-mocha-reporter"),
            require("karma-webpack"),
            require("karma-source-map-support"),
            require("karma-sourcemap-loader"),
            require("karma-coverage-istanbul-reporter"),
            require("karma-chrome-launcher"),
            require("karma-firefox-launcher"),
        ],
        files: [`dist/__test__/${setup}.cjs`],
        preprocessors: {
            [`dist/__test__/${setup}.cjs`]: ["webpack", "sourcemap"],
        },
        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i. e.
            stats: "errors-only",
        },
        webpack: {
            mode: "none",
            resolve: {
                extensions: [".js"],
                modules: ["node_modules"],
                mainFields: ["module", "main"],
            },
            devtool: "inline-source-map",
            performance: {
                hints: false,
            },
            optimization: {
                nodeEnv: false,
                usedExports: true,
                flagIncludedChunks: false,
                sideEffects: true,
                concatenateModules: true,
                splitChunks: {
                    name: false,
                },
                runtimeChunk: false,
                noEmitOnErrors: false,
                checkWasmTypes: false,
                minimize: false,
            },
            module: {
                rules: [
                    {
                        test: /\.js\.map$/,
                        use: ["ignore-loader"],
                    },
                    {
                        test: /\.js$/,
                        use: [
                            {
                                loader: "source-map-loader",
                                options: {
                                    enforce: "pre",
                                },
                            },
                        ],
                    },
                ],
            },
        },
        mime: {
            "text/x-typescript": ["ts"],
        },
        reporters: [config.reporter || (process.env.CI ? "min" : "progress")],
        browsers: browsers,
        customLaunchers: {
            ChromeDebugging: {
                base: "Chrome",
                flags: [...commonChromeFlags, "--remote-debugging-port=9333"],
                debug: true,
            },
            ChromeHeadlessOpt: {
                base: "ChromeHeadless",
                flags: [...commonChromeFlags],
            },
        },
        client: {
            captureConsole: true,
            mocha: {
                bail: config["bail"],
                ui: "bdd",
                timeout: 5000,
            },
        },
        logLevel: config.LOG_ERROR, // to disable the WARN 404 for image requests
    };

    if (config.coverage) {
        options.webpack.module.rules.push({
            enforce: "post",
            exclude: /(__tests__|testing|node_modules|\.spec\.[tj]s$)/,
            loader: "istanbul-instrumenter-loader",
            options: { esModules: true },
            test: /\.[tj]s$/,
        } as any);
        options.reporters = ["coverage-istanbul", ...options.reporters];
        (options as any).coverageIstanbulReporter = {
            reports: ["html", "text-summary", "json", "lcovonly", "cobertura"],
            dir: "coverage",
            verbose: true,
            thresholds: {
                emitWarning: false,
                global: {
                    statements: 90,
                    lines: 90,
                    branches: 90,
                    functions: 90,
                },
            },
        };
        (options as any).junitReporter = {
            outputDir: "coverage",
            outputFile: "test-results.xml",
            useBrowserName: false,
        };
    }

    config.set(options);
};

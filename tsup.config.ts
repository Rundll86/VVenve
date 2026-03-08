import { defineConfig, Options } from "tsup";
import fs from "fs/promises";
import { version } from "./package.json";

const bannerTemplate = await fs.readFile("banner.js", "utf8");
const logo = await fs.readFile("src/assets/logo.svg", "utf8");
const obtainers = {
    Eureka: "document-start",
    ReactDom: "document-idle",
    Trap: "document-start"
};

export default defineConfig(async options => {
    const isDevelopment = options.env?.NODE_ENV === "development";

    return Object.entries(obtainers).map(([obtainer, runAt]) => ({
        entry: {
            [`VVenve-${obtainer}.dist`]: "src/index.ts"
        },
        splitting: false,
        sourcemap: isDevelopment,
        dts: false,
        clean: true,
        minify: !isDevelopment,
        loader: {
            ".svg": "dataurl"
        },
        banner: {
            js: bannerTemplate
                .replaceAll("${version}", version)
                .replaceAll("${runAt}", runAt)
                .replaceAll("${logo}", `data:image/svg+xml;base64,${Buffer.from(logo).toString("base64")}`)
        },
        define: {
            "OBTAINER": JSON.stringify(obtainer)
        },
    } satisfies Options));
});
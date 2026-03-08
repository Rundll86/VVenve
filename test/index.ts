import { chromium } from "playwright";
import * as fs from "fs/promises";
import { watch } from "fs";
import * as path from "path";

const mill = async (time: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, time));
const targetUrl = "https://ccw.site/gandi";
const bundlePath = path.resolve(process.cwd(), "dist/VVenve-ReactDom.dist.js");

const readBundle = async () => fs.readFile(bundlePath, "utf-8");

(async () => {
    const browser = await chromium.launch({
        headless: false,
        args: ["--auto-open-devtools-for-tabs", "--start-maximized"],
    });
    const context = await browser.newContext({ viewport: null });
    const page = await context.newPage();
    await page.goto(targetUrl);
    await mill(100); //防止ccw出一些莫名其妙bug

    const inject = async () => {
        const code = await readBundle();
        await page.evaluate((code) => {
            try {
                eval(code);
            } catch (error) {
                console.error("[hot-reload] eval failed", error);
            }
        }, code);
    };

    const initialCode = await readBundle();
    await page.evaluate((code) => {
        window.addEventListener("click", () => eval(code), { once: true });
    }, initialCode);

    let reloadTimer: NodeJS.Timeout | null = null;
    const watcher = watch(bundlePath, () => {
        if (reloadTimer) {
            clearTimeout(reloadTimer);
        }
        reloadTimer = setTimeout(async () => {
            try {
                await page.reload({ waitUntil: "domcontentloaded" });
                await inject();
            } catch (error) {
                console.error("[hot-reload] reload+inject failed", error);
            }
        }, 80);
    });

    browser.on("disconnected", () => {
        watcher.close();
        process.exit(0);
    });
})();

import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import laravel from "laravel-vite-plugin";
import { URL, fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import svgLoader from "vite-svg-loader";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.js"],
            refresh: true,
        }),
        tailwindcss(),
        vue(),
        svgLoader(),
    ],
    server: {
        host: "localhost",
        port: 5173,
    },
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./resources/js", import.meta.url)),
            vue: "vue/dist/vue.esm-bundler.js",
        },
    },
});

import { createInertiaApp } from "@inertiajs/vue3";
import { createPinia } from "pinia";
import { createApp, h } from "vue";
import { ZiggyVue } from "ziggy-js";

import "../css/app.css";
import "./bootstrap";
import DefaultLayout from "./layouts/Default.vue";

const pinia = createPinia();

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./pages/**/*.vue", { eager: true });
        let page = pages[`./pages/${name}.vue`];
        page.default.layout = page.default.layout || DefaultLayout;
        return page;
    },
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(pinia)
            .use(ZiggyVue, props.ziggy)
            .mount(el);
    },
});

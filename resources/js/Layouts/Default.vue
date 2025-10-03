<template>
    <div class="flex justify-center bg-gray-500">
        <div
            class="flex h-screen w-full max-w-[1000px] flex-col overflow-hidden"
        >
            <Header />
            <div
                class="flex flex-grow flex-col gap-8 overflow-auto bg-white p-4"
            >
                <slot />
                <Toaster />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePage } from "@inertiajs/vue3";
import { onMounted, watch } from "vue";
import { toast } from "vue-sonner";

import Header from "@/components/header.vue";
import { Toaster } from "@/components/ui/sonner";

import "vue-sonner/style.css";

const page = usePage();

onMounted(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("welcome")) {
        toast(`Welcome ${page.props.auth.user.name}!`);
        params.delete("welcome");
        const url =
            window.location.pathname +
            (params.toString() ? "?" + params.toString() : "");
        window.history.replaceState({}, "", url);
    }
});

watch(
    () => page.props.flash.message,
    (message) => {
        if (message === "logout") {
            toast("Goodbye!");
        }
    },
);
</script>

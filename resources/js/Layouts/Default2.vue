<template>
    <div class="flex h-[100dvh] justify-center bg-gray-100">
        <div
            class="flex h-[100dvh] w-full max-w-[1000px] flex-col bg-gray-50 text-gray-900 shadow-2xl"
        >
            <Header />
            <div class="flex flex-grow flex-col overflow-hidden bg-gray-50">
                <slot />
                <Toaster />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Header from "@/layouts/partials/header.vue";
import { usePage } from "@inertiajs/vue3";
import { onMounted, watch } from "vue";
import { toast } from "vue-sonner";

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

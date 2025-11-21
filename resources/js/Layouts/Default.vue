<template>
    <div class="flex h-[100dvh] justify-center bg-gray-100">
        <div
            class="flex h-[100dvh] w-full max-w-[1000px] flex-col bg-gray-50 text-gray-900 shadow-2xl"
        >
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <Header />
                    <main
                        class="flex flex-grow flex-col overflow-hidden bg-gray-50"
                    >
                        <SidebarTrigger class="-ml-1" />
                        <slot />
                        <Toaster />
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePage } from "@inertiajs/vue3";
import { onMounted, watchEffect } from "vue";

import Header from "@/layouts/partials/Header.vue";

import AppSidebar from "@/components/AppSidebar.vue";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

import { handleSuccessToast } from "@/lib/helpers";

import "vue-sonner/style.css";

const page = usePage();

onMounted(() => {
    const params = new URLSearchParams(window.location.search);
    if (page.props.auth.user?.name && params.has("welcome")) {
        handleSuccessToast(`Welcome ${page.props.auth.user.name}!`);
        params.delete("welcome");
        const url =
            window.location.pathname +
            (params.toString() ? "?" + params.toString() : "");
        window.history.replaceState({}, "", url);
    }
});

watchEffect(() => {
    if (page.props.flash.message === "logout") {
        handleSuccessToast("Goodbye!");
    }
});
</script>

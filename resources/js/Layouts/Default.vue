<template>
    <div class="flex justify-center bg-gray-500">
        <div
            class="flex h-screen w-full max-w-[1000px] flex-col overflow-hidden"
        >
            <header
                class="flex h-16 min-h-16 items-center justify-between bg-red-500 px-4 text-xl"
            >
                <span class="flex items-center">
                    <div class="[transform:scaleX(-1)]">
                        <BerimbauIcon
                            class="h-12 w-12 -rotate-z-15 fill-current text-white"
                        />
                    </div>
                    <span class="hidden text-white sm:inline">
                        My Capoeira Songbook
                    </span>
                </span>

                <span class="flex gap-4">
                    <template v-if="user">
                        <Link
                            v-if="currentRouteName !== 'songs.index'"
                            :href="route('songs.index')"
                        >
                            <Music color="white" :size="24" />
                        </Link>
                        <Link
                            v-if="currentRouteName !== 'songbooks.index'"
                            :href="route('songbooks.index')"
                        >
                            <BookOpen color="white" :size="24" />
                        </Link>
                    </template>

                    <button v-if="user" class="cursor-pointer" @click="logout">
                        <DoorOpen color="white" :size="24" />
                    </button>
                    <a v-else :href="route('auth.google.redirect')">
                        <KeyRound color="white" :size="24" />
                    </a>
                </span>
            </header>
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
import { Link, router, usePage } from "@inertiajs/vue3";
import { BookOpen, DoorOpen, KeyRound, Music } from "lucide-vue-next";
import { computed, onMounted, watch } from "vue";
import { toast } from "vue-sonner";
import { route } from "ziggy-js";

import { Toaster } from "@/components/ui/sonner";

import BerimbauIcon from "@/icons/berimbau.svg";

import "vue-sonner/style.css";

const page = usePage();

const user = computed(() => page.props.auth.user);
const currentRouteName = computed(() => page.props.currentRouteName);

const logout = () => router.post(route("logout"));

onMounted(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("welcome")) {
        toast("Welcome!");
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

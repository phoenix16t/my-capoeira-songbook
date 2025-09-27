<template>
    <div class="flex justify-center bg-gray-500">
        <div class="flex flex-col h-screen max-w-[1000px] w-full">
            <header
                class="flex items-center justify-between h-16 bg-red-500 px-4 text-xl"
            >
                <span class="text-white">My Capoeira Songbook</span>
                <span class="flex gap-4">
                    <BookOpen color="white" :size="24" />
                    <button
                        v-if="page.props.auth.user"
                        class="cursor-pointer"
                        @click="logout"
                    >
                        <DoorOpen color="white" :size="24" />
                    </button>
                    <a v-else :href="route('auth.google.redirect')">
                        <KeyRound color="white" :size="24" />
                    </a>
                </span>
            </header>
            <div class="bg-white flex-grow p-4">
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { router, usePage } from "@inertiajs/vue3";
import { BookOpen, DoorOpen, KeyRound } from "lucide-vue-next";
import { route } from "ziggy-js";

const page = usePage();

const logout = () => router.post(route("logout"));
</script>

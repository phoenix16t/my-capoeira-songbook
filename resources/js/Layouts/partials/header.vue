<template>
    <header
        class="sticky top-0 flex items-center justify-between bg-red-500 px-8 py-2"
    >
        <span class="flex items-center">
            <div class="-ml-3 [transform:scaleX(-1)]">
                <BerimbauIcon
                    class="h-12 w-12 -rotate-z-15 fill-current text-white"
                />
            </div>
            <span class="text-xl text-white"> My Capoeira Songbook </span>
        </span>

        <span class="flex items-center gap-4">
            <template v-if="user">
                <CreateSongbookButton />

                <Button
                    v-if="currentRouteName !== 'songs.index'"
                    size="icon"
                    variant="ghost"
                    asChild
                >
                    <Link :href="route('songs.index')">
                        <Music class="size-6" />
                    </Link>
                </Button>

                <Button
                    v-if="currentRouteName !== 'songbooks.index'"
                    size="icon"
                    variant="ghost"
                    asChild
                >
                    <Link :href="route('songbooks.index')">
                        <BookOpen class="size-6" />
                    </Link>
                </Button>
            </template>

            <Button v-if="user" size="icon" variant="ghost" @click="logout">
                <DoorOpen class="size-6" />
            </Button>
            <Button v-else size="icon" variant="ghost" asChild>
                <a :href="route('auth.google.redirect')">
                    <KeyRound class="size-6" />
                </a>
            </Button>
        </span>
    </header>
</template>

<script setup lang="ts">
import { Link, router, usePage } from "@inertiajs/vue3";
import { BookOpen, DoorOpen, KeyRound, Music } from "lucide-vue-next";
import { computed } from "vue";
import { route } from "ziggy-js";

import { Button } from "@/components/ui/button";

import BerimbauIcon from "@/icons/berimbau.svg";

import CreateSongbookButton from "./CreateSongbookButton.vue";

const page = usePage();

const user = computed(() => page.props.auth.user);
const currentRouteName = computed(() => page.props.currentRouteName);

const logout = () => router.post(route("logout"));
</script>

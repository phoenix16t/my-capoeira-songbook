<template>
    <header
        class="sticky top-0 flex items-center justify-between bg-red-500 px-8 py-2"
    >
        <Link :href="route('songs.index')">
            <span class="flex items-center">
                <div class="-ml-3 [transform:scaleX(-1)]">
                    <BerimbauIcon
                        class="h-12 w-12 -rotate-z-15 fill-current text-white"
                    />
                </div>
                <span class="xs:block hidden text-xl text-white">
                    My Capoeira Songbook
                </span>
            </span>
        </Link>

        <span class="flex items-center gap-4">
            <CreateSongbookButton
                v-if="isAuthenticated"
                size="icon"
                variant="whiteGhost"
            >
                <PlusIcon class="size-5" />
            </CreateSongbookButton>

            <Button
                size="icon"
                :variant="
                    currentRouteName === 'songs.index'
                        ? 'whiteGhostCurrent'
                        : 'whiteGhost'
                "
                asChild
                data-testid="songs-page-button"
            >
                <Link :href="route('songs.index')">
                    <MusicIcon class="size-5" />
                </Link>
            </Button>

            <Button
                v-if="isAuthenticated"
                size="icon"
                :variant="
                    currentRouteName === 'songbooks.index'
                        ? 'whiteGhostCurrent'
                        : 'whiteGhost'
                "
                asChild
            >
                <Link :href="route('songbooks.index')">
                    <BookOpenIcon class="size-5" />
                </Link>
            </Button>

            <Button
                v-if="isAuthenticated"
                size="icon"
                variant="whiteGhost"
                @click="logout"
            >
                <DoorOpenIcon class="size-5" />
            </Button>
            <Button v-else size="icon" variant="whiteGhost" asChild>
                <a :href="route('auth.google.redirect')">
                    <KeyRoundIcon class="size-5" />
                </a>
            </Button>
        </span>
    </header>
</template>

<script setup lang="ts">
import { Link, router, usePage } from "@inertiajs/vue3";
import {
    BookOpenIcon,
    DoorOpenIcon,
    KeyRoundIcon,
    MusicIcon,
} from "lucide-vue-next";
import { PlusIcon } from "lucide-vue-next";
import { computed } from "vue";
import { route } from "ziggy-js";

import { Button } from "@/components/ui/button";

import BerimbauIcon from "@/icons/berimbau.svg";

import CreateSongbookButton from "./CreateSongbookButton.vue";

const page = usePage();

const isAuthenticated = computed(() => !!page.props.auth.user);
const currentRouteName = computed(() => page.props.currentRouteName);

const logout = () => {
    router.visit(route("logout"), {
        method: "post",
        onSuccess: () => {
            window.location.reload();
        },
    });
};
</script>

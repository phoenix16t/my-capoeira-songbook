<template>
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

        <span class="flex items-center gap-4">
            <template v-if="user">
                <Button size="icon" variant="ghost" @click="isModalOpen = true">
                    <Plus class="size-6" />
                </Button>

                <Dialog v-model:open="isModalOpen">
                    <DialogContent class="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create a new songbook?</DialogTitle>
                        </DialogHeader>
                        <div class="grid gap-4 py-4">
                            <div class="grid grid-cols-4 items-center gap-4">
                                <Label for="name" class="text-right">
                                    Name
                                </Label>
                                <Input
                                    v-model="title"
                                    id="name"
                                    class="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" @click="createSongbook">
                                Save changes
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

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
import { BookOpen, DoorOpen, KeyRound, Music, Plus } from "lucide-vue-next";
import { computed, ref } from "vue";
import { toast } from "vue-sonner";
import { route } from "ziggy-js";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import BerimbauIcon from "@/icons/berimbau.svg";

const page = usePage();

const title = ref("");
const isModalOpen = ref(false);

const user = computed(() => page.props.auth.user);
const currentRouteName = computed(() => page.props.currentRouteName);

const logout = () => router.post(route("logout"));

const createSongbook = () => {
    router.post(
        "/songbooks",
        {
            title: title.value,
        },
        {
            onSuccess: () => {
                isModalOpen.value = false;
            },
            onError: () => {
                toast(`Error creating songbook`);
            },
        },
    );
};
</script>

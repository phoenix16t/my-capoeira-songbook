<template>
    <div class="overflow-auto">
        <SubHeader>
            <template #title> My Songbooks </template>
        </SubHeader>

        <div class="grid grid-cols-3 gap-4 px-8 py-4">
            <template v-if="songbooks.length">
                <Link
                    v-for="songbook in songbooks"
                    :href="route('songbooks.show', songbook.id)"
                    class="flex"
                >
                    <Card
                        class="w-full overflow-hidden px-4 py-2 transition-all hover:shadow-lg"
                    >
                        <div class="flex items-center justify-start gap-2">
                            <component
                                v-if="songbook.icon"
                                :is="Icons[songbook.icon]"
                                class="size-5 w-8"
                                :color="songbook.color"
                            />
                            {{ songbook.title }}
                        </div>
                    </Card>
                </Link>
            </template>
            <div v-else>
                You have no songbooks.
                <CreateSongbookButton variant="outline">
                    Create one!
                </CreateSongbookButton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Link } from "@inertiajs/vue3";
import { route } from "ziggy-js";

import CreateSongbookButton from "@/layouts/partials/CreateSongbookButton.vue";

import Card from "@/components/Card.vue";
import SubHeader from "@/components/SubHeader.vue";

import type { Songbook } from "@/types";

import { Icons } from "@/lib/icons";

interface Props {
    songbooks: Songbook[];
}

defineProps<Props>();
</script>

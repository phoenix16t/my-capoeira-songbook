<template>
    <div class="overflow-auto">
        <header
            class="flex items-center justify-between border-b bg-white px-8 py-4 shadow-sm"
        >
            <h2 class="text-xl font-semibold">Song Details</h2>
            <!-- <div class="flex items-center space-x-2"></div> -->
        </header>

        <div class="flex px-8 py-4 duration-300 ease-in-out">
            <section class="w-1/2 flex-grow duration-300 ease-in-out">
                <Card>
                    <h3 class="mb-4 text-2xl font-bold">
                        {{ song.titles[0]?.title }}
                    </h3>

                    <Lyrics :song="song" />
                </Card>
            </section>

            <aside
                class="relative overflow-hidden duration-300 ease-in-out"
                :class="
                    expanded ? 'ml-8 max-w-md min-w-md' : 'ml-0 max-w-0 min-w-0'
                "
            >
                <div class="flex min-w-md flex-col gap-8 whitespace-nowrap">
                    <Card>
                        <h3 class="mb-2 text-lg font-semibold">Song Info</h3>
                        <ul class="flex flex-col gap-3 text-gray-700">
                            <li class="flex items-baseline gap-2">
                                <Label class="font-bold whitespace-nowrap">
                                    Alternate Titles:
                                </Label>
                                <div class="leading-none">
                                    {{
                                        song.titles
                                            .slice(1)
                                            .map((t) => t.title)
                                            .join(", ")
                                    }}
                                </div>
                            </li>
                            <li class="flex items-baseline gap-2">
                                <Label class="font-bold whitespace-nowrap">
                                    Author:
                                </Label>
                                <div class="leading-none">
                                    {{ song.author }}
                                </div>
                            </li>
                            <li class="flex items-baseline gap-2">
                                <Label class="font-bold whitespace-nowrap">
                                    Type:
                                </Label>
                                <div class="leading-none">
                                    {{ song.type?.name }}
                                </div>
                            </li>
                            <li class="flex items-baseline gap-2">
                                <Label class="font-bold whitespace-nowrap">
                                    Beat count:
                                </Label>
                                <div class="leading-none">{{ song.beat }}</div>
                            </li>
                            <li class="flex items-baseline gap-2">
                                <Label class="font-bold whitespace-nowrap">
                                    Group:
                                </Label>
                                <div class="leading-none">
                                    {{ song.group?.name }}
                                </div>
                            </li>
                        </ul>
                    </Card>

                    <Card>
                        <h3 class="mb-2 text-lg font-semibold">Listen</h3>
                        <ul class="flex flex-col text-gray-700">
                            <li v-for="link in song.links">
                                <a :href="link.url" target="_blank">
                                    {{ link.url }}
                                </a>
                            </li>
                        </ul>
                    </Card>
                </div>
            </aside>
        </div>
    </div>
</template>

<script setup lang="ts">
import Default2Layout from "@/layouts/Default2.vue";
import type { Song } from "@/types";
import { ref } from "vue";

import Card from "@/components/Card.vue";
import Lyrics from "@/components/Lyrics.vue";
import { Label } from "@/components/ui/label";

defineOptions({ layout: Default2Layout });

interface Props {
    song: Song;
}

const p = defineProps<Props>();

const expanded = ref(true);
console.log("p", p);
</script>

<template>
    <div class="overflow-auto">
        <header
            class="flex items-center justify-between border-b bg-white px-8 py-4 shadow-sm"
        >
            <h2 class="text-xl font-semibold">Song Details</h2>
            <!-- <div class="flex items-center space-x-2"></div> -->
        </header>

        <div class="grid grid-cols-2 gap-8 px-8 py-4">
            <section class="flex-grow">
                <Card>
                    <h3 class="mb-4 text-2xl font-bold">
                        {{ song.titles[0]?.title }}
                    </h3>

                    <Lyrics :song="song" />
                </Card>
            </section>

            <aside class="flex flex-grow flex-col gap-8">
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
                            <div class="leading-none">{{ song.author }}</div>
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
            </aside>
        </div>
    </div>
</template>

<script setup lang="ts">
import Default2Layout from "@/layouts/Default2.vue";
import type { Song } from "@/types";

import Card from "@/components/Card.vue";
import Lyrics from "@/components/Lyrics.vue";
import { Label } from "@/components/ui/label";

defineOptions({ layout: Default2Layout });

interface Props {
    song: Song;
}

const p = defineProps<Props>();
console.log("p", p);
</script>

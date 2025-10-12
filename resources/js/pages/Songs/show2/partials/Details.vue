<template>
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
                    <Label class="font-bold whitespace-nowrap"> Author: </Label>
                    <div class="leading-none">
                        {{ song.author }}
                    </div>
                </li>
                <li class="flex items-baseline gap-2">
                    <Label class="font-bold whitespace-nowrap"> Type: </Label>
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
                    <Label class="font-bold whitespace-nowrap"> Group: </Label>
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
</template>

<script setup lang="ts">
import type { Song } from "@/types";

import Card from "@/components/Card.vue";
import { Label } from "@/components/ui/label";

interface Props {
    song: Song;
}

defineProps<Props>();
</script>

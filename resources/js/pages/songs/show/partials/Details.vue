<template>
    <Card data-testid="details-container">
        <h3 class="mb-4 text-lg font-semibold">Song Info</h3>
        <ul class="flex flex-col gap-3 text-gray-700">
            <li
                v-if="song.titles.slice(1).length"
                class="flex items-baseline gap-2"
            >
                <Label class="font-bold whitespace-nowrap">
                    Alternate Titles:
                </Label>
                <div class="leading-none">
                    {{
                        song.titles
                            .slice(1)
                            .map((t: SongTitle) => t.title)
                            .join(", ")
                    }}
                </div>
            </li>
            <li class="flex items-baseline gap-2">
                <Label class="font-bold whitespace-nowrap"> Author: </Label>
                <div class="leading-none" :class="!song.author && 'italic'">
                    {{ song.author || "Unknown" }}
                </div>
            </li>
            <li class="flex items-baseline gap-2">
                <Label class="font-bold whitespace-nowrap"> Type: </Label>
                <div class="leading-none">
                    {{ song.type?.name }}
                </div>
            </li>
            <li class="flex items-baseline gap-2">
                <Label class="font-bold whitespace-nowrap"> Beat count: </Label>
                <div class="leading-none">{{ song.beat }}</div>
            </li>
            <li class="flex items-baseline gap-2">
                <Label class="font-bold whitespace-nowrap"> Group: </Label>
                <div
                    class="leading-none"
                    :class="!song.group?.name && 'italic'"
                >
                    {{ song.group?.name || "None" }}
                </div>
            </li>
        </ul>
    </Card>
</template>

<script setup lang="ts">
import Card from "@/components/Card.vue";
import { Label } from "@/components/ui/label";

import type { Song, SongTitle } from "@/types";

interface Props {
    song: Song;
}

defineProps<Props>();
</script>

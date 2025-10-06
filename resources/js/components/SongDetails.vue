<template>
    <div class="flex flex-col gap-4">
        <div v-if="song.titles.slice(1).length" class="flex flex-col gap-2">
            <Label> Other names for this song: </Label>
            <div class="flex flex-col rounded border p-2 italic">
                <span v-for="titleData in song.titles.slice(1)">
                    {{ titleData.title }}
                </span>
            </div>
        </div>

        <div v-if="song.type?.id">
            <Label> Type: </Label>
            <div class="rounded border p-2 italic">
                {{ song.type.name }}
            </div>
        </div>

        <div>
            <Label> Written by: </Label>
            <div class="rounded border p-2 italic">
                {{ song.author || "Unknown" }}
            </div>
        </div>

        <div v-if="song.group?.id">
            <Label> Group: </Label>
            <div class="rounded border p-2 italic">
                {{ song.group.name }}
            </div>
        </div>

        <div>
            <Label> Starting count: </Label>
            <div class="rounded border p-2 italic">
                {{ song.count }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Song } from "@/types";

import { Label } from "@/components/ui/label";

interface Props {
    song: Song;
}

defineProps<Props>();
</script>

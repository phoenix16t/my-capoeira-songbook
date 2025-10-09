<template>
    <div class="flex flex-col items-center gap-4">
        <div>
            <div
                v-for="line in song.lyrics.split('\n')"
                :class="{ 'font-bold': line.includes('(coro)') }"
            >
                {{ line.replaceAll("(coro)", "") }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Song } from "@/types";

interface Props {
    song: Song;
}

defineProps<Props>();
</script>

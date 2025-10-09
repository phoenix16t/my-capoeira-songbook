<template>
    <h1 class="text-3xl">
        {{ song.titles[0]?.title }}
    </h1>
    <div class="grid grid-cols-2">
        <Lyrics :song="song" />
        <SongDetails :song="song" />
    </div>
</template>

<script setup lang="ts">
import type { Song } from "@/types";

import Lyrics from "@/components/Lyrics.vue";
import SongDetails from "@/components/SongDetails.vue";

interface Props {
    song: Song;
}

defineProps<Props>();
</script>

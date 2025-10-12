<template>
    <Card>
        <h3 class="mb-2 text-lg font-semibold">{{ song.titles[0]?.title }}</h3>
        <div
            v-for="line in song.lyrics.split('\n')"
            :class="{ 'font-bold': line.includes('(coro)') }"
        >
            {{ line.replaceAll("(coro)", "") }}
        </div>
    </Card>
</template>

<script setup lang="ts">
import type { Song } from "@/types";

import Card from "@/components/Card.vue";

interface Props {
    song: Song;
}

defineProps<Props>();
</script>

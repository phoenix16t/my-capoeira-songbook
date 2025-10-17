<template>
    <Card>
        <h3 class="mb-4 text-lg font-semibold">Listen</h3>
        <ul class="flex flex-col text-gray-700">
            <li v-for="link in song.links">
                <a :href="link.url" target="_blank">
                    {{ link.url }}
                </a>
            </li>
        </ul>
    </Card>
</template>

<script setup lang="ts">
import Card from "@/components/Card.vue";

import type { Song } from "@/types";

interface Props {
    song: Song;
}

defineProps<Props>();
</script>

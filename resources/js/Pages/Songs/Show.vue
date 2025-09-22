<template>
    <div>
        Titles:
        <div v-for="titleData in song.titles">
            {{ titleData.title }}
        </div>
    </div>

    <div class="mt-4">
        Song:
        <template v-for="line in lines">
            <div :class="{ 'font-bold': line.includes('(coro)') }">
                {{ line.replaceAll("(coro)", "") }}
            </div>
        </template>
    </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    song: {
        type: Object,
        required: true,
    },
});

const lines = computed(() => {
    return props.song.lyrics.split("\n");
});
</script>

<template>
    <div v-for="song in songs" class="grid">
        <div>{{ song.titles[0].title }}</div>
        <div>{{ song.lyrics }}</div>
    </div>
</template>

<script setup>
const props = defineProps({
    songs: {
        type: Array,
        required: true,
    },
});
</script>

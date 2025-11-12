<template>
    <Label v-if="!!page.props.auth.user" class="flex items-center gap-2">
        <Switch
            v-model="songsShowSongbooks"
            data-testid="show-songbooks-toggle"
            class="setting-toggle"
        />
        <span v-if="songsShowSongbooks">Showing Songbooks</span>
        <span v-else>Not Showing Songbooks</span>
    </Label>
</template>

<script setup lang="ts">
import { usePage } from "@inertiajs/vue3";
import { storeToRefs } from "pinia";

import { Label } from "@/components/ui/label";
import Switch from "@/components/ui/switch/Switch.vue";

import { useSettingsStore } from "@/stores/useSettingsStore";

const page = usePage();
const store = useSettingsStore();

const { songsShowSongbooks } = storeToRefs(store);
</script>

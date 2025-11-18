<template>
    <Label v-if="!!page.props.auth.user">
        <Switch
            v-model="songlistShowSongbookIcons"
            data-testid="show-songbook-icons-toggle"
            class="setting-toggle"
        />
        <span v-if="songlistShowSongbookIcons">Showing Songbook Icons</span>
        <span v-else>Not Showing Songbook Icons</span>
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

const { songlistShowSongbookIcons } = storeToRefs(store);
</script>

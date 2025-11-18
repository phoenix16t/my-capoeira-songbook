<template>
    <Label>
        <Switch
            v-model="showFullSongs"
            data-testid="show-full-song-toggle"
            class="setting-toggle"
        />
        <span v-if="!showFullSongs">Showing Titles Only</span>
        <span v-else>Showing Full Songs</span>
    </Label>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import { Label } from "@/components/ui/label";
import Switch from "@/components/ui/switch/Switch.vue";

import { useSettingsStore } from "@/stores/useSettingsStore";

const store = useSettingsStore();

const { showFullSongs } = storeToRefs(store);
</script>

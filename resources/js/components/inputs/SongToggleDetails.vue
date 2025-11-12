<template>
    <Label>
        <Switch
            v-model="showDetails"
            data-testid="show-details-toggle"
            class="setting-toggle"
        />
        <span v-if="showDetails">Showing Details</span>
        <span v-else>Not Showing Details</span>
    </Label>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import { Label } from "@/components/ui/label";
import Switch from "@/components/ui/switch/Switch.vue";

import { useSettingsStore } from "@/stores/useSettingsStore";

const store = useSettingsStore();

const { showDetails } = storeToRefs(store);
</script>

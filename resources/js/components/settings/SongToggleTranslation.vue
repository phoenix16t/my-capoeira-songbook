<template>
    <Label>
        <Switch
            v-model="showTranslation"
            data-testid="show-translation-toggle"
            class="setting-toggle"
        />
        <span v-if="showTranslation">Showing Translation</span>
        <span v-else>Not Showing Translation</span>
    </Label>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import { Label } from "@/components/ui/label";
import Switch from "@/components/ui/switch/Switch.vue";

import { useSettingsStore } from "@/stores/useSettingsStore";

const store = useSettingsStore();

const { showTranslation } = storeToRefs(store);
</script>

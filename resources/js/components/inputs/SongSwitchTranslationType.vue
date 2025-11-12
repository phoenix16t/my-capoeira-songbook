<template>
    <div v-if="showTranslation" class="mt-2 ml-6 flex flex-col gap-2">
        <Label>
            <input
                v-model="translationType"
                type="radio"
                value="inline"
                data-testid="show-inline-translation"
                class="cursor-pointer accent-blue-600"
            />
            <span>Inline</span>
        </Label>
        <Label>
            <input
                v-model="translationType"
                type="radio"
                value="side"
                data-testid="show-side-by-side-translation"
                class="cursor-pointer accent-blue-600"
            />
            <span>Side-by-side</span>
        </Label>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import { Label } from "@/components/ui/label";

import { useSettingsStore } from "@/stores/useSettingsStore";

const store = useSettingsStore();

const { showTranslation, translationType } = storeToRefs(store);
</script>

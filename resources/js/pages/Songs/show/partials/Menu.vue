<template>
    <div>
        <Label class="flex items-center gap-2">
            <Switch v-model="showTranslation" />
            <span v-if="showTranslation">Showing Translation</span>
            <span v-else>Not Showing Translation</span>
        </Label>
        <div v-if="showTranslation" class="mt-2 ml-6 flex flex-col gap-2">
            <Label class="flex items-center gap-2">
                <input
                    v-model="translationMode"
                    type="radio"
                    value="inline"
                    class="accent-blue-600"
                />
                <span>Inline</span>
            </Label>
            <Label class="flex items-center gap-2">
                <input
                    v-model="translationMode"
                    type="radio"
                    value="side"
                    class="accent-blue-600"
                />
                <span>Side-by-side</span>
            </Label>
        </div>
    </div>

    <Label class="flex items-center gap-2">
        <Switch v-model="showDetails" />
        <span v-if="showDetails">Showing Details</span>
        <span v-else>Not Showing Details</span>
    </Label>
</template>

<script setup lang="ts">
import { Label } from "@/components/ui/label";
import Switch from "@/components/ui/switch/Switch.vue";

const showDetails = defineModel("showDetails", { default: true });
const showTranslation = defineModel("showTranslation", { default: false });
const translationMode = defineModel("translationMode", { default: "inline" });
</script>

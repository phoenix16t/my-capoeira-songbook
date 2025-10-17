<template>
    <div className="grid flex-1 auto-rows-min gap-6 mt-4">
        <Label class="flex items-center gap-2">
            <Switch v-model="showTitlesOnly" />
            <span v-if="showTitlesOnly">Showing Only Titles</span>
            <span v-else>Showing Full Songs</span>
        </Label>

        <Label for="columns" class="flex">
            <NumberField
                v-model="numberOfColumns"
                id="columns"
                :default-value="2"
                :min="1"
                :max="10"
            >
                <NumberFieldContent class="w-20">
                    <NumberFieldDecrement />
                    <NumberFieldInput class="border-none shadow-none" />
                    <NumberFieldIncrement />
                </NumberFieldContent>
            </NumberField>
            <span>{{ numberOfColumns === 1 ? "Column" : "Columns" }}</span>
        </Label>
    </div>
</template>

<script setup lang="ts">
import { Label } from "@/components/ui/label";
import {
    NumberField,
    NumberFieldContent,
    NumberFieldDecrement,
    NumberFieldIncrement,
    NumberFieldInput,
} from "@/components/ui/number-field";
import Switch from "@/components/ui/switch/Switch.vue";

const showTitlesOnly = defineModel("showTitlesOnly", { default: true });
const numberOfColumns = defineModel("numberOfColumns", { default: 2 });
</script>

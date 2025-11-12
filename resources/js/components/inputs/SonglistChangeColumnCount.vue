<template>
    <Label for="columns">
        <NumberField
            v-model="numberOfColumns"
            id="columns"
            :default-value="1"
            :min="1"
            :max="4"
        >
            <NumberFieldContent class="w-20">
                <NumberFieldDecrement data-testid="column-counter-down" />
                <NumberFieldInput
                    class="shadow-none"
                    data-testid="column-counter-value"
                />
                <NumberFieldIncrement data-testid="column-counter-up" />
            </NumberFieldContent>
        </NumberField>
        <span>
            {{ numberOfColumns === 1 ? "Column" : "Columns" }}
        </span>
    </Label>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import { Label } from "@/components/ui/label";
import {
    NumberField,
    NumberFieldContent,
    NumberFieldDecrement,
    NumberFieldIncrement,
    NumberFieldInput,
} from "@/components/ui/number-field";

import { useSettingsStore } from "@/stores/useSettingsStore";

const store = useSettingsStore();

const { numberOfColumns } = storeToRefs(store);
</script>

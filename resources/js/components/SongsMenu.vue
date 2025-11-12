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

    <Label v-if="!!page.props.auth.user">
        <Switch
            v-model="songlistShowSongbooks"
            data-testid="show-songbook-icons-toggle"
            class="setting-toggle"
        />
        <span v-if="songlistShowSongbooks">Showing Songbook Icons</span>
        <span v-else>Not Showing Songbook Icons</span>
    </Label>

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

    <div class="flex flex-col">
        <h3 class="flex items-center text-base font-semibold">Search</h3>

        <Input
            v-model="searchQuery"
            id="search"
            class="rounded border"
            type="text"
            data-testid="search"
        />
    </div>
</template>

<script setup lang="ts">
import { usePage } from "@inertiajs/vue3";
import { storeToRefs } from "pinia";

import Input from "@/components/ui/input/Input.vue";
import { Label } from "@/components/ui/label";
import {
    NumberField,
    NumberFieldContent,
    NumberFieldDecrement,
    NumberFieldIncrement,
    NumberFieldInput,
} from "@/components/ui/number-field";
import Switch from "@/components/ui/switch/Switch.vue";

import { useSettingsStore } from "@/stores/useSettingsStore";

const searchQuery = defineModel<string>("searchQuery", { default: "" });

const page = usePage();
const store = useSettingsStore();

const { numberOfColumns, showFullSongs, songlistShowSongbooks } =
    storeToRefs(store);
</script>

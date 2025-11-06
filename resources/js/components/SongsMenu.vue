<template>
    <Label>
        <Switch v-model="showFullSongs" />
        <span v-if="!showFullSongs">Showing Titles Only</span>
        <span v-else>Showing Full Songs</span>
    </Label>

    <Label v-if="!!page.props.auth.user">
        <Switch v-model="songlistShowSongbooks" />
        <span v-if="!songlistShowSongbooks">Not Showing Songbook Icons</span>
        <span v-else>Showing Songbook Icons</span>
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
                <NumberFieldDecrement />
                <NumberFieldInput class="shadow-none" />
                <NumberFieldIncrement />
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
        />
    </div>
</template>

<script setup lang="ts">
import { usePage } from "@inertiajs/vue3";
import { ref, watch } from "vue";

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

const props = defineProps<{
    showFullSongs: boolean;
    songlistShowSongbooks: boolean;
    numberOfColumns: number;
}>();

const searchQuery = defineModel<string>("searchQuery", { default: "" });
const emit = defineEmits([
    "update:showFullSongs",
    "update:songlistShowSongbooks",
    "update:numberOfColumns",
]);

const page = usePage();

const showFullSongs = ref(props.showFullSongs);
const songlistShowSongbooks = ref(props.songlistShowSongbooks);
const numberOfColumns = ref(props.numberOfColumns);

watch(showFullSongs, (val) => emit("update:showFullSongs", val));
watch(songlistShowSongbooks, (val) =>
    emit("update:songlistShowSongbooks", val),
);
watch(numberOfColumns, (val) => emit("update:numberOfColumns", val));
</script>

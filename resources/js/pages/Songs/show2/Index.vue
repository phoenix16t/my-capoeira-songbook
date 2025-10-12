<template>
    <div class="overflow-auto">
        <header
            class="flex items-center justify-between border-b bg-white px-8 py-4 shadow-sm"
        >
            <h2 class="text-xl font-semibold">Song Details</h2>
            <Menu
                v-model:showDetails="showDetails"
                v-model:showTranslation="showTranslation"
                v-model:translationMode="translationMode"
            />
        </header>

        <div
            class="grid grid-cols-1 gap-8 px-8 py-4"
            :class="shouldShowDataColumn && 'sm:grid-cols-2'"
        >
            <section class="pb-1">
                <Lyrics :showInlineTranslation :song="song" />
            </section>

            <aside v-if="shouldShowDataColumn" class="pb-1">
                <div class="flex flex-col gap-8">
                    <Translation v-if="showSideTranslation" :song="song" />
                    <Details v-if="showDetails" :song="song" />
                    <Links v-if="showDetails" :song="song" />
                </div>
            </aside>
        </div>
    </div>
</template>

<script setup lang="ts">
import Default2Layout from "@/layouts/Default2.vue";
import type { Song } from "@/types";
import { computed, ref } from "vue";

import Lyrics from "@/components/Lyrics.vue";
import Translation from "@/components/Translation.vue";

import Details from "./partials/Details.vue";
import Links from "./partials/Links.vue";
import Menu from "./partials/Menu.vue";

defineOptions({ layout: Default2Layout });

interface Props {
    song: Song;
}

defineProps<Props>();

const showDetails = ref(true);
const showTranslation = ref(false);
const translationMode = ref("inline");

const shouldShowDataColumn = computed(
    () => showDetails.value || showTranslation.value,
);
const showInlineTranslation = computed(
    () => showTranslation.value && translationMode.value === "inline",
);
const showSideTranslation = computed(
    () => showTranslation.value && translationMode.value === "side",
);
</script>

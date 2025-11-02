<template>
    <button
        :class="cn('flex cursor-pointer items-center justify-center', cls)"
        @click.stop.prevent="isModalOpen = true"
    >
        <PlusIcon class="size-5" />
    </button>

    <Dialog v-model:open="isModalOpen">
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle> Add to songbook </DialogTitle>
            </DialogHeader>

            <SongbookList :song="song" :songbooks="songbooks" />
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { PlusIcon } from "lucide-vue-next";
import { ref } from "vue";

import SongbookList from "@/components/SongbookList.vue";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import type { Song, Songbook } from "@/types";

import { cn } from "@/lib/utils";

interface Props {
    cls?: string;
    song: Song;
    songbooks: Songbook[];
}

defineProps<Props>();

const isModalOpen = ref(false);
</script>

<template>
    <Button
        size="icon"
        variant="ghost"
        @click.stop.prevent="isModalOpen = true"
    >
        <BookPlusIcon class="size-5" />
    </Button>

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
import { BookPlusIcon } from "lucide-vue-next";
import { ref } from "vue";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import type { Song, Songbook } from "@/types";

import SongbookList from "./SongbookList.vue";

interface Props {
    song: Song;
    songbooks: Songbook[];
}

defineProps<Props>();

const isModalOpen = ref(false);
</script>

<template>
    <Button class="h-full w-10" @click.stop.prevent="isModalOpen = true">
        <Card
            class="flex h-full w-full items-center justify-center rounded-l-none p-1 transition-all hover:shadow-lg"
        >
            <BookPlusIcon class="size-5" />
        </Card>
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

import Card from "@/components/Card.vue";
import SongbookList from "@/components/SongbookList.vue";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import type { Song, Songbook } from "@/types";

interface Props {
    song: Song;
    songbooks: Songbook[];
}

defineProps<Props>();

const isModalOpen = ref(false);
</script>

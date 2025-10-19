<template>
    <Button size="icon" variant="ghost" @click="isModalOpen = true">
        <BookPlusIcon class="size-5" />
    </Button>

    <Dialog v-model:open="isModalOpen">
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle> Add to songbook </DialogTitle>
            </DialogHeader>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { BookPlusIcon } from "lucide-vue-next";
import { ref } from "vue";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const isModalOpen = ref(false);
</script>

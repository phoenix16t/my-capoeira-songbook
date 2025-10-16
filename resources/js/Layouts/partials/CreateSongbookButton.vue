<template>
    <Button size="icon" variant="whiteGhost" @click="isModalOpen = true">
        <Plus class="size-6" />
    </Button>

    <Dialog v-model:open="isModalOpen">
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Create a new songbook?</DialogTitle>
            </DialogHeader>
            <div class="grid gap-4 py-4">
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="name" class="text-right"> Name </Label>
                    <Input v-model="title" id="name" class="col-span-3" />
                </div>
            </div>
            <DialogFooter>
                <Button as="button" @click="createSongbook" :disabled="!title">
                    Save changes
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { router } from "@inertiajs/vue3";
import { Plus } from "lucide-vue-next";
import { ref } from "vue";
import { toast } from "vue-sonner";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const title = ref("");
const isModalOpen = ref(false);

const createSongbook = () => {
    router.post(
        "/songbooks",
        { title: title.value },
        {
            onSuccess: () => {
                toast(`Songbook ${title.value} created!`);
            },
            onError: () => {
                toast(`Error creating songbook`);
            },
            onFinish: () => {
                isModalOpen.value = false;
            },
        },
    );
};
</script>

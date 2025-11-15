<template>
    <Button
        variant="destructive"
        data-testid="delete-songbook-button"
        @click="isModalOpen = true"
    >
        Delete Songbook
    </Button>

    <Dialog v-model:open="isModalOpen">
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>
                    Delete songbook {{ songbook.title }}?
                </DialogTitle>
            </DialogHeader>

            <DialogFooter>
                <Button variant="secondary" @click="isModalOpen = false">
                    Cancel
                </Button>
                <Button
                    @click="deleteSongbook()"
                    data-testid="delete-songbook-confirm"
                >
                    Delete
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { router } from "@inertiajs/vue3";
import { ref } from "vue";
import { route } from "ziggy-js";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import type { Songbook } from "@/types";

import { handleErrorToast, handleSuccessToast } from "@/lib/helpers";

interface Props {
    songbook: Songbook;
}
const props = defineProps<Props>();

const isModalOpen = ref(false);

const deleteSongbook = () => {
    router.delete(route("songbooks.destroy", props.songbook.id), {
        onSuccess: () => {
            handleSuccessToast(`${props.songbook.title}  has been deleted`);
        },
        onError: () => {
            handleErrorToast(`Error deleting songbook`);
        },
    });
};
</script>

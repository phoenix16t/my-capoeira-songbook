<template>
    <Tooltip text="Search songs">
        <Button size="icon" variant="ghost" @click="isModalOpen = true">
            <SearchIcon class="size-5" />
        </Button>
    </Tooltip>

    <Dialog v-model:open="isModalOpen">
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle> Search Songs </DialogTitle>
            </DialogHeader>

            <Input
                v-model="searchQuery"
                id="search"
                class="rounded border"
                type="text"
                data-testid="search"
            />

            <DialogFooter>
                <Button variant="secondary" @click="cancelSearch">
                    Cancel
                </Button>
                <Button @click="isModalOpen = false"> Continue </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { SearchIcon } from "lucide-vue-next";
import { ref } from "vue";

import Tooltip from "@/components/Tooltip.vue";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Input from "@/components/ui/input/Input.vue";

const searchQuery = defineModel<string>("searchQuery", { default: "" });

const isModalOpen = ref(false);

const cancelSearch = () => {
    searchQuery.value = "";
    isModalOpen.value = false;
};
</script>

<template>
    <Tooltip text="Search songs">
        <Button size="icon" variant="ghost" @click="isModalOpen = true">
            <SearchIcon class="size-5" />
        </Button>
    </Tooltip>

    <Dialog v-model:open="isModalOpen">
        <DialogContent class="sm:max-w-[425px]">
            <SongSearch v-model:searchQuery="searchQuery">
                <template #header>
                    <DialogTitle> Search Songs </DialogTitle>
                </template>
            </SongSearch>

            <DialogFooter>
                <Button @click="isModalOpen = false"> Close </Button>
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

import SongSearch from "../shared/SongSearch.vue";

const searchQuery = defineModel<string>("searchQuery", { default: "" });

const isModalOpen = ref(false);
</script>

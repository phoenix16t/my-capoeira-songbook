<template>
    <Tooltip text="Search songs">
        <Button size="icon" variant="ghost" @click="isModalOpen = true">
            <SearchIcon class="size-5" />
        </Button>
    </Tooltip>

    <Dialog v-model:open="isModalOpen">
        <DialogContent class="sm:max-w-[425px]">
            <MenuSearch v-model:searchQuery="searchQuery">
                <DialogTitle> Search Songs </DialogTitle>
            </MenuSearch>

            <DialogFooter>
                <Button @click="isModalOpen = false"> Close </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { SearchIcon } from "lucide-vue-next";
import { ref } from "vue";

import MenuSearch from "@/components//search/MenuSearch.vue";
import Tooltip from "@/components/Tooltip.vue";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTitle,
} from "@/components/ui/dialog";

const searchQuery = defineModel<string>("searchQuery", { default: "" });

const isModalOpen = ref(false);
</script>

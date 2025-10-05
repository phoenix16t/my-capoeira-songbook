<template>
    <Button size="icon" variant="link" @click="isModalOpen = true">
        <Settings class="size-6" />
    </Button>

    <Dialog v-model:open="isModalOpen">
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Songs control panel</DialogTitle>
            </DialogHeader>
            <div class="flex flex-col gap-4 py-4">
                <div class="flex gap-4">
                    <Switch v-model="showAllTitles" id="show-titles" />
                    <Label for="show-titles">
                        {{
                            controlPanelStore.showAllTitles
                                ? "Showing all titles"
                                : "Not showing all titles"
                        }}
                    </Label>
                </div>

                <div class="flex gap-4">
                    <Switch id="airplane-mode" />
                    <Label for="airplane-mode">Airplane Mode</Label>
                </div>
            </div>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { useControlPanelStore } from "@/stores/useControlPanelStore";
import { Settings } from "lucide-vue-next";
import { storeToRefs } from "pinia";
import { ref } from "vue";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const controlPanelStore = useControlPanelStore();
const { showAllTitles } = storeToRefs(controlPanelStore);

const isModalOpen = ref(false);
</script>

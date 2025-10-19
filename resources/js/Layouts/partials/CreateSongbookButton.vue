<template>
    <Button size="icon" variant="whiteGhost" @click="isModalOpen = true">
        <PlusIcon class="size-5" />
    </Button>

    <Dialog v-model:open="isModalOpen">
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle> Create a new songbook? </DialogTitle>
            </DialogHeader>
            <div class="grid gap-4 py-4">
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="name" class="text-right"> Name </Label>
                    <Input v-model="title" id="name" class="col-span-3" />
                </div>

                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="icon" class="text-right"> Icon </Label>
                    <div class="col-span-3">
                        <Select v-model="selectedIcon" id="icon">
                            <SelectTrigger>
                                <SelectValue placeholder="Select an icon">
                                    <template #default>
                                        <div
                                            class="flex items-center justify-start gap-2"
                                        >
                                            <template v-if="selectedIcon">
                                                <component
                                                    :is="Icons[selectedIcon]"
                                                    class="size-5 w-8"
                                                    :color="color"
                                                />
                                                <span class="col-span-2">
                                                    {{ selectedIcon }}
                                                </span>
                                            </template>
                                            <span
                                                v-else
                                                class="col-span-2 text-gray-500"
                                            >
                                                No Icon
                                            </span>
                                        </div>
                                    </template>
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent class="w-full">
                                <SelectGroup class="w-full">
                                    <SelectItem :value="undefined">
                                        <div
                                            class="flex items-center justify-start gap-2"
                                        >
                                            No Icon
                                        </div>
                                    </SelectItem>
                                    <SelectItem
                                        v-for="(icon, name) in Icons"
                                        :value="name"
                                    >
                                        <div
                                            class="flex items-center justify-start gap-2"
                                        >
                                            <component
                                                :is="icon"
                                                class="size-5 w-8"
                                                :color="color"
                                            />
                                            {{ name }}
                                        </div>
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                {{ selectedIcon }}
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="name" class="text-right"> Icon color </Label>
                    <Input v-model="color" type="color" />
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
import { PlusIcon } from "lucide-vue-next";
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import type { IconKeys } from "@/types";

import { Icons } from "@/lib/icons";

const title = ref("");
const selectedIcon = ref<IconKeys | undefined>(undefined);
const color = ref("#000000");
const isModalOpen = ref(false);

const createSongbook = () => {
    router.post(
        "/songbooks",
        { title: title.value, icon: selectedIcon.value, color: color.value },
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

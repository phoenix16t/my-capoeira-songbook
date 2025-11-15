<template>
    <Dialog v-model:open="isModalOpen">
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>{{ titleText }}</DialogTitle>
            </DialogHeader>

            <div class="grid gap-4 py-4">
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label class="text-right"> Name </Label>
                    <Input v-model="title" class="col-span-3" />
                </div>

                <div class="grid grid-cols-4 items-center gap-4">
                    <Label class="text-right"> Icon </Label>
                    <div class="col-span-3">
                        <Select v-model="selectedIcon">
                            <SelectTrigger>
                                <SelectValue placeholder="Select an icon">
                                    <div class="flex items-center gap-2">
                                        <template v-if="selectedIcon">
                                            <component
                                                :is="Icons[selectedIcon]"
                                                class="size-5 w-8"
                                                :color="color"
                                            />
                                            {{ selectedIcon }}
                                        </template>
                                        <span v-else class="text-gray-500">
                                            No Icon
                                        </span>
                                    </div>
                                </SelectValue>
                            </SelectTrigger>

                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem :value="undefined">
                                        No Icon
                                    </SelectItem>
                                    <SelectItem
                                        v-for="(icon, name) in Icons"
                                        :value="name"
                                        :key="name"
                                    >
                                        <div class="flex items-center gap-2">
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

                <div class="grid grid-cols-4 items-center gap-4">
                    <Label class="text-right"> Icon color </Label>
                    <Input v-model="color" type="color" />
                </div>
            </div>

            <DialogFooter>
                <Button variant="secondary" @click="isModalOpen = false">
                    Cancel
                </Button>

                <Button :disabled="!isSaveEnabled" @click="emitSave">
                    {{ submitLabel }}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

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

import type { IconKeys, Songbook } from "@/types";

import { Icons } from "@/lib/icons";

interface Props {
    titleText: string;
    submitLabel: string;
    songbook?: Songbook;
}
const props = defineProps<Props>();
const emit = defineEmits(["save", "update:modelValue"]);
const isModalOpen = defineModel<boolean>("isModalOpen", { default: false });

const title = ref(props.songbook?.title ?? "");
const selectedIcon = ref<IconKeys | undefined>(props.songbook?.icon);
const color = ref(props.songbook?.color ?? "#000000");

const isSaveEnabled = computed(() => !!title.value && !!selectedIcon.value);

const emitSave = () => {
    if (!isSaveEnabled.value) {
        return;
    }

    emit("save", {
        ...props.songbook,
        title: title.value,
        icon: selectedIcon.value,
        color: color.value,
    });
};
</script>

<template>
    <Sheet>
        <SheetTrigger asChild>
            <Button size="icon" variant="ghost">
                <SettingsIcon class="inline h-6 w-6" />
            </Button>
        </SheetTrigger>
        <SheetContent>
            <SheetHeader>
                <SheetTitle> Config </SheetTitle>
            </SheetHeader>
            <div className="grid flex-1 auto-rows-min gap-6 mt-4">
                <Label class="flex items-center gap-2">
                    <Switch v-model="showTitlesOnly" />
                    <span v-if="showTitlesOnly">Showing Only Titles</span>
                    <span v-else>Showing Full Songs</span>
                </Label>

                <Label for="columns" class="flex">
                    <NumberField
                        v-model="numberOfColumns"
                        id="columns"
                        :default-value="2"
                        :min="1"
                        :max="10"
                    >
                        <NumberFieldContent class="w-20">
                            <NumberFieldDecrement />
                            <NumberFieldInput class="border-none shadow-none" />
                            <NumberFieldIncrement />
                        </NumberFieldContent>
                    </NumberField>
                    <span>{{
                        numberOfColumns === 1 ? "Column" : "Columns"
                    }}</span>
                </Label>
            </div>
        </SheetContent>
    </Sheet>
</template>

<script setup lang="ts">
import { SettingsIcon } from "lucide-vue-next";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    NumberField,
    NumberFieldContent,
    NumberFieldDecrement,
    NumberFieldIncrement,
    NumberFieldInput,
} from "@/components/ui/number-field";
import Sheet from "@/components/ui/sheet/Sheet.vue";
import SheetContent from "@/components/ui/sheet/SheetContent.vue";
import SheetTitle from "@/components/ui/sheet/SheetTitle.vue";
import SheetTrigger from "@/components/ui/sheet/SheetTrigger.vue";
import Switch from "@/components/ui/switch/Switch.vue";

const showTitlesOnly = defineModel("showTitlesOnly", { default: true });
const numberOfColumns = defineModel("numberOfColumns", { default: 2 });
</script>

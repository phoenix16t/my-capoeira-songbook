<template>
    <Sheet>
        <SheetTrigger asChild>
            <Button variant="outline">Config</Button>
        </SheetTrigger>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Config</SheetTitle>
            </SheetHeader>
            <div className="grid flex-1 auto-rows-min gap-6 px-4">
                <div>
                    <Label class="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            v-model="showTranslation"
                            class="accent-blue-600"
                        />
                        <span>Show Translation</span>
                    </Label>
                </div>

                <div>
                    <Label class="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            v-model="showDetails"
                            class="accent-blue-600"
                        />
                        <span>Show Details</span>
                    </Label>
                </div>
            </div>
        </SheetContent>
    </Sheet>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Sheet from "@/components/ui/sheet/Sheet.vue";
import SheetContent from "@/components/ui/sheet/SheetContent.vue";
import SheetTitle from "@/components/ui/sheet/SheetTitle.vue";
import SheetTrigger from "@/components/ui/sheet/SheetTrigger.vue";

const showDetails = defineModel("showDetails", { default: true });
const showTranslation = defineModel("showTranslation", { default: false });
</script>

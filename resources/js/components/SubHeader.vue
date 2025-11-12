<template>
    <header
        class="flex h-15 items-center justify-between border-b bg-white px-8 py-4 shadow-sm"
    >
        <h2 class="flex items-center text-xl font-semibold">
            <slot name="title" />
        </h2>

        <Sheet v-if="slots.menu">
            <SheetTrigger asChild>
                <Button size="icon" variant="ghost" data-testid="toggle-menu">
                    <SettingsIcon class="inline size-5" />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle class="text-lg"> Settings </SheetTitle>
                </SheetHeader>
                <div className="mt-4 flex flex-col gap-4">
                    <slot name="menu" />
                </div>
            </SheetContent>
        </Sheet>
    </header>
</template>

<script setup lang="ts">
import { SettingsIcon } from "lucide-vue-next";
import { useSlots } from "vue";

import { Button } from "@/components/ui/button";
import Sheet from "@/components/ui/sheet/Sheet.vue";
import SheetContent from "@/components/ui/sheet/SheetContent.vue";
import SheetTitle from "@/components/ui/sheet/SheetTitle.vue";
import SheetTrigger from "@/components/ui/sheet/SheetTrigger.vue";

const slots = useSlots();
</script>

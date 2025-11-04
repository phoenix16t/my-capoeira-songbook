<template>
    <header
        class="flex h-15 items-center justify-between border-b bg-white px-8 py-4 shadow-sm"
    >
        <h2 class="flex items-center gap-2 text-xl font-semibold">
            <slot name="title" />
        </h2>

        <!-- <div class="flex items-center justify-center gap-2">
            <slot name="search" />
        </div> -->

        <Sheet v-if="slots.menu">
            <SheetTrigger asChild>
                <Button size="icon" variant="ghost">
                    <SettingsIcon class="inline size-5" />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle> Config </SheetTitle>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-6 mt-4">
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

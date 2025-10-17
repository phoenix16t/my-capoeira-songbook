<template>
    <header
        class="flex h-15 items-center justify-between border-b bg-white px-8 py-4 shadow-sm"
    >
        <h2 class="text-xl font-semibold">{{ title }}</h2>

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
                    <slot />
                </div>
            </SheetContent>
        </Sheet>
    </header>
</template>

<script setup lang="ts">
import { SettingsIcon } from "lucide-vue-next";

import { Button } from "@/components/ui/button";
import Sheet from "@/components/ui/sheet/Sheet.vue";
import SheetContent from "@/components/ui/sheet/SheetContent.vue";
import SheetTitle from "@/components/ui/sheet/SheetTitle.vue";
import SheetTrigger from "@/components/ui/sheet/SheetTrigger.vue";

defineProps<{
    title: string;
}>();
</script>

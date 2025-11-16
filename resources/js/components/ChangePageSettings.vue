<template>
    <Tooltip text="Change page settings">
        <Button
            size="icon"
            variant="ghost"
            data-testid="toggle-menu"
            @click="open = true"
        >
            <SettingsIcon class="inline size-5" />
        </Button>
    </Tooltip>

    <Sheet v-model:open="open">
        <SheetContent>
            <SheetHeader>
                <SheetTitle class="text-lg"> Settings </SheetTitle>
            </SheetHeader>
            <div className="mt-4 flex flex-col gap-4">
                <slot />
            </div>
        </SheetContent>
    </Sheet>
</template>

<script setup lang="ts">
import { SettingsIcon } from "lucide-vue-next";
import { ref } from "vue";

import Tooltip from "@/components/Tooltip.vue";
import { Button } from "@/components/ui/button";
import Sheet from "@/components/ui/sheet/Sheet.vue";
import SheetContent from "@/components/ui/sheet/SheetContent.vue";
import SheetTitle from "@/components/ui/sheet/SheetTitle.vue";

const open = ref(false);
</script>

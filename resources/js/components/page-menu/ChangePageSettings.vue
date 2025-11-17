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
                <SheetTitle class="text-lg">
                    {{ header }}
                </SheetTitle>
            </SheetHeader>
            <div className="mt-4 flex flex-col gap-4">
                <slot name="menu" />
                <div v-if="hasActionsSlot" class="flex flex-col gap-1">
                    <h3 class="text-lg">Actions</h3>
                    <slot name="actions" />
                </div>
            </div>
        </SheetContent>
    </Sheet>
</template>

<script setup lang="ts">
import { SettingsIcon } from "lucide-vue-next";
import { computed, ref, useSlots } from "vue";

import Tooltip from "@/components/Tooltip.vue";
import { Button } from "@/components/ui/button";
import Sheet from "@/components/ui/sheet/Sheet.vue";
import SheetContent from "@/components/ui/sheet/SheetContent.vue";
import SheetTitle from "@/components/ui/sheet/SheetTitle.vue";

interface Props {
    header: string;
}
defineProps<Props>();

const slots = useSlots();

const open = ref(false);

const hasActionsSlot = computed(() => {
    return slots.actions?.().some((action) => !!action.key);
});
</script>

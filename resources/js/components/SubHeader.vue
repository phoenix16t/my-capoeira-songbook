<template>
    <header
        class="flex items-center justify-between border-b bg-white px-8 py-1 shadow-sm"
    >
        <h2 class="flex min-w-0 items-center text-xl font-semibold">
            <slot name="icon" />
            <EllipsisText :clamp="2">
                <slot name="title" />
            </EllipsisText>
        </h2>

        <div class="flex gap-1">
            <slot name="search" />

            <CreateSongbookDialog
                v-if="isAuthenticated"
                size="icon"
                variant="ghost"
            >
                <PlusIcon class="size-5" />
            </CreateSongbookDialog>

            <!-- <CreateSongbookDialog
                v-if="isAuthenticated && route().current() === 'songbooks.show'"
                size="icon"
                variant="ghost"
            >
                <PencilIcon class="size-5" />
            </CreateSongbookDialog> -->

            <Sheet v-if="slots.menu">
                <SheetTrigger asChild>
                    <Button
                        size="icon"
                        variant="ghost"
                        data-testid="toggle-menu"
                    >
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
        </div>
    </header>
</template>

<script setup lang="ts">
import { usePage } from "@inertiajs/vue3";
import { PencilIcon, PlusIcon, SettingsIcon } from "lucide-vue-next";
import { computed, useSlots } from "vue";
import { route } from "ziggy-js";

import EllipsisText from "@/components/EllipsisText.vue";
import CreateSongbookDialog from "@/components/dialogs/CreateSongbookDialog.vue";
import { Button } from "@/components/ui/button";
import Sheet from "@/components/ui/sheet/Sheet.vue";
import SheetContent from "@/components/ui/sheet/SheetContent.vue";
import SheetTitle from "@/components/ui/sheet/SheetTitle.vue";
import SheetTrigger from "@/components/ui/sheet/SheetTrigger.vue";

const page = usePage();
const slots = useSlots();

const isAuthenticated = computed(() => !!page.props.auth.user);
</script>

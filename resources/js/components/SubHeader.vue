<template>
    <header
        :class="
            cn(
                'sticky top-0 flex w-full items-center justify-between border-b bg-white px-8 py-2 shadow-sm',
                {
                    'h-16': state === 'expanded',
                    'h-12': state !== 'expanded',
                },
            )
        "
    >
        <SidebarTrigger />

        <h2 class="flex min-w-0 items-center text-xl font-semibold">
            <slot name="icon" />
            <EllipsisText :clamp="2">
                <slot name="title" />
            </EllipsisText>
        </h2>

        <slot name="new_search" />

        <div class="flex gap-1">
            <CreateSongbookDialog size="icon" variant="ghost">
                <PlusIcon class="size-5" />
            </CreateSongbookDialog>

            <EditSongbookDialog
                v-if="page.props.isAuthenticated && page.props.songbook"
                :songbook="page.props.songbook"
                size="icon"
                variant="ghost"
            >
                <PencilIcon class="size-5" />
            </EditSongbookDialog>

            <slot name="menu" />
        </div>
    </header>
</template>

<script setup lang="ts">
import { usePage } from "@inertiajs/vue3";
import { PencilIcon, PlusIcon } from "lucide-vue-next";

import EllipsisText from "@/components/EllipsisText.vue";
import CreateSongbookDialog from "@/components/dialogs/CreateSongbookDialog.vue";
import EditSongbookDialog from "@/components/dialogs/EditSongbookDialog.vue";

import { cn } from "@/lib/utils";

import SidebarTrigger from "./ui/sidebar/SidebarTrigger.vue";
import { useSidebar } from "./ui/sidebar/utils";

const { state } = useSidebar();

const page = usePage();
</script>

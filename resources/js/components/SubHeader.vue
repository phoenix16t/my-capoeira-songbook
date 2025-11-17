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

const page = usePage();
</script>

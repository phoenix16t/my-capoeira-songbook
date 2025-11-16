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

            <EditSongbookDialog
                v-if="isAuthenticated && page.props.songbook"
                :songbook="page.props.songbook"
                size="icon"
                variant="ghost"
            >
                <PencilIcon class="size-5" />
            </EditSongbookDialog>

            <ChangePageSettings v-if="slots.menu">
                <slot name="menu" />
            </ChangePageSettings>
        </div>
    </header>
</template>

<script setup lang="ts">
import { usePage } from "@inertiajs/vue3";
import { PencilIcon, PlusIcon } from "lucide-vue-next";
import { computed, useSlots } from "vue";

import ChangePageSettings from "@/components/ChangePageSettings.vue";
import EllipsisText from "@/components/EllipsisText.vue";
import CreateSongbookDialog from "@/components/dialogs/CreateSongbookDialog.vue";
import EditSongbookDialog from "@/components/dialogs/EditSongbookDialog.vue";

const page = usePage();
const slots = useSlots();

const isAuthenticated = computed(() => !!page.props.auth.user);
</script>

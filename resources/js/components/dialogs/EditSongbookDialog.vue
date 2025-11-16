<template>
    <Tooltip text="Edit this songbook">
        <Button :size="size" :variant="variant" @click="isModalOpen = true">
            <slot />
        </Button>
    </Tooltip>

    <SongbookModal
        v-model:isModalOpen="isModalOpen"
        titleText="Edit songbook"
        submitLabel="Save changes"
        :songbook="songbook"
        @save="updateSongbook"
    />
</template>

<script setup lang="ts">
import { router } from "@inertiajs/vue3";
import { ref } from "vue";
import { route } from "ziggy-js";

import Tooltip from "@/components/Tooltip.vue";
import SongbookModal from "@/components/dialogs/SongbookModal.vue";
import { Button, type ButtonVariants } from "@/components/ui/button";

import type { Songbook } from "@/types";

import { handleErrorToast, handleSuccessToast } from "@/lib/helpers";

interface Props {
    songbook: Songbook;
    size?: ButtonVariants["size"];
    variant?: ButtonVariants["variant"];
}
defineProps<Props>();

const isModalOpen = ref(false);

function updateSongbook(payload: Songbook) {
    router.put(route("songbooks.update", payload.id), payload, {
        onSuccess: () =>
            handleSuccessToast(`Songbook ${payload.title} updated!`),
        onError: () => handleErrorToast("Error updating songbook"),
        onFinish: () => (isModalOpen.value = false),
    });
}
</script>

<template>
    <Tooltip text="Create a songbook">
        <Button :size="size" :variant="variant" @click="isModalOpen = true">
            <slot />
        </Button>
    </Tooltip>

    <SongbookModal
        v-model:isModalOpen="isModalOpen"
        titleText="Create new songbook"
        submitLabel="Create"
        @save="createSongbook"
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
    size?: ButtonVariants["size"];
    variant?: ButtonVariants["variant"];
}
defineProps<Props>();

const isModalOpen = ref(false);

const createSongbook = (payload: Songbook) => {
    router.post(route("songbooks.store"), payload, {
        onSuccess: () =>
            handleSuccessToast(`Songbook ${payload.title} created!`),
        onError: () => handleErrorToast("Error creating songbook"),
        onFinish: () => (isModalOpen.value = false),
    });
};
</script>

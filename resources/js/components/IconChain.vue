<template>
    <div class="flex">
        <template v-for="songbook in songbooks?.sort((a, b) => a.id - b.id)">
            <component
                v-if="songbook.icon"
                :is="Icons[songbook.icon]"
                class="size-5 w-5"
                :color="songbook.color"
            />
        </template>
    </div>
</template>

<script setup lang="ts">
import type { Songbook } from "@/types";

import { Icons } from "@/lib/icons";

interface Props {
    songbooks: Songbook[] | undefined;
}

defineProps<Props>();
</script>

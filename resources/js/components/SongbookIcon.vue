<template>
    <component
        v-if="songbook.icon"
        :is="Icons[songbook.icon]"
        class="songbook-icon mr-2 size-5 min-w-5"
        :color="songbook.color"
        :data-testid="testTag ? songbook.title : null"
    />
</template>

<script setup lang="ts">
import type { Songbook } from "@/types";

import { Icons } from "@/lib/icons";

interface Props {
    testTag?: boolean;
    songbook: Songbook;
}
defineProps<Props>();
</script>

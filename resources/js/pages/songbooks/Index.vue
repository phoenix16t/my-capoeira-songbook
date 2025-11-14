<template>
    <div class="overflow-auto">
        <SubHeader>
            <template #title> My Songbooks </template>
        </SubHeader>

        <div
            class="grid grid-cols-1 gap-4 px-8 py-4 sm:grid-cols-2 md:grid-cols-3"
        >
            <template v-if="songbooks.length">
                <Link
                    v-for="songbook in songbooks"
                    :href="route('songbooks.show', songbook.id)"
                    class="flex"
                    data-testid="songbook-link"
                >
                    <Card
                        class="flex w-full overflow-hidden px-4 py-2 transition-all hover:shadow-lg"
                    >
                        <div
                            class="flex min-w-0 items-center justify-start gap-2"
                        >
                            <SongbookIcon :songbook="songbook" />
                            <EllipsisText>
                                {{ songbook.title }}
                            </EllipsisText>
                        </div>
                    </Card>
                </Link>
            </template>
            <div v-else>
                You have no songbooks.
                <CreateSongbookDialog variant="outline">
                    Create one!
                </CreateSongbookDialog>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Link } from "@inertiajs/vue3";
import { route } from "ziggy-js";

import Card from "@/components/Card.vue";
import CreateSongbookDialog from "@/components/CreateSongbookDialog.vue";
import EllipsisText from "@/components/EllipsisText.vue";
import SongbookIcon from "@/components/SongbookIcon.vue";
import SubHeader from "@/components/SubHeader.vue";

import type { Songbook } from "@/types";

interface Props {
    songbooks: Songbook[];
}
defineProps<Props>();
</script>

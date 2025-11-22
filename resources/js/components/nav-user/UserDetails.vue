<template>
    <div class="flex items-center">
        <Avatar class="mr-4 h-8 w-8 rounded-lg">
            <AvatarImage :src="user.avatar" :alt="user.name" />
            <AvatarFallback class="rounded-lg">
                {{ user?.name ? getInitials(user.name) : "G" }}
            </AvatarFallback>
        </Avatar>
        <div class="grid flex-1 text-left text-sm leading-tight">
            <span class="truncate font-semibold">
                {{ user?.name ?? "Guest" }}
            </span>
            <span class="truncate text-xs">
                {{ user.email }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePage } from "@inertiajs/vue3";
import { computed } from "vue";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { getInitials } from "@/lib/helpers";

defineProps<{
    user: {
        name: string;
        email: string;
        avatar: string;
    };
}>();

const page = usePage();

const user = computed(() => page.props.auth.user || {});
</script>

<template>
    <InputGroup>
        <InputGroupInput v-model="searchQuery" placeholder="Search..." />
        <InputGroupAddon>
            <SearchIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
            {{ count }} songs
        </InputGroupAddon>
    </InputGroup>
</template>

<script setup lang="ts">
import { SearchIcon } from "lucide-vue-next";

import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";

defineProps<{
    count: number;
}>();

const searchQuery = defineModel<string>("searchQuery", { default: "" });
</script>

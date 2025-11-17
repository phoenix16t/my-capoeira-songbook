<template>
    <Button
        variant="smallLink"
        size="icon"
        class="ml-2"
        @click="searchQuery = ''"
    >
        Clear
    </Button>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";

const searchQuery = defineModel<string>("searchQuery", { default: "" });
</script>

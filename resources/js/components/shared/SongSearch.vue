<template>
    <div class="flex flex-col">
        <div class="flex items-baseline">
            <h3 class="text-lg">Search Songs</h3>
            <Button
                variant="smallLink"
                size="icon"
                class="ml-2"
                @click="searchQuery = ''"
            >
                Clear
            </Button>
        </div>
        <Input
            v-model="searchQuery"
            id="search"
            class="rounded border"
            type="text"
            data-testid="search"
        />
    </div>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input/Input.vue";

const searchQuery = defineModel<string>("searchQuery", { default: "" });
</script>

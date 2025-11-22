<template>
    <SidebarMenu>
        <SidebarMenuItem>
            <UserDetails
                v-if="!page.props.auth.user"
                class="py-4"
                :user="user"
            />
            <Accordion v-if="!!page.props.auth.user" type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>
                        <UserDetails :user="user" />
                    </AccordionTrigger>
                    <AccordionContent class="block">
                        <Button class="w-full" @click="logout">
                            <LogOut />
                            Log out
                        </Button>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </SidebarMenuItem>
    </SidebarMenu>
</template>

<script setup lang="ts">
import { router, usePage } from "@inertiajs/vue3";
import { route } from "ziggy-js";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

import UserDetails from "./UserDetails.vue";

defineProps<{
    user: {
        name: string;
        email: string;
        avatar: string;
    };
}>();

const page = usePage();

const logout = () => {
    router.visit(route("logout"), {
        method: "post",
        onSuccess: () => {
            window.location.reload();
        },
    });
};
</script>

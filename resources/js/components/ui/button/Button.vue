<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui";
import { Primitive } from "reka-ui";
import type { HTMLAttributes } from "vue";

import { cn } from "@/lib/utils";

import type { ButtonVariants } from ".";
import { buttonVariants } from ".";

interface Props extends /* @vue-ignore */ PrimitiveProps {
    variant?: ButtonVariants["variant"];
    size?: ButtonVariants["size"];
    class?: HTMLAttributes["class"];
    disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    as: "button",
    disabled: false,
});
</script>

<template>
    <Primitive
        data-slot="button"
        :as="as"
        :as-child="asChild"
        :disabled="disabled"
        :class="
            cn(
                buttonVariants({ variant, size }),
                props.class,
                disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
            )
        "
    >
        <slot />
    </Primitive>
</template>

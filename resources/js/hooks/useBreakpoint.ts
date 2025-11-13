import { useWindowSize } from "@vueuse/core";
import { computed } from "vue";

const breakpoints = {
    xs: 480,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
};

const breakpointOrder = ["default", "xs", "sm", "md", "lg", "xl"];

export function useBreakpoint() {
    const { width } = useWindowSize();

    const breakpoint = computed(() => {
        const w = width.value;
        if (w < breakpoints.xs) return "default";
        if (w < breakpoints.sm) return "xs";
        if (w < breakpoints.md) return "sm";
        if (w < breakpoints.lg) return "md";
        if (w < breakpoints.xl) return "lg";
        return "xl";
    });

    const isSmallerThan = (bp) => {
        const targetIndex = breakpointOrder.indexOf(bp);
        const currentIndex = breakpointOrder.indexOf(breakpoint.value);
        if (targetIndex === -1 || currentIndex === -1) {
            console.warn(
                `[useBreakpoint] Unknown breakpoint: ${bp} or ${breakpoint.value}`,
            );
            return false;
        }
        return currentIndex < targetIndex;
    };

    return { breakpoint, isSmallerThan };
}

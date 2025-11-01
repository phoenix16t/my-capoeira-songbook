import { router } from "@inertiajs/vue3";
import { type Ref, watch } from "vue";
import { toast } from "vue-sonner";
import { route } from "ziggy-js";

const handleSuccessToast = (text: string) => {
    toast.success(text, {
        style: {
            background: "#6ee7b7",
        },
    });
};

const handleErrorToast = () => {
    toast.error("Error changing permission", {
        style: {
            background: "#e76e9e",
        },
    });
};

export function usePermissionWatcher(
    refField: Ref<any>,
    fieldName: string,
    successMessageFn: (newVal: any) => string,
) {
    watch(refField, (newVal, oldVal) => {
        const previous = oldVal;
        const successText = successMessageFn(newVal);

        router.post(
            route("permissions.update"),
            { [fieldName]: newVal },
            {
                onSuccess: () => handleSuccessToast(successText),
                onError: () => {
                    refField.value = previous;
                    handleErrorToast();
                },
            },
        );
    });
}

import { toast } from "vue-sonner";

export const handleSuccessToast = (text: string) => {
    toast.success(text, {
        style: {
            background: "#6ee7b7",
        },
    });
};

export const handleErrorToast = () => {
    toast.error("Error changing permission", {
        style: {
            background: "#e76e9e",
        },
    });
};

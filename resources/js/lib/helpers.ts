import { toast } from "vue-sonner";

export const handleSuccessToast = (text: string) => {
    toast.success(text, {
        style: {
            background: "#6ee7b7",
        },
    });
};

export const handleErrorToast = (text: string) => {
    toast.error(text, {
        style: {
            background: "#e76e9e",
        },
    });
};

export const getInitials = (name: string) => {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("");
};

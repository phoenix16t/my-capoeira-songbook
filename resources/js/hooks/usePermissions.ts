import { router, usePage } from "@inertiajs/vue3";
import { type Ref, computed, ref, watch } from "vue";
import { route } from "ziggy-js";

import { handleErrorToast, handleSuccessToast } from "@/lib/helpers.js";

export function usePermissions() {
    const page = usePage();

    const isAuthenticated = computed(() => !!page.props.auth.user);

    const numberOfColumns = ref(
        isAuthenticated.value
            ? (page.props.auth.user.permissions?.song_list_columns_number ?? 2)
            : Number(localStorage.getItem("song_list_columns_number") ?? 2),
    );

    const showDetails = ref(
        isAuthenticated.value
            ? page.props.auth.user.permissions?.song_show_details
            : localStorage.getItem("song_show_details") === "true",
    );

    const showFullSongs = ref(
        isAuthenticated.value
            ? page.props.auth.user.permissions?.song_list_show_full_songs
            : localStorage.getItem("song_list_show_full_songs") === "true",
    );

    const showSongbooks = ref(
        isAuthenticated.value
            ? page.props.auth.user.permissions?.song_show_songbooks
            : localStorage.getItem("song_show_songbooks") === "true",
    );

    const showTranslation = ref(
        isAuthenticated.value
            ? page.props.auth.user.permissions?.song_show_translation
            : localStorage.getItem("song_show_translation") === "true",
    );

    const translationType = ref(
        isAuthenticated.value
            ? (page.props.auth.user.permissions?.translation_type ?? "inline")
            : (localStorage.getItem("translation_type") ?? "inline"),
    );

    const refToFieldName = new Map([
        [numberOfColumns, "song_list_columns_number"],
        [showDetails, "song_show_details"],
        [showFullSongs, "song_list_show_full_songs"],
        [showSongbooks, "song_show_songbooks"],
        [showTranslation, "song_show_translation"],
        [translationType, "translation_type"],
    ]);

    const updatePermissions = (
        refField: Ref<any>,
        successMessageFn: (newVal: any) => string,
    ) => {
        watch(refField, (newVal, oldVal) => {
            const fieldName = refToFieldName.get(refField);
            if (!fieldName) {
                return;
            }

            const successText = successMessageFn(newVal);

            if (isAuthenticated.value) {
                router.post(
                    route("permissions.update"),
                    { [fieldName]: newVal },
                    {
                        onSuccess: () => handleSuccessToast(successText),
                        onError: () => {
                            refField.value = oldVal;
                            handleErrorToast("Error changing permission");
                        },
                    },
                );
            } else {
                localStorage.setItem(fieldName, newVal);
            }
        });
    };

    return {
        numberOfColumns,
        showDetails,
        showFullSongs,
        showSongbooks,
        showTranslation,
        translationType,
        updatePermissions,
    };
}

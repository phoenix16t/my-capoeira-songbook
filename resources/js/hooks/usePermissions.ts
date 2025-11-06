import { router, usePage } from "@inertiajs/vue3";
import { type Ref, computed, ref, watch } from "vue";
import { route } from "ziggy-js";

import { handleErrorToast, handleSuccessToast } from "@/lib/helpers.js";

export function usePermissions() {
    const page = usePage();

    const isAuthenticated = computed(() => !!page.props.auth.user);

    const watchPermissionsChanges = (
        refField: Ref<any>,
        fieldName: string,
        successMessageFn: (newVal: any) => string,
    ) => {
        watch(refField, (newVal, oldVal) => {
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
                handleSuccessToast(successText);
            }
        });
    };

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

    const songsShowSongbooks = ref(
        isAuthenticated.value
            ? page.props.auth.user.permissions?.song_show_songbooks
            : localStorage.getItem("song_show_songbooks") === "true",
    );

    const songlistShowSongbooks = ref(
        isAuthenticated.value
            ? page.props.auth.user.permissions?.songlist_show_songbooks
            : localStorage.getItem("songlist_show_songbooks") === "true",
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

    watchPermissionsChanges(showDetails, "song_show_details", (val) =>
        val ? "Showing Details" : "Not Showing Details",
    );

    watchPermissionsChanges(
        showFullSongs,
        "song_list_show_full_songs",
        (val) => (val ? "Showing Full Songs" : "Showing Titles Only"),
    );

    watchPermissionsChanges(songsShowSongbooks, "song_show_songbooks", (val) =>
        val ? "Showing Songbooks" : "Not Showing Songbooks",
    );

    watchPermissionsChanges(
        songlistShowSongbooks,
        "songlist_show_songbooks",
        (val) =>
            val ? "Showing Songbook Icons" : "Not Showing Songbook Icons",
    );

    watchPermissionsChanges(
        showTranslation,
        "song_show_translation",
        (val) => `${val ? "" : "Not"} Showing Translations`,
    );

    watchPermissionsChanges(
        numberOfColumns,
        "song_list_columns_number",
        (val) => `Showing ${val} column${val === 1 ? "" : "s"}`,
    );

    watchPermissionsChanges(translationType, "translation_type", (val) => {
        const type = val === "inline" ? "Inline" : "Side-By-Side";
        return `Showing ${type} Translations`;
    });

    return {
        numberOfColumns,
        showDetails,
        showFullSongs,
        songlistShowSongbooks,
        songsShowSongbooks,
        showTranslation,
        translationType,
    };
}

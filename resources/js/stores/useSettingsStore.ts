import { router } from "@inertiajs/vue3";
import { usePage } from "@inertiajs/vue3";
import { defineStore } from "pinia";
import { type Ref, computed, ref, watch, watchEffect } from "vue";
import { route } from "ziggy-js";

import { useBreakpoint } from "@/hooks/useBreakpoint.js";

import { handleErrorToast, handleSuccessToast } from "@/lib/helpers.js";

export const useSettingsStore = defineStore("settings", () => {
    const page = usePage();
    const { isSmallerThan } = useBreakpoint();

    const isAuthenticated = computed(() => !!page.props.auth.user);

    const numberOfColumns = ref(
        isAuthenticated.value
            ? (page.props.auth.user.settings?.song_list_columns_number ?? 2)
            : Number(localStorage.getItem("song_list_columns_number") ?? 2),
    );

    const showDetails = ref(
        isAuthenticated.value
            ? page.props.auth.user.settings?.song_show_details
            : localStorage.getItem("song_show_details") === "true",
    );

    const showFullSongs = ref(
        isAuthenticated.value
            ? page.props.auth.user.settings?.song_list_show_full_songs
            : localStorage.getItem("song_list_show_full_songs") === "true",
    );

    const songsShowSongbooks = ref(
        isAuthenticated.value
            ? page.props.auth.user.settings?.song_show_songbooks
            : localStorage.getItem("song_show_songbooks") === "true",
    );

    const songlistShowSongbookIcons = ref(
        isAuthenticated.value
            ? page.props.auth.user.settings?.songlist_show_songbooks
            : localStorage.getItem("songlist_show_songbooks") === "true",
    );

    const showTranslation = ref(
        isAuthenticated.value
            ? page.props.auth.user.settings?.song_show_translation
            : localStorage.getItem("song_show_translation") === "true",
    );

    const translationType = ref(
        isAuthenticated.value
            ? (page.props.auth.user.settings?.translation_type ?? "inline")
            : (localStorage.getItem("translation_type") ?? "inline"),
    );

    const watchSettingsChanges = (
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
                    route("settings.update"),
                    { [fieldName]: newVal },
                    {
                        onSuccess: () => handleSuccessToast(successText),
                        onError: () => {
                            refField.value = oldVal;
                            handleErrorToast("Error changing setting");
                        },
                    },
                );
            } else {
                localStorage.setItem(fieldName, newVal);
                handleSuccessToast(successText);
            }
        });
    };

    watchSettingsChanges(showDetails, "song_show_details", (val) =>
        val ? "Showing Details" : "Not Showing Details",
    );

    watchSettingsChanges(showFullSongs, "song_list_show_full_songs", (val) =>
        val ? "Showing Full Songs" : "Showing Titles Only",
    );

    watchSettingsChanges(songsShowSongbooks, "song_show_songbooks", (val) =>
        val ? "Showing Songbooks" : "Not Showing Songbooks",
    );

    watchSettingsChanges(
        songlistShowSongbookIcons,
        "songlist_show_songbooks",
        (val) =>
            val ? "Showing Songbook Icons" : "Not Showing Songbook Icons",
    );

    watchSettingsChanges(
        showTranslation,
        "song_show_translation",
        (val) => `${val ? "" : "Not"} Showing Translations`,
    );

    watchSettingsChanges(
        numberOfColumns,
        "song_list_columns_number",
        (val) => `Showing ${val} column${val === 1 ? "" : "s"}`,
    );

    watchSettingsChanges(translationType, "translation_type", (val) => {
        const type = val === "inline" ? "Inline" : "Side-By-Side";
        return `Showing ${type} Translations`;
    });

    watchEffect(() => {
        if (isSmallerThan("sm")) {
            numberOfColumns.value = 1;
        }
    });

    return {
        numberOfColumns,
        showDetails,
        showFullSongs,
        songsShowSongbooks,
        songlistShowSongbookIcons,
        showTranslation,
        translationType,
    };
});

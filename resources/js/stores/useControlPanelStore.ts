import { defineStore } from "pinia";

export const useControlPanelStore = defineStore("controlPanel", {
    state: () => ({
        showAllTitles: true,
        // showAuthors: true,
        // columns: 1,
    }),
    actions: {
        toggleTitles() {
            this.showAllTitles = !this.showAllTitles;
        },
        // toggleAuthors() {
        //     this.showAuthors = !this.showAuthors;
        // },
        // setColumns(count: number) {
        //     this.columns = count;
        // },
    },
});

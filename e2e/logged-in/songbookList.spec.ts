import { expect, test } from "@playwright/test";

import {
    clickSongbooksSongLink,
    findBoaViagemWrapper,
    resetSettings,
    withMenuOpen,
} from "../helpers";

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:8000/fake-login");
    await page.goto("http://localhost:8000/songbooks");
});

test("songbook button should be highlighted", async ({ page }) => {
    await expect(page.getByTestId("songbooks-page-button")).toContainClass(
        "bg-accent",
    );
});

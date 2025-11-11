import { expect, test } from "@playwright/test";

import {
    clickSongbooksSongLink,
    findBoaViagemWrapper,
    goToPermanentSongbook,
    resetSettings,
    withMenuOpen,
} from "../helpers";

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:8000/fake-login");
    await page.goto("http://localhost:8000/songs/5");
});

test("should show songbooks", async ({ page }) => {
    await withMenuOpen(page, async () => {
        await resetSettings(page);
        await page.getByTestId("show-songbooks-toggle").click();
    });

    await expect(page.getByTestId("songbook-links")).toBeVisible();
});

test("should be able to add songs to songbook", async ({ page }) => {
    const wrapper = findBoaViagemWrapper(page);
    const addToSongbookLink = page
        .getByTestId("add-song-to-songbook-link")
        .filter({
            has: page.locator("text=E2E Test Songbook - permanent"),
        });
    await expect(addToSongbookLink).toBeVisible();
    await addToSongbookLink.click();

    const testSongbook = await goToPermanentSongbook(page);
    await clickSongbooksSongLink(page, testSongbook);
    await expect(wrapper).toBeVisible();
});

test("should be able to remove songs from songbook", async ({ page }) => {
    const wrapper = findBoaViagemWrapper(page);
    const removeFromSongbookLink = page
        .getByTestId("remove-song-from-songbook-link")
        .filter({
            has: page.locator("text=E2E Test Songbook - permanent"),
        });
    await expect(removeFromSongbookLink).toBeVisible();
    await removeFromSongbookLink.click();

    const testSongbook = await goToPermanentSongbook(page);
    await clickSongbooksSongLink(page, testSongbook);
    await expect(wrapper).not.toBeVisible();
});

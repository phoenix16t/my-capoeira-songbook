import { expect, test } from "@playwright/test";

import {
    addSongToSongbook,
    clickSongbooksSongLink,
    findBoaViagemWrapper,
    goToPermanentSongbook,
    openRemoveFromSongbookDialog,
    resetSettings,
    withMenuOpen,
} from "../helpers";

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:8000/fake-login");

    await withMenuOpen(page, async () => {
        await resetSettings(page);
    });
});

test("should auto-close songbook when song is removed", async ({ page }) => {
    await addSongToSongbook(page);
    const testSongbook = await goToPermanentSongbook(page);
    await clickSongbooksSongLink(page, testSongbook);
    await openRemoveFromSongbookDialog(page);
    const removeLink = await page
        .getByTestId("remove-song-from-songbook-link")
        .filter({
            has: page.locator("text=E2E Test Songbook - permanent"),
        });

    await Promise.all([page.waitForURL(/\/songbooks/), removeLink.click()]);

    await expect(page).toHaveURL(/\/songbooks/);
});

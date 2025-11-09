import { expect, test } from "@playwright/test";

import {
    clickSongbooksSongLink,
    createTestSongbook,
    deleteTestSongbook,
    findBoaViagemWrapper,
    goHome,
    goToTestSongbook,
    resetSettings,
    withMenuOpen,
} from "../helpers";

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:8000/fake-login");

    await withMenuOpen(page, async () => {
        await resetSettings(page);
    });
});

test("add to songbooks links should be visible", async ({ page }) => {
    const count = await page.getByTestId("song-title-open-dialog-link").count();
    expect(count).toBeGreaterThan(0);
});

test("songbook button should not be highlighted", async ({ page }) => {
    await expect(page.getByTestId("songbooks-page-button")).not.toContainClass(
        "bg-accent",
    );
});

test("should be able to create and delete a songbook", async ({ page }) => {
    await createTestSongbook(page);
    await page.goto("http://localhost:8000/songbooks");
    const songbookLink = page.getByTestId("songbook-link").filter({
        has: page.locator("text=E2E Test Songbook"),
    });

    await expect(songbookLink).toBeVisible();
    const icon = songbookLink.locator('[data-testid="songbook-icon"]');
    await expect(icon).toHaveClass(/lucide-carrot/i);
    await expect(icon).toHaveCSS("stroke", "rgb(255, 102, 0)");

    await deleteTestSongbook(page);
    const deletedSongbook = page.getByTestId("songbook-link").filter({
        has: page.locator("text=E2E Test Songbook"),
    });
    await expect(deletedSongbook).toHaveCount(0);
});

test("should be able to add songs to songbook", async ({ page }) => {
    await createTestSongbook(page);

    // add song
    await goHome(page);
    let wrapper = findBoaViagemWrapper(page);
    let openDialogButton = wrapper.getByTestId("song-title-open-dialog-link");
    await openDialogButton.click();

    await expect(page.getByTestId("song-title-add-header")).toBeVisible();

    const addToSongbookLink = page
        .getByTestId("add-song-to-songbook-link")
        .filter({
            has: page.locator("text=E2E Test Songbook"),
        });
    await expect(addToSongbookLink).toBeVisible();

    await addToSongbookLink.click();

    // check if song was added
    let testSongbook = await goToTestSongbook(page);
    clickSongbooksSongLink(page, testSongbook);
    wrapper = findBoaViagemWrapper(page);
    await expect(wrapper).toBeVisible();

    // remove song
    await goHome(page);
    wrapper = findBoaViagemWrapper(page);
    openDialogButton = wrapper.getByTestId("song-title-open-dialog-link");
    await openDialogButton.click();

    await expect(page.getByTestId("song-title-add-header")).toBeVisible();

    const removeFromSongbookLink = page
        .getByTestId("remove-song-from-songbook-link")
        .filter({
            has: page.locator("text=E2E Test Songbook"),
        });
    await expect(removeFromSongbookLink).toBeVisible();

    await removeFromSongbookLink.click();

    // check if song was removed
    testSongbook = await goToTestSongbook(page);
    clickSongbooksSongLink(page, testSongbook);
    wrapper = findBoaViagemWrapper(page);
    await expect(wrapper).not.toBeVisible();

    await deleteTestSongbook(page);
});

import { expect, test } from "@playwright/test";

import {
    addSongToSongbook,
    clickSongbooksSongLink,
    findBoaViagemWrapper,
    goToPermanentSongbook,
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

test("should be able to add songs to songbook", async ({ page }) => {
    await addSongToSongbook(page);
    const wrapper = findBoaViagemWrapper(page);
    await expect(wrapper).toBeVisible();
});

test("should show a songbook icon", async ({ page }) => {
    await withMenuOpen(page, async () => {
        await page.getByTestId("show-songbook-icons-toggle").click();
    });

    const wrapper = findBoaViagemWrapper(page);
    const icon = wrapper.getByTestId("E2E Test Songbook - permanent");

    await expect(icon).toHaveCount(1);
    await expect(icon).toContainClass("lucide-gem");
    await expect(icon).toHaveCSS("stroke", "rgb(255, 0, 0)");
});

test("should be able to remove songs from songbook", async ({ page }) => {
    const wrapper = findBoaViagemWrapper(page);
    const openDialogButton = wrapper.getByTestId("song-title-open-dialog-link");
    await openDialogButton.click();
    await expect(page.getByTestId("song-title-add-header")).toBeVisible();

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

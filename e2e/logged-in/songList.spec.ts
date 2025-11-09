import { expect, test } from "@playwright/test";

import {
    createTestSongbook,
    deleteTestSongbook,
    resetSettings,
    withMenuOpen,
} from "../helpers";

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:8000/fake-login");

    await withMenuOpen(page, async () => {
        await resetSettings(page);
    });
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

    await deleteTestSongbook(page);
    const deletedSongbook = page.getByTestId("songbook-link").filter({
        has: page.locator("text=E2E Test Songbook"),
    });
    await expect(deletedSongbook).toHaveCount(0);
});

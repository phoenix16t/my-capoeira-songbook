import Songs from "@/resources/js/songs/index";
import { expect, test } from "@playwright/test";

import { createTestSongbook, deleteTestSongbook } from "../helpers";

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:8000/fake-login");
});

test("basic setup", async ({ page }) => {
    await expect(page).toHaveTitle(/My Capoeira Songbook/);
    await expect(page.getByTestId("create-songbook-button")).toBeVisible();
    await expect(page.getByTestId("songbooks-page-button")).toBeVisible();
});

test("should be able to create and delete a songbook", async ({ page }) => {
    await createTestSongbook(page);
    await page.goto("http://localhost:8000/songbooks");
    const songbookLink = page.getByTestId("songbook-link").filter({
        has: page.locator("text=E2E Test Songbook - temp"),
    });

    await expect(songbookLink).toBeVisible();
    const icon = songbookLink.locator(".songbook-icon");
    await expect(icon).toHaveClass(/lucide-carrot/i);
    await expect(icon).toHaveCSS("stroke", "rgb(255, 102, 0)");

    await deleteTestSongbook(page);
    const deletedSongbook = page.getByTestId("songbook-link").filter({
        has: page.locator("text=E2E Test Songbook - temp"),
    });
    await expect(deletedSongbook).toHaveCount(0);
});

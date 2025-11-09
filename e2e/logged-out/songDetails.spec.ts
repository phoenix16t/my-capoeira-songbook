import { expect, test } from "@playwright/test";

import { resetSettings, withMenuOpen } from "../helpers";

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:8000/songs/1");

    await withMenuOpen(page, async () => {
        await resetSettings(page);
    });
});

test("songs button should not be highlighted", async ({ page }) => {
    await expect(page.getByTestId("songs-page-button")).not.toContainClass(
        "bg-accent",
    );
});

test("should link back to song list", async ({ page }) => {
    await page.getByTestId("songs-page-button").click();
    await page.waitForURL("http://localhost:8000/");
    expect(page.url()).toBe("http://localhost:8000/");
});

test("should display full song", async ({ page }) => {
    const count = await page.getByText("Paraná ê, Paraná ê, Paraná").count();
    expect(count).toBeGreaterThan(1);
});

test("should show inline translations", async ({ page }) => {
    await withMenuOpen(page, async () => {
        await page.getByTestId("show-translation-toggle").click();
    });

    const container = page.locator('[data-testid="lyrics-container"]');
    await expect(container.getByText("Capoeira defeated me")).toBeVisible();
});

test("should show side-by-side translations", async ({ page }) => {
    await withMenuOpen(page, async () => {
        await page.getByTestId("show-translation-toggle").click();
        await page.getByTestId("show-side-by-side-translation").click();
    });

    const container = page.locator('[data-testid="translation-container"]');
    await expect(container.getByText("Capoeira defeated me")).toBeVisible();
});

test("should show details", async ({ page }) => {
    await withMenuOpen(page, async () => {
        await page.getByTestId("show-details-toggle").click();
    });

    await expect(page.getByTestId("details-container")).toBeVisible();
    await expect(page.getByTestId("links-container")).toBeVisible();
});

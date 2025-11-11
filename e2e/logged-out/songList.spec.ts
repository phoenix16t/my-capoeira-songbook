import { expect, test } from "@playwright/test";

import { goHome, resetSettings, withMenuOpen } from "../helpers";

test.beforeEach(async ({ page }) => {
    await goHome(page);

    await withMenuOpen(page, async () => {
        await resetSettings(page);
    });
});

test("should redirect from /songs to /", async ({ page }) => {
    await page.goto("http://localhost:8000/songs");
    await page.waitForURL("http://localhost:8000/");
    expect(page.url()).toBe("http://localhost:8000/");

    await expect(
        page.getByTestId("song-title-open-dialog-link"),
    ).not.toBeVisible();
});

test("icons setting should not be visible", async ({ page }) => {
    await withMenuOpen(page, async () => {
        await expect(
            page.getByTestId("show-songbook-icons-toggle"),
        ).not.toBeVisible();
    });
});

test("add to songbooks links should not be visible", async ({ page }) => {
    await expect(
        page.getByTestId("song-title-open-dialog-link"),
    ).not.toBeVisible();
});

test("songs button should be highlighted", async ({ page }) => {
    await expect(page.getByTestId("songs-page-button")).toContainClass(
        "bg-accent",
    );
});

test("only song titles should appear", async ({ page }) => {
    await expect(page.getByText("Boa viagem")).toBeVisible();
    await expect(page.getByText("Adeus, adeus")).not.toBeVisible();
});

test("full songs should appear", async ({ page }) => {
    await withMenuOpen(page, async () => {
        await page.getByTestId("show-full-song-toggle").click();
    });

    const count = await page.getByText("Boa viagem").count();
    expect(count).toBeGreaterThan(1);
    await expect(page.getByText("Adeus, adeus")).toBeVisible();
});

test("number of columns", async ({ page }) => {
    const gridContainer = await page.getByTestId("column-count");

    let gridTemplateColumns = await gridContainer.evaluate((el) =>
        getComputedStyle(el).getPropertyValue("grid-template-columns"),
    );
    let columnsArray = gridTemplateColumns
        .split(/[\s,]+/)
        .filter((value) => value.length > 0);
    let columnsCount = columnsArray.length;
    expect(columnsCount).toBe(1);

    await withMenuOpen(page, async () => {
        const upButton = await page.getByTestId("column-counter-up");
        await upButton.click();
        await upButton.click();
    });

    gridTemplateColumns = await gridContainer.evaluate((el) =>
        getComputedStyle(el).getPropertyValue("grid-template-columns"),
    );
    columnsArray = gridTemplateColumns
        .split(/[\s,]+/)
        .filter((value) => value.length > 0);
    columnsCount = columnsArray.length;
    expect(columnsCount).toBe(3);
});

test("search should filter", async ({ page }) => {
    await withMenuOpen(page, async () => {
        await page.getByTestId("search").fill("ai ai");
    });

    await expect(page.getByText("Ai ai, Aidê")).toBeVisible();
    await expect(page.getByText("São Bento me chama")).toBeVisible();
    await expect(page.getByText("Boa viagem")).not.toBeVisible();
});

test("titles should link out properly", async ({ page }) => {
    await Promise.all([
        page.waitForURL(/\/songs\/\d+/),
        page.getByTestId("song-title-link").first().click(),
    ]);

    const url = page.url();
    expect(url).toMatch(/^http:\/\/localhost:8000\/songs\/\d+$/);
});

test("full songs should link out properly", async ({ page }) => {
    await withMenuOpen(page, async () => {
        await page.getByTestId("show-full-song-toggle").click();
    });

    await Promise.all([
        page.waitForURL(/\/songs\/\d+/),
        page.getByTestId("song-full-link").first().click(),
    ]);

    const url = page.url();
    expect(url).toMatch(/^http:\/\/localhost:8000\/songs\/\d+$/);
});

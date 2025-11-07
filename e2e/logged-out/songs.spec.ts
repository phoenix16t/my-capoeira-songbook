import Songs from "@/resources/js/songs/index";
import { expect, test } from "@playwright/test";

async function resetSettings(page) {
    const toggles = page.locator(".setting-toggle");
    const count = await toggles.count();
    for (let i = 0; i < count; i++) {
        const toggle = toggles.nth(i);
        if (await toggle.isChecked()) {
            await toggle.click();
        }
    }

    const downButton = page.getByTestId("column-counter-down");
    for (let i = 0; i < 4; i++) {
        if (await downButton.isEnabled()) {
            await downButton.click();
        } else {
            break;
        }
    }

    await page.getByTestId("search").fill("");
}

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:8000/");

    await page.getByTestId("toggle-menu").click();
    await resetSettings(page);
    await page.getByTestId("close-menu").click();
});

test("should redirect from /songs to /", async ({ page }) => {
    await page.goto("http://localhost:8000/songs");
    await page.waitForLoadState("networkidle");
    expect(page.url()).toBe("http://localhost:8000/");
});

test("only song titles should appear", async ({ page }) => {
    await expect(page.getByText("Boa viagem")).toBeVisible();
    await expect(page.getByText("Adeus, adeus")).not.toBeVisible();
});

test("full songs should appear", async ({ page }) => {
    await page.getByTestId("toggle-menu").click();
    await page.getByTestId("show-full-song-toggle").click();
    await page.getByTestId("close-menu").click();

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

    await page.getByTestId("toggle-menu").click();
    const upButton = await page.getByTestId("column-counter-up");
    await upButton.click();
    await upButton.click();
    await page.getByTestId("close-menu").click();

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
    await page.getByTestId("toggle-menu").click();
    await page.getByTestId("search").fill("ai ai");
    await page.getByTestId("close-menu").click();

    await expect(page.getByText("Ai ai, Aidê")).toBeVisible();
    await expect(page.getByText("São Bento me chama")).toBeVisible();
    await expect(page.getByText("Boa viagem")).not.toBeVisible();
});

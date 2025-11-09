import Songs from "@/resources/js/songs/index";
import { expect, test } from "@playwright/test";

test("basic setup", async ({ page }) => {
    await page.goto("http://localhost:8000/fake-login");
    await expect(page).toHaveTitle(/My Capoeira Songbook/);
    await expect(page.getByTestId("create-songbook-button")).toBeVisible();
    await expect(page.getByTestId("songbooks-page-button")).toBeVisible();
});

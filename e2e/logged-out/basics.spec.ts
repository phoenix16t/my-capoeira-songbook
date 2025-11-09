import Songs from "@/resources/js/songs/index";
import { expect, test } from "@playwright/test";

import { goHome } from "../helpers";

test("basic setup", async ({ page }) => {
    await goHome(page);
    await expect(page).toHaveTitle(/My Capoeira Songbook/);
    await expect(page.getByTestId("create-songbook-button")).not.toBeVisible();
    await expect(page.getByTestId("songbooks-page-button")).not.toBeVisible();
});

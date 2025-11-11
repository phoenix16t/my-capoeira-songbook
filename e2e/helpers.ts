export async function withMenuOpen(page, action) {
    await page.getByTestId("toggle-menu").click();
    await action();
    await page.getByTestId("close-menu").click();
}

export async function resetSettings(page) {
    const translationToggle = page.getByTestId("show-translation-toggle");
    if ((await translationToggle.count()) > 0) {
        if (!(await translationToggle.isChecked())) {
            await translationToggle.click();
        }

        await page.getByTestId("show-inline-translation").click();
    }

    const toggles = page.locator(".setting-toggle");
    const count = await toggles.count();
    for (let i = 0; i < count; i++) {
        const toggle = toggles.nth(i);
        if (await toggle.isChecked()) {
            await toggle.click();
        }
    }

    const downButton = page.getByTestId("column-counter-down");
    if ((await downButton.count()) > 0) {
        for (let i = 0; i < 4; i++) {
            if (await downButton.isEnabled()) {
                await downButton.click();
            } else {
                break;
            }
        }
    }

    const searchInput = page.getByTestId("search");
    if ((await searchInput.count()) > 0) {
        await searchInput.fill("");
    }
}

export async function createTestSongbook(page) {
    await page.getByTestId("create-songbook-button").click();

    await page
        .getByTestId("create-songbook-name")
        .fill("E2E Test Songbook - temp");
    await page.getByTestId("create-songbook-select").click();
    const carrotIcon = page.locator('[data-testid="create-songbook-icon"]', {
        hasText: "Carrot",
    });
    await carrotIcon.click();
    await page.getByTestId("create-songbook-color").fill("#ff6600");

    await page.getByTestId("create-songbook-save").click();
}

export async function deleteTestSongbook(page) {
    const testSongbook = await goToTempSongbook(page);
    clickSongbooksSongLink(page, testSongbook);

    await page.getByTestId("toggle-menu").click();
    await page.getByTestId("delete-songbook-button").click();
    await page.getByTestId("delete-songbook-confirm").click();
}

export async function goToTempSongbook(page) {
    await page.goto("http://localhost:8000/songbooks");
    return page.getByTestId("songbook-link").filter({
        has: page.locator("text=E2E Test Songbook - temp"),
    });
}

export async function goToPermanentSongbook(page) {
    await page.goto("http://localhost:8000/songbooks");
    return page.getByTestId("songbook-link").filter({
        has: page.locator("text=E2E Test Songbook - permanent"),
    });
}

export async function clickSongbooksSongLink(page, testSongbook) {
    await Promise.all([
        page.waitForURL(/\/songbooks\/\d+/),
        testSongbook.first().click(),
    ]);
}

export async function goHome(page) {
    await page.goto("http://localhost:8000/");
}

export function findBoaViagemWrapper(page) {
    return page.getByTestId("song-title-wrapper").filter({
        has: page.getByTestId("song-title-link").filter({
            hasText: "Boa viagem",
        }),
    });
}

export async function openAddToSongbookDialog(page) {
    const wrapper = findBoaViagemWrapper(page);
    const openDialogButton = wrapper.getByTestId("song-title-open-dialog-link");
    await openDialogButton.click();

    return page.getByTestId("add-song-to-songbook-link").filter({
        has: page.locator("text=E2E Test Songbook - permanent"),
    });
}

export async function openRemoveFromSongbookDialog(page) {
    const wrapper = findBoaViagemWrapper(page);
    const openDialogButton = wrapper.getByTestId("song-title-open-dialog-link");
    await openDialogButton.click();

    return page.getByTestId("remove-song-from-songbook-link").filter({
        has: page.locator("text=E2E Test Songbook - permanent"),
    });
}

export async function addSongToSongbook(page) {
    const addToSongbookLink = await openAddToSongbookDialog(page);
    await addToSongbookLink.click();
    const testSongbook = await goToPermanentSongbook(page);
    await clickSongbooksSongLink(page, testSongbook);
}

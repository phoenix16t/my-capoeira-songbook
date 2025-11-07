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

import { Page } from "playwright/test";

export class BasePage{
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(){
        await this.page.goto('/');
    }
    async  dismissPopups(page: Page) {
        const possibleClosers = [
            page.locator('button:has-text("Close")'),
            page.locator('button:has-text("×")'),
            page.locator('[aria-label="close"]'),
            page.locator('.modal .close'),
        ];

        for (const locator of possibleClosers) {
            try {
            if (await locator.first().isVisible({ timeout: 1000 })) {
                await locator.first().click();
            }
            } catch {}
        }
    }
}
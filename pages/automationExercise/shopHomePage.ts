import { expect, Locator, Page } from "playwright/test";
import { BasePage } from "./basePage";

export class ShopHomePage extends BasePage {
    readonly signUpLoginHeader: Locator;
    readonly productsHeader: Locator;
    readonly consentCookiesButton: Locator;
    readonly subscriptionEmailField: Locator;
    readonly submitEmailSubscriptionButton: Locator;
    readonly successSubscriptionAlert: Locator;
    readonly descriptionHeading: Locator;

    constructor(page: Page){
        super(page);
        this.signUpLoginHeader = this.page.getByRole('link', { name: 'Signup / Login' });
        this.productsHeader = this.page.getByRole('link', { name: 'Products' });
        this.consentCookiesButton = this.page.getByRole('button', { name: "Consent"});
        this.subscriptionEmailField = this.page.locator('#susbscribe_email');
        this.submitEmailSubscriptionButton = this.page.locator('button#subscribe');
        this.successSubscriptionAlert = this.page.locator('#success-subscribe');
        this.descriptionHeading = this.page.getByRole('heading', { name: "Full-Fledged practice website for Automation Engineers", level: 2});
    }

    async assertOnHomePage(){
        await expect(this.descriptionHeading).toBeVisible();
    }

    async openLoginPage(){
        this.signUpLoginHeader.click();
    }

    async openProductsPage(){
        await this.productsHeader.click();
    }

    async goto(){
        await this.page.goto('/');
    }

    async assertUserIsLoggedUponAccountCreation(username: string){
        await expect(this.page.getByText(`Logged in as ${username}`)).toBeVisible();
    }

    async giveConsent(){
        await this.consentCookiesButton.click();
    }

    async enterEmailForSubscription(email: string){
        await this.subscriptionEmailField.scrollIntoViewIfNeeded({ timeout: 5000});
        await this.subscriptionEmailField.fill(email);
    }

    async submitEmailForSubscription(){
        await this.submitEmailSubscriptionButton.click();
        await this.successSubscriptionAlert.waitFor({ state: "attached", timeout: 5000 });
    }

    async assertSubscriptionSuccessAlert(){
        await expect(this.successSubscriptionAlert).toBeVisible({ timeout: 5000});
        const actualMessage = await this.successSubscriptionAlert.textContent();
        const message = actualMessage?.trim().replace(/\s+/g, " ");
        expect(message).toBe("You have been successfully subscribed!");
    }

    async assertSubscriptionEmailFieldIsCleared(){
        await expect(this.subscriptionEmailField).toBeEmpty();
    }
}
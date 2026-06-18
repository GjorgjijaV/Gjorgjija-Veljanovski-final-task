import { expect, Locator, Page } from "playwright/test";
import { BasePage } from "./basePage";

export class PaymentConfirmationPage extends BasePage {

    readonly confirmationMessage: Locator;

    constructor(page: Page){
        super(page);
        this.confirmationMessage = this.page.getByText('Order Placed!');
    }

    async assertConfirmationMessageIsDisplayed(){
        await expect(this.confirmationMessage).toBeVisible();
        await expect(this.confirmationMessage).toHaveText('Order Placed!');
    }

    async assertUrlContains(){
        expect(this.page.url()).toContain('/payment_done/');
    }

    async assertOrderIdIsDisplayedInUrlPath(){
        const orderId = Number(this.page.url().split('/').pop());
        expect(orderId).not.toBeNaN();
        expect(Number.isInteger(orderId)).toBeTruthy();
    }
}
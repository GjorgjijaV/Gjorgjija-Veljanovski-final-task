import { expect, Locator, Page } from "playwright/test";
import { User } from "../../utils/users";
import { BasePage } from "./basePage";

export class PaymentPage extends BasePage{
    readonly cardName: Locator;
    readonly cardNumber: Locator;
    readonly cvc: Locator;
    readonly expirationMonth: Locator;
    readonly expirationYear: Locator;
    readonly payAndConfirmOrderButton: Locator;
    readonly paymentHeading: Locator;

    constructor(page: Page){
        super(page)
        this.cardName = this.page.locator('input[name="name_on_card"]');
        this.cardNumber = this.page.locator('input[name="card_number"]');
        this.cvc = this.page.locator('[data-qa="cvc"]');
        this.expirationMonth = this.page.locator('[data-qa="expiry-month"]');
        this.expirationYear = this.page.locator('[data-qa="expiry-year"]');
        this.payAndConfirmOrderButton = this.page.getByRole('button', { name: 'Pay and Confirm Order' });
        this.paymentHeading = this.page.getByRole('heading', { name: "Payment", level: 2});
    }

    async fillPaymentForm(user: User){
        await this.cardName.fill(user.cardName);
        await this.cardNumber.fill(user.cardNumber.toString());
        await this.cvc.fill(user.cvc.toString());
        await this.expirationMonth.fill(user.expirationMonth.toString());
        await this.expirationYear.fill(user.expirationYear.toString());
        await this.payAndConfirmOrderButton.click();
    }

    async assertOnPaymentPage(){
        await expect(this.paymentHeading).toBeVisible();
    }
}
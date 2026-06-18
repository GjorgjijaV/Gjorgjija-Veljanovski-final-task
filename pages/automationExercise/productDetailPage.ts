import { expect, Locator, Page } from "playwright/test";
import { BasePage } from "./basePage";

export class ProductDetailPage extends BasePage{
    readonly category: Locator;
    readonly price: Locator;
    readonly availability: Locator;
    readonly condition: Locator;
    readonly brand: Locator;
    readonly addToCartButton: Locator;
    readonly productHeading: Locator;

    constructor(page: Page){
        super(page);
        this.category = this.page.locator("//*[@class='product-information']//p[contains(text(), 'Category:')]");
        this.price = this.page.locator('.product-information span span');
        this.availability = this.page.locator("//*[@class='product-information']//p[.//b[contains(text(), 'Availability:')]]");
        this.condition = this.page.locator("//*[@class='product-information']//p[.//b[contains(text(), 'Condition:')]]");
        this.brand = this.page.locator("//*[@class='product-information']//p[.//b[contains(text(), 'Brand:')]]");
        this.addToCartButton = this.page.locator('.product-information button');
        this.productHeading = this.page.locator('.product-information h2');
    }

    async assertProductHeadingIsVisibleAndNotEmpty(){
        await expect(this.productHeading).toBeVisible();
        expect(this.productHeading.textContent()).not.toBeNull();
    }

    async assertProductCharacteristicsAreVisibleAndNotEmpty(){
        await expect(this.category).toBeVisible();
        expect(this.category.textContent()).not.toBeNull();
        await expect(this.price).toBeVisible();
        expect(this.price.textContent()).not.toBeNull();
        await expect(this.availability).toBeVisible();
        expect(this.availability.textContent()).not.toBeNull();
        await expect(this.condition).toBeVisible();
        expect(this.condition.textContent()).not.toBeNull();
        await expect(this.brand).toBeVisible();
        expect(this.brand.textContent()).not.toBeNull();
    }

    async assertAddToCartButtonIsDisplayed(){
        await expect(this.addToCartButton).toBeVisible();
    }
    
}
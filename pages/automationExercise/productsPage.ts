import { expect, Locator, Page } from "playwright/test";
import { BasePage } from "./basePage";

export class ProductsPage extends BasePage{
    readonly viewCartButton: Locator;
    readonly products: Locator;
    readonly addToCartButtons: Locator;
    readonly searchProductField: Locator;
    readonly searchButton: Locator;
    readonly searchProductsHeading: Locator;
    readonly productTitles: Locator;
    readonly continueShoppingButton: Locator;
    readonly viewProductButtons: Locator;
    readonly productsHeading: Locator;
    constructor(page: Page){
        super(page);
        this.viewCartButton = this.page.getByRole('link', { name: 'View Cart' });
        this.products = this.page.locator('.single-products');
        this.addToCartButtons = this.page.locator('a.add-to-cart');
        this.searchProductField = this.page.getByPlaceholder("Search Product");
        this.searchButton = this.page.locator('#submit_search');
        this.searchProductsHeading = this.page.getByRole('heading', { name: "Searched Products" , level: 2 });
        this.productTitles = this.page.locator('.productinfo p');
        this.continueShoppingButton = this.page.getByRole('button', { name: "Continue Shopping"});
        this.viewProductButtons = this.page.locator('.choose a');
        this.productsHeading = this.page.getByRole('heading', { name: "All Products", level: 2});
    }

    async assertOnProductsPage(){
        await expect(this.productsHeading).toBeVisible({ timeout: 5000});
    }

    async addProductToCart(position: number){
        await this.addToCartButtons.nth(position).click();
        await this.viewCartButton.waitFor({ state: "visible", timeout: 5000});
    }

    async hoverOverAProduct(position: number){
        await this.products.nth(position).focus({ timeout: 5000 });
        await this.products.nth(position).hover({ force: true, timeout: 4000});
        await this.addToCartButtons.nth(position + 1).waitFor({ state: "visible", timeout: 5000});
    }

    async viewCart(){
        await this.viewCartButton.click();
    }

    async searchProduct(product: string){
        await this.searchProductField.fill(product);
        await this.searchButton.click();
    }

    async assertHeadingIsVisible(){
        await expect(this.searchProductsHeading).toBeVisible();
    }

    async assertAllProductsTitlesContainKeyword(titleKeyword: string){
        const count = await this.productTitles.count();
        const regex = new RegExp(titleKeyword, 'i');
        for(let i = 0; i < count; i++){
            const title = await this.productTitles.nth(i).textContent();
            expect(title).toMatch(regex);
        }
    }

    async assertAtLeastOneResultIsShown(){
        const totalCount = await this.products.count();
        expect(totalCount).toBeGreaterThan(0);
    }

    async continueWithShopping(){
        await this.continueShoppingButton.click();
    }

    async viewAProduct(position: number){
        await this.viewProductButtons.nth(position).click();
    }
}
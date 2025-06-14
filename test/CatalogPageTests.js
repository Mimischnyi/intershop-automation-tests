const { Builder, By, until } = require("selenium-webdriver");
const { expect } = require("chai");

describe("Testing catalog", async function () {

    it("Testing product selection by category", async function () {
        await driver.get("https://intershop5.skillbox.ru/product-category/catalog/");

        const buttonTvLocator = By.css("li.cat-item.cat-item-25 > a");
        const titleTVLocator = By.css("h1.entry-title.ak-container");
        const buttonClothesLocator = By.css("li.cat-item.cat-item-17 > a");
        const titleClothesLocator = By.css("h1.entry-title.ak-container");

        await driver.findElement(buttonTvLocator).click();

        expect(await driver.getCurrentUrl()).to.be.equal(
            "https://intershop5.skillbox.ru/product-category/catalog/electronics/tv/", "Wrong page");

        const titleTV = await driver.findElement(titleTVLocator).getText();
        expect(titleTV).to.be.equal("ТЕЛЕВИЗОРЫ", "Wrong title");

        await driver.findElement(buttonClothesLocator).click();

        expect(await driver.getCurrentUrl()).to.be.equal(
            "https://intershop5.skillbox.ru/product-category/catalog/clothes/", "Wrong page");

        const titleClothes = await driver.findElement(titleClothesLocator).getText();
        expect(titleClothes).to.be.equal("ОДЕЖДА", "Wrong title");

    })

    it("Testing switching to another catalog page", async function () {
        await driver.get("https://intershop5.skillbox.ru/product-category/catalog/");

        const secondPageLocator = By.css("a[href='http://intershop5.skillbox.ru/product-category/catalog/page/2/']:not([class='next page-numbers'])");
        const titlePageLocator = By.css("div.woocommerce-breadcrumb.accesspress-breadcrumb > span");

        await driver.findElement(secondPageLocator).click();

        expect(await driver.getCurrentUrl()).to.be.equal(
            "https://intershop5.skillbox.ru/product-category/catalog/page/2/", "Wrong page");

        const titlePage = await driver.findElement(titlePageLocator).getText();
        expect(titlePage).to.be.equal("Page 2", "Wrong title");

    })

    it("Testing adding an item to the cart", async function () {
        await driver.get("https://intershop5.skillbox.ru/product-category/catalog/");

        const buttonClockLocator = By.css("li.cat-item.cat-item-23 > a");
        const titleClockLocator = By.css("h1.entry-title.ak-container");
        const buttonCartLocator = By.css("a[href='?add-to-cart=15']");
        const buttonMoreLocator = By.css("a.added_to_cart.wc-forward");
        const titleCartLocator = By.css("div#accesspress-breadcrumb > span.current");
        const clockInCartLocator = By.xpath("//a[text()='Apple Watch 6']");

        await driver.findElement(buttonClockLocator).click();

        expect(await driver.getCurrentUrl()).to.be.equal(
            "https://intershop5.skillbox.ru/product-category/catalog/electronics/watch/", "Wrong page");

        const titleClock = await driver.findElement(titleClockLocator).getText();
        expect(titleClock).to.be.equal("ЧАСЫ", "Wrong page");

        await driver.findElement(buttonCartLocator).click();
        await driver.findElement(buttonMoreLocator).click();

        expect(await driver.getCurrentUrl()).to.be.equal("https://intershop5.skillbox.ru/cart/", "Wrong page");

        const titleCart = await driver.findElement(titleCartLocator).getText();
        expect(titleCart).to.be.equal("Корзина", "Wrong title");

        const clockInCart = await driver.findElement(clockInCartLocator);
        expect(await clockInCart.isDisplayed(), "The watch is not in the cart").to.be.true;


    })

    it("Testing viewing the product from the side", async function () {
        await driver.get("https://intershop5.skillbox.ru/product-category/catalog/");

        const productLocator = By.css("ul.product_list_widget > li:first-child > a > span.product-title");
        const titleProductLocator = By.css("div.woocommerce-breadcrumb.accesspress-breadcrumb > span");

        await driver.findElement(productLocator).click();

        expect(await driver.getCurrentUrl()).to.be.equal(
            "https://intershop5.skillbox.ru/product/gibson-les-paul-studio-2018-vintage-sunburst/", "Wrong page");

        const titleProduct = await driver.findElement(titleProductLocator).getText();
        expect(titleProduct).to.be.equal("Электрогитара Gibson Les Paul Studio 2018 Vintage Sunburst 3", "Wrong title");

    })

})
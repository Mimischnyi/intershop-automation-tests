const { Builder, By, until } = require("selenium-webdriver");
const { expect } = require("chai");

describe("Testing main page", async function () {

    it("Testing the view button", async function () {
        await driver.get("https://intershop5.skillbox.ru/");

        const buttonSearchTabletsLocator = By.css("aside#accesspress_storemo-3 span.btn.promo-link-btn");
        const titleTabletsLocator = By.css("h1.entry-title.ak-container");

        await driver.findElement(buttonSearchTabletsLocator).click();

        expect(await driver.getCurrentUrl()).to.be.equal(
            "https://intershop5.skillbox.ru/product-category/catalog/electronics/pad/", "Wrong page");

        const titleTablets = await driver.findElement(titleTabletsLocator).getText();
        expect(titleTablets).to.be.equal("ПЛАНШЕТЫ", "Wrong title");

    })

    it("Testing the search bar", async function () {
        await driver.get("https://intershop5.skillbox.ru/");

        const SearchBarLocator = By.css("input.search-field");
        const buttonSearchLocator = By.css("button.searchsubmit");
        const titleSearchLocator = By.css("h1.entry-title.ak-container");

        await driver.findElement(SearchBarLocator).sendKeys("Холодильник");
        await driver.findElement(buttonSearchLocator).click();

        const titleSearch = await driver.findElement(titleSearchLocator).getText();
        expect(titleSearch).to.be.equal("РЕЗУЛЬТАТЫ ПОИСКА: “ХОЛОДИЛЬНИК”", "Wrong title");

    })

    it("Testing link in the header", async function () {
        await driver.get("https://intershop5.skillbox.ru/");

        const linkInHeaderLocator = By.css("#menu-item-30");
        const titleAccountLocator = By.css("div#accesspress-breadcrumb > span.current");

        await driver.findElement(linkInHeaderLocator).click();

        expect(await driver.getCurrentUrl()).to.be.equal(
            "https://intershop5.skillbox.ru/my-account/", "Wrong page");

        const titleAccount = await driver.findElement(titleAccountLocator).getText();
        expect(titleAccount).to.be.equal("Мой Аккаунт", "Wrong title");
    })

    it("Testing link in the footer", async function () {
        await driver.get("https://intershop5.skillbox.ru/");

        const linkInFooterLocator = By.css("aside#pages-2 li.page_item.page-item-20 > a");
        const titleCartLocator = By.css("div#accesspress-breadcrumb > span.current");

        await driver.executeScript("arguments[0].scrollIntoView(true)",
            await driver.findElement(linkInFooterLocator)
        )

        await driver.findElement(linkInFooterLocator).click();

        expect(await driver.getCurrentUrl()).to.be.equal(
            "https://intershop5.skillbox.ru/cart/", "Wrong page");

        const titleCart = await driver.findElement(titleCartLocator).getText();
        expect(titleCart).to.be.equal("Корзина", "Wrong title");

    })

    it("Testing items from the sale", async function () {
        await driver.get("https://intershop5.skillbox.ru/");

        const itemSaleLocator = By.css("a[href='http://intershop5.skillbox.ru/product/nikon-d700-body/']");
        const titleItemSaleLocator = By.css("div.woocommerce-breadcrumb.accesspress-breadcrumb > span");

        await driver.executeScript("arguments[0].scrollIntoView(true)",
            await driver.findElement(itemSaleLocator)
        )

        await driver.findElement(itemSaleLocator).click();

        expect(await driver.getCurrentUrl()).to.be.equal("https://intershop5.skillbox.ru/product/nikon-d700-body/", "Wrong page");

        const titleItemSale = await driver.findElement(titleItemSaleLocator).getText();
        expect(titleItemSale).to.be.equal("Nikon D700body", "Wrong title");

    })

})
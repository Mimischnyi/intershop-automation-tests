const { By, until } = require("selenium-webdriver");
const { expect } = require("chai");

// ================================Функция авторизации==============================
async function authorizationUser(name, password) {
    await driver.get("https://intershop5.skillbox.ru/")

    const enterLocator = By.css("a.account");
    const titleMyAccLocator = By.css("h2.post-title");
    const userNameOrEmailFieldLocator = By.css("input#username");
    const userPasswordFieldLocator = By.css("input#password");
    const buttonEnterLocator = By.css("button[name='login']");

    await driver.findElement(enterLocator).click();

    expect(await driver.getCurrentUrl()).to.be.equal("https://intershop5.skillbox.ru/my-account/", "Wrong page");

    const titleMyAcc = await driver.findElement(titleMyAccLocator).getText();
    expect(titleMyAcc).to.be.equal("Мой аккаунт", "Wrong title");

    await driver.findElement(userNameOrEmailFieldLocator).sendKeys(`${name}`);
    await driver.findElement(userPasswordFieldLocator).sendKeys(`${password}`);
    await driver.findElement(buttonEnterLocator).click();
}

// ================================Функция регистрации==============================
async function registrationUser(name, email, password) {

    await driver.get("https://intershop5.skillbox.ru/")

    const enterLocator = By.css("a.account");
    const titleMyAccLocator = By.css("h2.post-title");
    const buttonRegLocator = By.css("button.custom-register-button");
    const titleRegLocator = By.css("h2.post-title");
    const userNameFieldLocator = By.css("input#reg_username");
    const userEmailFieldLocator = By.css("input#reg_email");
    const userPasswordFieldLocator = By.css("input#reg_password");
    const buttonRegistLocator = By.css("button[name='register']");

    await driver.findElement(enterLocator).click();

    expect(await driver.getCurrentUrl()).to.be.equal("https://intershop5.skillbox.ru/my-account/", "Wrong page");

    const titleMyAcc = await driver.findElement(titleMyAccLocator).getText();
    expect(titleMyAcc).to.be.equal("Мой аккаунт", "Wrong title");

    await driver.findElement(buttonRegLocator).click();

    expect(await driver.getCurrentUrl()).to.be.equal("https://intershop5.skillbox.ru/register/");

    const titleReg = await driver.findElement(titleRegLocator).getText();
    expect(titleReg).to.be.equal("Регистрация", "Wrong title");

    await driver.findElement(userNameFieldLocator).sendKeys(`${name}`);
    await driver.findElement(userEmailFieldLocator).sendKeys(`${email}`);
    await driver.findElement(userPasswordFieldLocator).sendKeys(`${password}`);

    await driver.findElement(buttonRegistLocator).click();

}

// ================================Функция добавления товара в корзину==============================
async function addItemInCart() {
    await driver.get("https://intershop5.skillbox.ru/product-category/catalog/");

    const buttonClockLocator = By.css("li.cat-item.cat-item-23 > a");
    const titleClockLocator = By.css("h1.entry-title.ak-container");
    const buttonCartLocator = By.css("a[href='?add-to-cart=15']");
    const buttonMoreLocator = By.css("a.added_to_cart.wc-forward");
    const titleCartLocator = By.css("div#accesspress-breadcrumb");
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
    expect(titleCart).to.be.equal("Главная Корзина", "Wrong page");

    const clockInCart = await driver.findElement(clockInCartLocator);
    expect(await clockInCart.isDisplayed(), "The watch is not in the cart").to.be.true;
}

// ================================Функция авторизации и добавления товара==============================
async function authorizationUserAndAddItemInCart(name, password) {
    await driver.get("https://intershop5.skillbox.ru/")

    const enterLocator = By.css("a.account");
    const titleMyAccLocator = By.css("h2.post-title");
    const userNameOrEmailFieldLocator = By.css("input#username");
    const userPasswordFieldLocator = By.css("input#password");
    const buttonEnterLocator = By.css("button[name='login']");

    await driver.findElement(enterLocator).click();

    expect(await driver.getCurrentUrl()).to.be.equal("https://intershop5.skillbox.ru/my-account/", "Wrong page");

    const titleMyAcc = await driver.findElement(titleMyAccLocator).getText();
    expect(titleMyAcc).to.be.equal("Мой аккаунт", "Wrong title");

    await driver.findElement(userNameOrEmailFieldLocator).sendKeys(`${name}`);
    await driver.findElement(userPasswordFieldLocator).sendKeys(`${password}`);
    await driver.findElement(buttonEnterLocator).click();

    // =========================================================================================================

    const linkCatalogLocator = By.xpath("//a[text()='Каталог']");
    const buttonClockLocator = By.css("li.cat-item.cat-item-23 > a");
    const titleClockLocator = By.css("h1.entry-title.ak-container");
    const buttonCartLocator = By.css("a[href='?add-to-cart=15']");
    const buttonMoreLocator = By.css("a.added_to_cart.wc-forward");
    const titleCartLocator = By.css("div#accesspress-breadcrumb");
    const clockInCartLocator = By.xpath("//a[text()='Apple Watch 6']");

    await driver.wait(until.elementLocated(linkCatalogLocator), 5000);

    await driver.findElement(linkCatalogLocator).click();

    await driver.wait(until.elementLocated(buttonClockLocator), 5000);

    await driver.findElement(buttonClockLocator).click();

    expect(await driver.getCurrentUrl()).to.be.equal(
        "https://intershop5.skillbox.ru/product-category/catalog/electronics/watch/", "Wrong page");

    const titleClock = await driver.findElement(titleClockLocator).getText();
    expect(titleClock).to.be.equal("ЧАСЫ", "Wrong page");

    await driver.findElement(buttonCartLocator).click();
    await driver.findElement(buttonMoreLocator).click();

    expect(await driver.getCurrentUrl()).to.be.equal("https://intershop5.skillbox.ru/cart/", "Wrong page");

    const titleCart = await driver.findElement(titleCartLocator).getText();
    expect(titleCart).to.be.equal("Главная Корзина", "Wrong page");

    const clockInCart = await driver.findElement(clockInCartLocator);
    expect(await clockInCart.isDisplayed(), "The watch is not in the cart").to.be.true;

}

module.exports = { addItemInCart, authorizationUser, registrationUser, authorizationUserAndAddItemInCart }
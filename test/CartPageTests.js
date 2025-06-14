const { Builder, By, until } = require("selenium-webdriver");
const { expect } = require("chai");
const { addItemInCart } = require("../utils/helpers")

describe("Testing cart", function () {

    it("Testing correct coupon", async function () {

        await addItemInCart();

        const couponFieldLocator = By.css("input#coupon_code");
        const buttonApplyCouponLocator = By.css("button[name='apply_coupon']");
        const titleSuccesCouponLocator = By.css("td[data-title='Скидка: sert500']");
        const messageApplyCouponLocator = By.css("div.woocommerce-message");


        await driver.findElement(couponFieldLocator).sendKeys("sert500");
        await driver.findElement(buttonApplyCouponLocator).click();

        const messageApplyCoupon = await driver.findElement(messageApplyCouponLocator).getText();
        expect(messageApplyCoupon).to.be.equal("Купон успешно добавлен.", "Wrong message");

        const titleSuccesCoupon = await driver.findElement(titleSuccesCouponLocator).getText();
        expect(titleSuccesCoupon).to.be.equal("-500,00₽ [Удалить]", "Wrong coupone")

    });

    it("Testing deleting an coupon", async function () {

        await addItemInCart();

        const couponFieldLocator = By.css("input#coupon_code");
        const buttonApplyCouponLocator = By.css("button[name='apply_coupon']");
        const titleSuccesCouponLocator = By.css("td[data-title='Скидка: sert500']");
        const buttonDeleteCouponLocator = By.css("a.woocommerce-remove-coupon");
        const messageDeleteLocator = By.css("div.woocommerce-message");

        await driver.findElement(couponFieldLocator).sendKeys("sert500");
        await driver.findElement(buttonApplyCouponLocator).click();

        const titleSuccesCoupon = await driver.findElement(titleSuccesCouponLocator).getText();
        expect(titleSuccesCoupon).to.be.equal("-500,00₽ [Удалить]", "Wrong coupone")

        await driver.findElement(buttonDeleteCouponLocator).click();

        await driver.sleep(500);

        const messageDelete = await driver.findElement(messageDeleteLocator).getText();
        expect(messageDelete).to.be.equal("Купон удален.", "Wrong message");
    });

    it("Testing product delete", async function () {

        await addItemInCart();

        const buttonDeleteProductLocator = By.css("a.remove");
        const titleEmptyCartLocator = By.css("p.cart-empty.woocommerce-info");

        await driver.findElement(buttonDeleteProductLocator).click();

        const titleEmptyCart = await driver.findElement(titleEmptyCartLocator).getText();
        expect(titleEmptyCart).to.be.equal("Корзина пуста.", "Wrong title")

    });

    it("Testing return of the product to the cart", async function () {

        await addItemInCart();

        const buttonDeleteProductLocator = By.css("a.remove");
        const titleEmptyCartLocator = By.css("p.cart-empty.woocommerce-info");
        const buttonReturnProductLocator = By.css("a.restore-item");
        const ProductkInCartLocator = By.xpath("//a[text()='Apple Watch 6']")

        await driver.findElement(buttonDeleteProductLocator).click();

        const titleEmptyCart = await driver.findElement(titleEmptyCartLocator).getText();
        expect(titleEmptyCart).to.be.equal("Корзина пуста.", "Wrong title")

        await driver.findElement(buttonReturnProductLocator).click();

        const ProductkInCart = await driver.findElement(ProductkInCartLocator);
        expect(await ProductkInCart.isDisplayed(), "The watch is not in the cart").to.be.true;

    });

    it("Testing incorrect coupon", async function () {

        await addItemInCart();

        const couponFieldLocator = By.css("input#coupon_code");
        const buttonApplyCouponLocator = By.css("button[name='apply_coupon']");
        const titleIncorrectCouponLocator = By.css("ul.woocommerce-error > li");


        await driver.findElement(couponFieldLocator).sendKeys("sert50000");
        await driver.findElement(buttonApplyCouponLocator).click();

        const titleIncorrectCoupon = await driver.findElement(titleIncorrectCouponLocator).getText();
        expect(titleIncorrectCoupon).to.be.equal("Неверный купон.", "Wrong coupone")

    });
});
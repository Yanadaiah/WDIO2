import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import SecurePage from '../pageobjects/secure.page.js'
import ProductPage from '../pageobjects/ProductPage.js';
import fs from 'fs';
let Products = JSON.parse(fs.readFileSync('test/TestData/Prodcts.json', 'utf-8'))

describe("E2E Scenario", async () => {

    Products.forEach(({ Products }) => {
        it("complete flow -Smoke", async function(){

            this.retries(2) // here retries method will run two time(run in metion times) and if mention spec level then only spec file two time and 
            //if mention global level in desception then all specs in file will those meny times
            await LoginPage.open()

            await LoginPage.login("rahulshettyacademy", "learning")
            await expect(SecurePage.flashAlert).toBeExisting()
            await ProductPage.RequiredProducts(Products)
            await ProductPage.Checkout.click()
            await browser.pause(2000)

            const Productsprice = await ProductPage.TotalProductPrice()
            console.log(Productsprice)

            const TotalPrice = await ProductPage.Total()
            console.log(TotalPrice)

            await expect(Productsprice).toEqual(TotalPrice)

            await ProductPage.PriceCheckout.click()
            await ProductPage.Country.setValue("ind")
            await ProductPage.WaitForDots.waitForExist({ reverse: true })
            await ProductPage.India.click()
            await ProductPage.submit.click()
            expect(await ProductPage.successMsg.getText()).toContain(" Thank you! Your order will be delivered in next few weeks :-)")
            


        })
    })
})
import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import SecurePage from '../pageobjects/secure.page.js'
import fs from 'fs';
let credentials = JSON.parse(fs.readFileSync('test/TestData/LoginData.json', 'utf-8'))

describe('My Login application -Smoke', async () => {
    credentials.forEach(({WrongUsername,WrongPassword,Username,Password})=>{

    it('should login with valid credentials', async () => {
        await LoginPage.open()

        await LoginPage.login(Username, Password)
        await expect(SecurePage.flashAlert).toBeExisting()
        await expect(SecurePage.flashAlert).toHaveTextContaining(
            'Checkout')
        //await expect(SecurePage.flashAlert).toMatchElementSnapshot('flashAlert')
    })

    it('LogIn Fail scenarios -Regression', async () => {
        await LoginPage.open()
        await LoginPage.login(WrongUsername, WrongPassword)
        await expect(LoginPage.errorMassage).toBeExisting()
        await expect(LoginPage.errorMassage).toHaveTextContaining("Incorrect username/password.")
    })

    // it('Validate the pop up on user selection - Regression', async () => {
    //     await LoginPage.open();
    //     await LoginPage.inputUsername.setValue(Username);
    //     await LoginPage.inputPassword.setValue(Password);
    //     await LoginPage.UserRadioButton.click();
    //     await LoginPage.ModelBody.waitForDisplayed
    //     await browser.dismissAlert()
    //     //await LoginPage.ModelCancel.click()
    //     console.log(await LoginPage.AdminRadioButton.isSelected()); 
    //     await LoginPage.UserRadioButton.click();
    //     await browser.acceptAlert();
    //     await LoginPage.btnSubmit.click();
    //     await expect(SecurePage.flashAlert).toBeExisting();
    // });

});
});
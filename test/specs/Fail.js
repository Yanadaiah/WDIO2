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
            'Checkoutt')
        //await expect(SecurePage.flashAlert).toMatchElementSnapshot('flashAlert')
    })

});
});
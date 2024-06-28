
import { $ } from '@wdio/globals'
import Page from './page.js';

class ProductPage extends Page {

    get products(){
        return $$("div[class='card h-100']")
    }
    async RequiredProducts(product){
        const elementsForprod = await this.products
        for(let i = 0; await elementsForprod.length>i; i++){
           
           const productTitle = await elementsForprod[i].$("div h4 a").getText()
    
           if(product.includes(productTitle))
            {
                await elementsForprod[i].$(".card-footer button").click()
            }
        }
    }

    get Checkout(){
        return $('.btn-primary')
    }

    get prodPrices(){
       return $$("//tr/td[4]/strong")
    }

    get TotalPrice(){
        return $("h3 strong").getText()
    }

    async TotalProductPrice(){
        const prodPrice = await this.prodPrices

        const TotalProductPrice =(await Promise.all (await prodPrice.map(async (prodPrice)=> parseInt((await prodPrice.getText()).split(".")[1].trim()))))
        .reduce((acc,price)=>acc+price,0)
        return TotalProductPrice
    
    }

    async Total(){
        const totolePrice= await this.TotalPrice 
        const Total =parseInt(totolePrice.split(".")[1].trim())
        return Total
        
    }

    get PriceCheckout(){
        return $("button[class='btn btn-success']")
    }
    get Country(){
        return $("#country")
    }
    get WaitForDots(){
        return $(".lds-ellipsis")
    }
    get India(){
        return $("=India")
    }
    get submit(){
        return $("input[type='submit']")
    }
    get successMsg(){
        return $(".alert-success")
    }
}


export default new ProductPage();
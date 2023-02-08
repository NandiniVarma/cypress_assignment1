describe('Assignment', function () {
    /***
     * Description: Create an automated test project in Cypress test framework with the following spec details:
     * Visit page “https://www.saucedemo.com/” - Done
     * Validate that login page is loaded - Done
     * Login page with standard user - Done
     * Validate login is successful - done
     * Once logged in, in the Inventory page , filter products by ‘Price (low to high)’.
     * Validate the products have been filtered by price low to high
     * In the Inventory page,  filter products by ‘Price (high to low)’
     * Validate the products have been filtered by price hi
     * Add a product to cart
     * Validate the product has been added to the shopping cart.
     */

    before("Login",()=>{

        cy.visit('https://www.saucedemo.com/')
        cy.get('[placeholder="Username"]').type('standard_user')
        cy.get('[placeholder="Password"]').type('secret_sauce')
        cy.get('[type="submit"]').click()

        cy.window().then(win => {
            win.localStorage.setItem('authenticated', true)
        })


    })
    


//let ,var, const
    it('I validate login is successful', () => {

        cy.url().should('include', 'inventory.html')
       
         cy.get('.title').should('have.text', "Products") // implicit Assertion
       
        })

    it('I sort the  products price from (high to low)’', () => {
        cy.get('.product_sort_container').select('hilo')
        cy.get('.inventory_item_price').each(($el, index, list) => {
            let temp = 0
            let currentPrice = $el.text().replace("$", '')
            if (temp < currentPrice) {
                cy.log("productPrice-->" + currentPrice)
                temp = currentPrice;
            } else {
                cy.log("Price is not from High to Low")
                expect(0).eq(1)
            }
    })
})

  
it('I sort the product price from(low to high)’', () => {
        cy.get('.product_sort_container').select('lohi')
        cy.get('.inventory_item_price').each(($el, index, list) => {
            let temp = 0
            let currentPrice = $el.text().replace("$", '')
            if (currentPrice > temp) {
                cy.log("productPrice-->" + currentPrice)
                temp = currentPrice;
            } else {
                cy.log("Price is not from low to high")
                expect(0).eq(1)
            }

        })


    })



   
//using value // using index
        
    it('Add a product to cart', () => {

        cy.get('[name="add-to-cart-sauce-labs-onesie"]').click()
    

        cy.get('[name="add-to-cart-sauce-labs-onesie"]').click()
        cy.get('.shopping_cart_link').should('be.visible').click()
        cy.get('.inventory_item_name').should('be.visible').its('length').should('be.greaterThan', 0)


    })

});

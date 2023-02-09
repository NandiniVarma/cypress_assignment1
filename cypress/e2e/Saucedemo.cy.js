var chai = require("chai"),
    expect = chai.expect;

chai.use(require("chai-sorted"));
describe('Saucedemotest', function () {
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

    beforeEach("Login", () => {
        cy.visit('https://www.saucedemo.com/')
        cy.get('[placeholder="Username"]').type('standard_user')
        cy.get('[placeholder="Password"]').type('secret_sauce')
        cy.get('[type="submit"]').click()

        cy.window().then(win => {
            win.localStorage.setItem('authenticated', true)
        })

    })


    it('I validate login is successful', () => {

        cy.url().should('include', 'inventory.html')
        cy.get('.title').should('have.text', "Products") // implicit Assertion

    })

    it('I filter and validate the products have been filtered by price high to low', () => {
        cy.get('.product_sort_container').select('hilo')
        const prices = cy.get('.inventory_item_price')
            .then(prices => {
                return prices.toArray().map(price => price.innerText).map(item => item.replace('$', '')).map(item => Number(item))

            })

        prices.then((p) => {
            for (let i = 0; i < p.length - 1; i++) {
                cy.log("Price ==>" + p[i])
                expect(p[i]).to.be.gte(p[i + 1])
            }
        })
    })


    it('I filter and validate the products have been filtered by price low to high', () => {
        cy.get('.product_sort_container').select('lohi')
        cy.get('.inventory_item_price')
            .then(prices => {
                let originalPrices = prices.toArray().map(price => price.innerText)
                const modifiedArray = originalPrices.map(item => item.replace('$', ''))

                const modifiedArrayToInt = modifiedArray.map(item => Number(item))
                chai.expect(modifiedArrayToInt).sorted()

            })

    })


    it('Add a product to cart and validate the product has been added to the shopping cart', () => {

        cy.get('[name="add-to-cart-sauce-labs-onesie"]').click()
        cy.get('.shopping_cart_link').should('be.visible').click()
        cy.get('.inventory_item_name').should('be.visible').its('length').should('be.greaterThan', 0)
    })


});

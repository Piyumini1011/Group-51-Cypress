import { Given,When,Then,And } from '@badeball/cypress-cucumber-preprocessor';

Given('Product add to the cart successfully',()=>{
    cy.visit('https://automationexercise.com/');
    cy.get('.shop-menu > .nav > :nth-child(2) > a').click();
    
    // Ensure the first product is visible
    cy.get('.features_items')
        .first().scrollIntoView();
        
    cy.get(':nth-child(3) > .product-image-wrapper > .single-products > .productinfo > p').invoke('text').then((productTitle) => {
        cy.wrap(productTitle).as('productTitle');
    });

    // Hover and click 'Add to cart' first product
    cy.get(':nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn')
        .trigger('mouseover')    
        .click({force:true});

    cy.get('.modal-footer > .btn').click();
    

    cy.get('.shop-menu > .nav > :nth-child(3) > a').click();

    cy.get('@productTitle').then((productTitle) => {
        cy.get('h4 > a').invoke('text').then((cartProductTitle) => {
            expect(cartProductTitle.trim()).to.contain(productTitle.trim());
        });
    });
})
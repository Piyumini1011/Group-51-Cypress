import { Given,When,Then,And } from '@badeball/cypress-cucumber-preprocessor';

Given('Add to cart from Recommended items successfully',()=>{
    cy.visit('https://automationexercise.com/');

    cy.get('.recommended_items')
    .first().scrollIntoView();
    cy.get('.recommended_items').should('be.visible');

    cy.get('.active > :nth-child(1) > .product-image-wrapper > .single-products > .productinfo > .btn').click();
    // Click on 'View Cart' button (adjust selector as needed)
    cy.get('u').click();

    cy.get('h4 > a').should('be.visible');

    
})

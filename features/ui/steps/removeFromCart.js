import { Given,When,Then,And } from '@badeball/cypress-cucumber-preprocessor';

Given('Product remove from cart successfully',()=>{
    cy.get('.cart_quantity_delete').click();
})
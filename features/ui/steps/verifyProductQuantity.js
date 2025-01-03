import { Given,When,Then,And } from '@badeball/cypress-cucumber-preprocessor';

    Given('Verify Product Quantity in cart sucessfully' , () => {
        cy.visit('https://automationexercise.com/');
        cy.get('.shop-menu > .nav > :nth-child(1) > a').should('be.visible');

        
        cy.get(':nth-child(3) > .product-image-wrapper > .choose > .nav > li > a').click();
        cy.get('.product-information').should('be.visible');
        cy.get('#quantity').should('be.visible');
        cy.get('#quantity')
        .clear() // Clear any existing value
        .type('4'); // Set the quantity to 4
        cy.get('#quantity').should('be.visible');

        cy.get(':nth-child(5) > .btn').click();
        cy.get('u').click();
       
        cy.get('.disabled') // Locate the element displaying the quantity in the cart
        .should('be.visible') // Ensure the element is visible
        .and('have.text', '4'); // Verify the text content matches the expected quantity

       
        });
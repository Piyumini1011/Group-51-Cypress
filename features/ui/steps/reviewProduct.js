import { Given,When,Then,And } from '@badeball/cypress-cucumber-preprocessor';

Given('User navigates to the product page and adds a review',()=>{
    cy.visit('https://automationexercise.com/');

    cy.get('.shop-menu > .nav > :nth-child(2) > a').click();

    cy.get(':nth-child(3) > .product-image-wrapper > .choose > .nav > li > a').click();

    cy.get('.category-tab > :nth-child(1) > .nav').scrollIntoView();

    cy.get('#name').type('John Doe'); 
    cy.get('#email').type('johndoe@example.com'); 
    cy.get('#review').type('This is a sample review for the product.'); 


    cy.get('#button-review').click();

    cy.get('.alert-success') // Replace '.alert-success' with the actual selector for the success message
        .should('be.visible')
        .and('contain.text', 'Thank you for your review');


})
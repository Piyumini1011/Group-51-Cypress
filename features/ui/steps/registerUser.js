import { Given,When,Then,And } from '@badeball/cypress-cucumber-preprocessor';

Given('Verify error Email Address already exist' , () => {

    cy.visit('https://automationexercise.com/');

    cy.get('.shop-menu > .nav > :nth-child(4) > a').click();

    // Enter name and already registered email address
    cy.get('[data-qa="signup-name"]').type('Nethmi Dulanjini'); // Replace 'John Doe' with the desired name
    cy.get('[data-qa="signup-email"]').type('dulanjinimkn.20@uom.lk'); // Replace with the registered email

    cy.get('[data-qa="signup-button"]').click();



})
import { Given,When,Then,And } from '@badeball/cypress-cucumber-preprocessor';

Given('Scrolling up with arrow button',()=>{
    cy.visit('https://automationexercise.com/');

    cy.get('.single-widget > h2').scrollIntoView({ duration: 2000 }); 

    cy.get('.single-widget > h2').should('be.visible');

    cy.get('#scrollUp').click();

    cy.get('.active > :nth-child(1) > h2').should('be.visible');
})
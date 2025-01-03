import { Given,When,Then,And } from '@badeball/cypress-cucumber-preprocessor';

Given('Subscription in cart page Verify successfully',()=>{
    cy.visit('https://automationexercise.com/');
    cy.get('.shop-menu > .nav > :nth-child(3) > a').click();

    cy.get('#footer').scrollIntoView({ duration: 2000 }); 

    cy.get('.single-widget > h2').invoke('text').then((text) => {
        expect(text.trim().replace(/\s+/g, ' ')).to.contain("Subscription");});

    cy.get('#susbscribe_email').type('test@gmail.com'); 
    cy.get('#subscribe').click();
    cy.get('.alert-success',{ timeout: 20000 }).should('be.visible');
    cy.get('.alert-success').invoke('text').then((text) => {
        expect(text.trim().replace(/\s+/g, ' ')).to.contain("You have been successfully subscribed!");});
})
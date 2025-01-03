import { Given,When,Then,And } from '@badeball/cypress-cucumber-preprocessor';

Given('Subscription in home page Verify successfully',()=>{
    cy.visit('https://automationexercise.com/');
    cy.get('.shop-menu > .nav > :nth-child(1) > a').should('be.visible');

    cy.get('#footer').scrollIntoView({ duration: 2000 }); 


        cy.get('.single-widget > h2').invoke('text').then((text) => {
            expect(text.trim().replace(/\s+/g, ' ')).to.contain("Subscription");});

            cy.get('#susbscribe_email').type('piyumini1011@gmail.com'); 
            cy.get('#subscribe').click();
            cy.get('.alert-success',{ timeout: 20000 }).should('be.visible');
            cy.get('.alert-success').invoke('text').then((text) => {
                expect(text.trim().replace(/\s+/g, ' ')).to.contain("You have been successfully subscribed!");});
           


        })
import { Given,When,Then,And } from '@badeball/cypress-cucumber-preprocessor';

Given('Cart brand products view successfully',()=>{
    cy.visit('https://automationexercise.com/');
    cy.get('.shop-menu > .nav > :nth-child(2) > a').click();
    
    cy.get('.brands_products > h2')
    .first().scrollIntoView();
    cy.get('.brands_products > h2').should('be.visible');

    cy.get('.brands-name > .nav > :nth-child(1) > a').should('be.visible');
    cy.get('.brands-name > .nav > :nth-child(2) > a').should('be.visible');
    cy.get('.brands-name > .nav > :nth-child(3) > a').should('be.visible');
    cy.get('.brands-name > .nav > :nth-child(4) > a').should('be.visible');
    cy.get('.brands-name > .nav > :nth-child(5) > a').should('be.visible');
    cy.get('.brands-name > .nav > :nth-child(6) > a').should('be.visible');
    cy.get('.brands-name > .nav > :nth-child(7) > a').should('be.visible');
    cy.get('.brands-name > .nav > :nth-child(8) > a').should('be.visible');
//click on any brand
cy.get('.brands-name > .nav > :nth-child(2) > a').click();
cy.url().should('include', 'brand_products/H&M');


cy.get('.brands-name > .nav > :nth-child(8) > a').click();
cy.url().should('include', 'brand_products/Biba');
 

})
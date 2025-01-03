import { Given,When,Then,And } from '@badeball/cypress-cucumber-preprocessor';

Given('Category products view successfully',()=>{
    cy.visit('https://automationexercise.com/');
    cy.get('.left-sidebar > :nth-child(1)').click();

    cy.get(':nth-child(1) > .panel-heading > .panel-title').click();

// Click on 'Women' category
cy.get(':nth-child(1) > .panel-heading > .panel-title > a').click();



// Verify sub-tabs 'Dress', 'Tops', 'Saree' exist
cy.get('#Women > .panel-body > ul > :nth-child(1)').should('be.visible');
cy.get('#Women > .panel-body > ul > :nth-child(2)').should('be.visible');
cy.get('#Women > .panel-body > ul > :nth-child(3)').should('be.visible');

// Click on 'Dress' sub-tab
cy.get('#Women > .panel-body > ul > :nth-child(1)').click();
cy.get('#Women > .panel-body > ul > :nth-child(1) > a').click();
cy.url().should('include', 'category_products/1');
// Click on 'Men' category
cy.get(':nth-child(2) > .panel-heading > .panel-title > a').click();
cy.get('#Men > .panel-body > ul > :nth-child(1)').should('be.visible');
cy.get('#Men > .panel-body > ul > :nth-child(2)').should('be.visible');

cy.get('#Men > .panel-body > ul > :nth-child(1)').click();
cy.get('#Men > .panel-body > ul > :nth-child(1) > a').click();
cy.url().should('include', 'category_products/3');



})


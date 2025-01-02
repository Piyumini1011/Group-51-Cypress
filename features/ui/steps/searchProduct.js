import { Given,When,Then,And } from '@badeball/cypress-cucumber-preprocessor';

Given('User searches for {string} in the search bar',(productName)=>{
    cy.visit('https://automationexercise.com/');

    cy.get('.shop-menu > .nav > :nth-child(2) > a').click();

    cy.get('#search_product').type(productName);

    cy.get('#submit_search').click();

    cy.window().then((win) => {
        const scrollInterval = setInterval(() => {
            win.scrollBy(0, 500); 
        }, 500); 

        setTimeout(() => {
            clearInterval(scrollInterval);
        }, 5000); 
    });
})
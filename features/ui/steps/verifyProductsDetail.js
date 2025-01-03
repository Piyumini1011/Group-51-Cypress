import { Given,When,Then,And } from '@badeball/cypress-cucumber-preprocessor';
    Given ('the user clicks on the "Products" button' , () => {
        cy.visit('https://automationexercise.com/');

        cy.get('.shop-menu > .nav > :nth-child(2) > a').click();

        cy.get(':nth-child(3) > .product-image-wrapper > .choose > .nav > li > a').click();


    });

    
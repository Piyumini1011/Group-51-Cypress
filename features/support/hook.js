const { Before, After } = require('@badeball/cypress-cucumber-preprocessor');

Before(()=> {
    //Reset state before each test
    cy.wrap(null).as('auth');
    cy.wrap(null).as('reposnse');
});

After(()=> {
    //clean up after each test if needed
})
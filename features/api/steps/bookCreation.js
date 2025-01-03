const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

// Base API URL
const API_URL = 'http://localhost:7081/api/books';

// Authentication step
Given("I am authenticated with username {string} and password {string}", function(username, password) {
    cy.wrap({ username, password }).as('authCredentials');
});

// Step for creating multiple books
When("I create books with the following details:", function(dataTable) {
    const books = dataTable.hashes();
    cy.get('@authCredentials').then(({ username, password }) => {
        books.forEach((book) => {
            cy.request({
                method: 'POST',
                url: API_URL,
                headers: { "Content-Type": "application/json" },
                auth: { username, password },
                body: book,
                failOnStatusCode: false,
            }).as('response');
        });
    });
});

// Validation for successful book creation
Then("the book creation response should have status {int}", function(statusCode) {
    cy.get('@response').its('status').should('eq', statusCode);
});

// Step for attempting to create a book with integer data (Revised second test case)
When("I attempt to create a book with the integer data:", function(dataTable) {
    const book = dataTable.hashes()[0];
    cy.get('@authCredentials').then(({ username, password }) => {
        cy.request({
            method: 'POST',
            url: API_URL,
            headers: { "Content-Type": "application/json" },
            auth: { username, password },
            body: book,
            failOnStatusCode: false,
        }).as('integerDataResponse');
    });
});

// Validation for not allowing integer data as book details
Then("the system should not allow to create a book with integer data", function() {
    cy.get('@integerDataResponse').its('status').should('eq', 400);
});

Then("the response should have status {int}", function(statusCode) {
    cy.get('@integerDataResponse').its('status').should('eq', statusCode);
});

Then("response should contain message {string}", function(message) {
    cy.get('@integerDataResponse').its('body').should('contain', message);
});

// Step for creating a book with invalid data
When("I create a book with invalid data:", function(dataTable) {
    const book = dataTable.hashes()[0];
    cy.get('@authCredentials').then(({ username, password }) => {
        cy.request({
            method: 'POST',
            url: API_URL,
            headers: { "Content-Type": "application/json" },
            auth: { username, password },
            body: book,
            failOnStatusCode: false,
        }).as('invalidResponse');
    });
});

// Validation for invalid data
Then("the system should not allow to create a book with invalid data", function() {
    cy.get('@invalidResponse').its('status').should('eq', 400);
});

Then("the response should have status {int}", function(statusCode) {
    cy.get('@invalidResponse').its('status').should('eq', statusCode);
});

Then("response should contain message {string}", function(message) {
    cy.get('@invalidResponse').its('body').should('contain', message);
});

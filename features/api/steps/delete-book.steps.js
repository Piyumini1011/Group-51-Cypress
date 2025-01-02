const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

const API_URL = 'http://localhost:7081/api/books';

// We don't need to redefine the create book step since it's already in auth.steps.js
// We'll just use the response alias from that step

When("I delete the book with username {string} and password {string}", function(username, password) {
    cy.get('@bookId').then(bookId => {
        cy.request({
            method: 'DELETE',
            url: `${API_URL}/${bookId}`,
            headers: {
                "Content-Type": "application/json",
            },
            auth: {
                username: username,
                password: password
            },
            failOnStatusCode: false
        }).as('response');
    });
});

Then("I should get a response with status code {int}", function(statusCode) {
    cy.get('@response').then(response => {
        expect(response.status).to.equal(statusCode);
    });
});

Then("response should contain message {string}", function(message) {
    cy.get('@response').then(response => {
        expect(response.body).to.have.property('message', message);
    });
});

// Optional: Add verification step to confirm book no longer exists
Then("the book should no longer exist in the system", function() {
    cy.get('@bookId').then(bookId => {
        cy.request({
            method: 'GET',
            url: `${API_URL}/${bookId}`,
            headers: {
                "Content-Type": "application/json",
            },
            auth: {
                username: 'admin',
                password: 'password'
            },
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.equal(404);
        });
    });
});
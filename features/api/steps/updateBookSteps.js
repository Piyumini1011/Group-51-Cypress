const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

// Only keep the book-specific verification step
Then("the book should be updated with new title and author", function() {
    cy.get('@response').then(response => {
        cy.get('@bookId').then(bookId => {
            cy.request({
                method: 'GET',
                url: `${Cypress.env('API_URL')}/api/books/${bookId}`,
                headers: {
                    "Content-Type": "application/json",
                },
                auth: {
                    username: 'admin',
                    password: 'password'
                }
            }).then(getResponse => {
                expect(getResponse.body.title).to.include('Updated Test Book');
                expect(getResponse.body.author).to.include('Updated Author');
            });
        });
    });
});
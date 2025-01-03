const { Before, After } = require('@badeball/cypress-cucumber-preprocessor');

Before(()=> {
    //Reset state before each test
    cy.wrap(null).as('auth');
    cy.wrap(null).as('reposnse');

    //Clear existing test data before each test
    cy.request({
        method:'GET',
        url:'http://localhost:7081/api/books',
        auth: {
            username: 'admin',
            password: 'password'
        }
    }).then((response)=>{
        //Detele each book
        response.body.forEach((book)=>{
            cy.request({
                method: 'DELETE',
                url: `http://localhost:7081/api/books/${book.id}`,
                auth: {
                    username: 'user',
                    password: 'password'
                },
                failOnStatusCode: false
            });
        });
    });
});

After(()=> {
    //clean up after each test if needed
})
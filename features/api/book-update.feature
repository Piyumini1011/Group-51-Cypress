@api
Feature: Book Update API Tests

    Scenario: Admin can successfully update a book
        When I send POST request to create book with username "admin" and password "password"
      | title          | author        |
      | Test Book One  | Test Author 1 |
        When I update the book with username "admin" and password "password"
        | title              | author            |
        | Updated Test Book  | Updated Author    |
        Then I should get a response with status code 200

    Scenario: User cannot update a book
        When I send POST request to create book with username "user" and password "password"
      | title          | author        |
      | Test Book Two  | Test Author 2 |
        When I update the book with username "user" and password "password"
        | title              | author            |
        | Updated Test Book  | Updated Author    |
        Then I should get a response with status code 403
        And response should contain message "User is not permitted."

    Scenario: Missing author field
        When I send POST request to create book with username "admin" and password "password"
        | title          | author        |
        | Test Book One  | Test Author 1 |
        When I update the book with missing author field with username "admin" and password "password"
        | title              |
        | Updated Test Book  |
        Then I should get a response with status code 400
        And response should contain message "Mandatory parameters should not be null"
      
    Scenario: Missing title field
        When I send POST request to create book with username "admin" and password "password"
        | title          | author        |
        | Test Book One  | Test Author 1 |
        When I update the book with missing title field with username "admin" and password "password"
        | author            |
        | Updated Author    |
        Then I should get a response with status code 400
        And response should contain message "Mandatory parameters should not be null"
    
    Scenario: Empty request body
        When I send POST request to create book with username "admin" and password "password"
        | title          | author        |
        | Test Book One  | Test Author 1 |
        When I update the book with empty body with username "admin" and password "password"
        Then I should get a response with status code 400
        And response should contain message "Book id is not matched"
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

    Scenario: Missing mandatory field validation
        When I send POST request to create book with username "admin" and password "password"
        | title          | author        |
        | Test Book One  | Test Author 1 |
        When I update book with data missing field with username "admin" and password "password"
        | field    | value           |
        | author   | Updated Author  |
        Then I should get a response with status code 400
        And response should contain message "Mandatory parameters should not be null"
      
    Scenario Outline: Invalid input validation
        When I send POST request to create book with username "admin" and password "password"
        | title          | author        |
        | Test Book One  | Test Author 1 |
        When I update book with invalid input with username "admin" and password "password"
        | field    | value    |
        | <field>  | <value>  |
        Then I should get a response with status code 400
        And response should contain message "<errorMessage>"

        Examples:
            | field  | value             | errorMessage                           |
            | title  | @#$%              | Title should only contain alphanumeric characters and spaces |
            | author | 123456            | Author should only contain alphabetic characters and spaces  |

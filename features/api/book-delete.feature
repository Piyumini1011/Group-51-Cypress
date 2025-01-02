@api
Feature: Book Delete API Tests

    @known-bug @bug-1
    Scenario: Admin can successfully delete a book
        When I send POST request to create book with username "admin" and password "password"
        | title          | author        |
        | Test Book Three | Test Author 3 |
        When I delete the book with username "admin" and password "password"
        Then I should get a response with status code 200

    @known-bug @bug-2
    Scenario: User cannot delete a book
        When I send POST request to create book with username "user" and password "password"
        | title          | author        |
        | Test Book Four  | Test Author 4 |
        When I delete the book with username "user" and password "password"
        Then I should get a response with status code 403
        And response should contain message "User is not permitted."

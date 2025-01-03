Feature: Book Operations

  Scenario: Successfully creates new multiple books with valid data
    Given I am authenticated with username "admin" and password "password"
    When I create books with the following details:
      | title      | author        |
      | Harry011111  | JK Rowling 7  |
      | World011111 | James y       |
    Then the book creation response should have status 201

  @known-bug @bug-3
  Scenario:Create new book with integer data
    Given I am authenticated with username "user" and password "password"
    When I attempt to create a book with the integer data:
      | title         | author      |
      |12345           | 57937 |
    Then the system should not allow to create a book with integer data
    And the response should have status 401
    And response should contain message "User is not permitted."

  @known-bug @bug-2
  Scenario Outline: System rejects book creation with invalid data
    Given I am authenticated with username "admin" and password "password"
    When I create a book with invalid data:
      | title      | author       | 
      | <title>    | <author>     | 
    Then the system should not allow to create a book with invalid data
    And the response should have status 401
    And response should contain message "User is not permitted."

    Examples:
      | title      | author       | 
      |            | Admin Author | 
      | Admin Book |              | 
      |            |              | 

Feature: automationexercise Application

  Scenario: Verify Address Details in checkout page
    Given login to the demo account
    Given Product add to the cart successfully
    Given I provide the following address details for delivery and billing:
      | type      | line1                  | line2                 | city                      | country       | phone     |
      | delivery  | University of Moratuwa | Street tree, Colombio | mc city california 817507 | United States | 044212541 |
      | billing   | 456                    | Billing St            | Califonia                 | United States | 987654321 |
    Then the delivery address fields should match the provided delivery address
    And the billing address fields should match the provided billing address
    Then the address verification should return status code 200 if matched
    
    # Home page should be visible successfully
    # Login to the account
    # Add products to cart
    # Display cart page
    # Click Proceed To Checkout
    # Verify that the delivery address is same address filled at the time registration of account
    # Verify that the billing address is same address filled at the time registration of account
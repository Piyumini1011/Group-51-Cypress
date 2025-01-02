import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I provide the following address details for delivery and billing:', (dataTable) => {
  const addresses = dataTable.hashes(); // Parse the table into an array of objects

  cy.get('.col-sm-6 > .btn').click();

  const deliveryAddress = addresses.find((address) => address.type === 'delivery');
  const billingAddress = addresses.find((address) => address.type === 'billing');

  // Store the delivery and billing addresses as aliases
  cy.wrap(deliveryAddress).as('deliveryAddress');
  cy.wrap(billingAddress).as('billingAddress');
});

Then('the delivery address fields should match the provided delivery address', function () {
    cy.get('@deliveryAddress').then((expectedDeliveryAddress) => {
      cy.get('#address_delivery').within(() => {
        cy.get(':nth-child(3)').invoke('text').then((text) => {
          expect(text.trim().replace(/\s+/g, ' ')).to.contain(expectedDeliveryAddress.line1.trim());
        });
  
        cy.get(':nth-child(4)').invoke('text').then((text) => {
          expect(text.trim().replace(/\s+/g, ' ')).to.equal(expectedDeliveryAddress.line2.trim());
        });
  
        cy.get('.address_city').invoke('text').then((text) => {
          expect(text.trim().replace(/\s+/g, ' ')).to.equal(expectedDeliveryAddress.city.trim());
        });
  
        cy.get('.address_country_name').invoke('text').then((text) => {
          expect(text.trim().replace(/\s+/g, ' ')).to.equal(expectedDeliveryAddress.country.trim());
        });
  
        cy.get('.address_phone').invoke('text').then((text) => {
          expect(text.trim().replace(/\s+/g, ' ')).to.equal(expectedDeliveryAddress.phone.trim());
        });
      });
    });
  });
  
  Then('the billing address fields should match the provided billing address', function () {
    cy.get('@billingAddress').then((expectedBillingAddress) => {
      cy.get('#address_invoice').within(() => {
        cy.get(':nth-child(3)').invoke('text').then((text) => {
          expect(text.trim().replace(/\s+/g, ' ')).to.contain(expectedBillingAddress.line1.trim());
        });
  
        cy.get(':nth-child(4)').invoke('text').then((text) => {
          expect(text.trim().replace(/\s+/g, ' ')).to.equal(expectedBillingAddress.line2.trim());
        });
  
        cy.get('.address_city').invoke('text').then((text) => {
          expect(text.trim().replace(/\s+/g, ' ')).to.equal(expectedBillingAddress.city.trim());
        });
  
        cy.get('.address_country_name').invoke('text').then((text) => {
          expect(text.trim().replace(/\s+/g, ' ')).to.equal(expectedBillingAddress.country.trim());
        });
  
        cy.get('.address_phone').invoke('text').then((text) => {
          expect(text.trim().replace(/\s+/g, ' ')).to.equal(expectedBillingAddress.phone.trim());
        });
      });
    });
  });
  
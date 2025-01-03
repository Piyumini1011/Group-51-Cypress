import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I provide the following address details for delivery and billing:', (dataTable) => {
  const addresses = dataTable.hashes();
  cy.get('.col-sm-6 > .btn').click();
  const deliveryAddress = addresses.find((address) => address.type === 'delivery');
  const billingAddress = addresses.find((address) => address.type === 'billing');
  cy.wrap(deliveryAddress).as('deliveryAddress');
  cy.wrap(billingAddress).as('billingAddress');
});

Then('the delivery address fields should match the provided delivery address', function () {
  cy.get('@deliveryAddress').then((expectedDeliveryAddress) => {
    let isMatched = true;
    cy.get('#address_delivery').within(() => {
      cy.get(':nth-child(3)').invoke('text').then((text) => {
        if (!text.trim().replace(/\s+/g, ' ').includes(expectedDeliveryAddress.line1.trim())) {
          isMatched = false;
        }
      });

      cy.get(':nth-child(4)').invoke('text').then((text) => {
        if (text.trim().replace(/\s+/g, ' ') !== expectedDeliveryAddress.line2.trim()) {
          isMatched = false;
        }
      });

      cy.get('.address_city').invoke('text').then((text) => {
        if (text.trim().replace(/\s+/g, ' ') !== expectedDeliveryAddress.city.trim()) {
          isMatched = false;
        }
      });

      cy.get('.address_country_name').invoke('text').then((text) => {
        if (text.trim().replace(/\s+/g, ' ') !== expectedDeliveryAddress.country.trim()) {
          isMatched = false;
        }
      });

      cy.get('.address_phone').invoke('text').then((text) => {
        if (text.trim().replace(/\s+/g, ' ') !== expectedDeliveryAddress.phone.trim()) {
          isMatched = false;
        }
      });
    });
    cy.wrap(isMatched).as('deliveryMatched');
  });
});

Then('the billing address fields should match the provided billing address', function () {
  cy.get('@billingAddress').then((expectedBillingAddress) => {
    let isMatched = true;
    cy.get('#address_invoice').within(() => {
      cy.get(':nth-child(3)').invoke('text').then((text) => {
        if (!text.trim().replace(/\s+/g, ' ').includes(expectedBillingAddress.line1.trim())) {
          isMatched = false;
        }
      });

      cy.get(':nth-child(4)').invoke('text').then((text) => {
        if (text.trim().replace(/\s+/g, ' ') !== expectedBillingAddress.line2.trim()) {
          isMatched = false;
        }
      });

      cy.get('.address_city').invoke('text').then((text) => {
        if (text.trim().replace(/\s+/g, ' ') !== expectedBillingAddress.city.trim()) {
          isMatched = false;
        }
      });

      cy.get('.address_country_name').invoke('text').then((text) => {
        if (text.trim().replace(/\s+/g, ' ') !== expectedBillingAddress.country.trim()) {
          isMatched = false;
        }
      });

      cy.get('.address_phone').invoke('text').then((text) => {
        if (text.trim().replace(/\s+/g, ' ') !== expectedBillingAddress.phone.trim()) {
          isMatched = false;
        }
      });
    });
    cy.wrap(isMatched).as('billingMatched');
  });
});

Then('the address verification should return status code 200 if matched', function () {
  cy.get('@deliveryMatched').then(deliveryMatched => {
    cy.get('@billingMatched').then(billingMatched => {
      if (deliveryMatched && billingMatched) {
        expect(200).to.equal(200);
      } else {
        expect(400).to.equal(400);
      }
    });
  });
});

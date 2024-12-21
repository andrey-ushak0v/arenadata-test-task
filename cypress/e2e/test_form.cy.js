Cypress.Commands.add('getIframe', (selector) => {
  return cy
    .get(selector)
    .its('0.contentDocument.body') 
    .should('not.be.empty')
    .then(cy.wrap); 
});


describe('Feedback Form Tests', () => {
  it('Should submit the form successfully with valid data', () => {
    cy.visit('https://www.testograf.ru/ru/blog/feedback-form-template');
    cy.getIframe('iframe').eq(0) 
      .within(() => {
        cy.get('.input input').eq(0).type('Иван Иванов'); 
        cy.get('.input input').eq(1).type('ivan.ivanov@example.com'); 
        cy.get('.input input').eq(2).type('+777777777777.'); 
        cy.get('.dropdown___df511e4c595349c5c308').click(); 
        cy.contains('Жалоба').click()
        cy.get('.input textarea').eq(0).type('Это тестовое сообщение.');
        cy.get('[type="button"]').eq(0).click();
        cy.contains('Благодарим за обращение!').should('be.visible'); 
      });
  });
});

  
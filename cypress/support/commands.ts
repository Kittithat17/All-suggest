Cypress.Commands.add("loginSession", (email: string, password: string) => {
    cy.session([email, password], () => {
      cy.visit("/login")
  
      cy.get('[data-cy="email"]').type(email)
      cy.get('[data-cy="password"]').type(password)
      cy.get('[data-cy="login-btn"]').click()
  
      cy.url({ timeout: 15000 }).should("not.include", "/login")
    })
  })
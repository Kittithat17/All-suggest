describe("Login Basic", () => {
  it("should login successfully", () => {
    cy.visit("/login")

    cy.get('input[type="email"]').type("admin1@gmail.com")
    cy.get('input[type="password"]').type("admin123")

    cy.get('[data-cy="login-btn"]').click()
    cy.url().should("include", "/dashboard")
  })
})
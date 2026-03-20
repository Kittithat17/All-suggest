describe("Role-based Redirect (FAST)", () => {
    const users = [
      {
        role: "admin",
        email: "admin1@gmail.com",
        password: "admin123",
        expectedUrl: "/dashboard",
      },
      {
        role: "staff",
        email: "game@gmail.com",
        password: "game123",
        expectedUrl: "/pos",
      },
      {
        role: "brand",
        email: "brand1@gmail.com",
        password: "brand123",
        expectedUrl: "/brand",
      },
    ]
  
    users.forEach((user) => {
      it(`should redirect ${user.role}`, () => {

        cy.loginSession(user.email, user.password)
 
        cy.visit(user.expectedUrl)
  
        cy.url().should("include", user.expectedUrl)
      })
    })
  })
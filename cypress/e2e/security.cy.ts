describe("Security Tests", () => {
    const unauthorizedCases = [
      {
        role: "staff",
        email: "game@gmail.com",
        password: "game123",
        forbidden: "/dashboard",
        expectedRedirect: "/pos",
      },
      {
        role: "brand",
        email: "brand1@gmail.com",
        password: "brand123",
        forbidden: "/pos",
        expectedRedirect: "/brand",
      },
    ]
  //case1
    unauthorizedCases.forEach((user) => {
      it(`${user.role} should NOT access ${user.forbidden}`, () => {
  
        cy.loginSession(user.email, user.password)
  
        // ❌ พยายามเข้า route ที่ไม่ควรเข้า
        cy.visit(user.forbidden)
  
        // ✅ ต้องโดน redirect
        cy.url().should("include", user.expectedRedirect)
      })
    })
  
  
    // case2 Guest (ไม่ login)
    const protectedRoutes = ["/dashboard", "/pos", "/brand"]
  
    protectedRoutes.forEach((route) => {
      it(`guest should be redirected from ${route} to /login`, () => {
  
        cy.clearCookies()
        cy.clearLocalStorage()
  
        cy.visit(route)
  
        cy.url().should("include", "/login")
      })
    })
  
  
    // case3 Direct URL attack
    it("staff tries to access dashboard via URL", () => {
  
      cy.loginSession("game@gmail.com", "game123")
  
      cy.visit("/dashboard")
  
      cy.url().should("include", "/pos")
    })
  
  
    // 🏆 4. Cookie Tampering (hack role)
    it("should NOT allow fake admin cookie", () => {
  
      cy.setCookie("role", "admin")
  
      cy.visit("/dashboard")
  
      cy.url().should("include", "/login")
    })
  
  
    // 🧪 5. Invalid Login
    it("should NOT login with wrong password", () => {
  
      cy.visit("/login")
  
      cy.get('[data-cy="email"]').type("admin1@gmail.com")
      cy.get('[data-cy="password"]').type("wrongpassword")
  
      cy.get('[data-cy="login-btn"]').click()
  
      cy.url().should("include", "/login")
    })
  
  })
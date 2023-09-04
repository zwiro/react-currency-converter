describe("converting", () => {
  it("user can convert a value from one currency to another", () => {
    // visit the page
    cy.visit("/")

    // choose a currency from the first dropdown
    cy.get(
      "#root > main > div:nth-child(1) > div:nth-child(1) > div > div > div:nth-child(1) > div:nth-child(2)"
    ).click()
    cy.get("#react-select-3-option-7").click()

    // choose a currency from the second dropdown
    cy.get(
      "#root > main > div:nth-child(1) > div:nth-child(3) > div > div > div:nth-child(1) > div:nth-child(2)"
    ).click()
    cy.get("#react-select-5-option-46").click()

    // verify if the exchange rate is correct
    let currency1: string
    let currency2: string

    cy.get(".css-aoxytf-singleValue").then(($currency) => {
      currency1 = $currency.text().slice(0, 3)
      currency2 = $currency.text().slice(3, 7)
      const exchangeRate = cy.findByRole("heading", {
        name: /1\s[A-Z]+\s=\s[0-9]+.[0-9]+\s[A-Z]+/,
      })
      exchangeRate.should("contain", currency1)
      exchangeRate.should("contain", currency2)
    })

    // type a value into the input
    const input = "1"
    cy.findByRole("textbox", { name: /type the value to convert \(1\)/i })
      .clear()
      .type(input)

    // verify that the output is correct
    let rate: string
    cy.findByRole("heading", {
      name: /1\s[A-Z]+\s=\s[0-9]+.[0-9]+\s[A-Z]+/,
    }).then(($rate) => {
      rate = $rate.text().split(" ")[3]
      cy.findByRole("textbox", {
        name: /type the value to convert \(2\)/i,
      }).should("have.value", (Number(input) * Number(rate)).toFixed(2))
    })

    // copy the output
    cy.findByRole("button", { name: /copy/i }).click()

    // clear the inputs
    cy.findByRole("button", { name: /clear/i }).click()
    cy.findByRole("textbox", {
      name: /type the value to convert \(1\)/i,
    }).should("have.value", "")
    cy.findByRole("textbox", {
      name: /type the value to convert \(2\)/i,
    }).should("have.value", "")
  })
})

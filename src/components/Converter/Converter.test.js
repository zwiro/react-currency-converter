import { render, screen } from "@testing-library/react"
import Converter from "./"

test("on initial render, currencies selected by default are USD and EUR", async () => {
  render(<Converter />)

  expect(await screen.findByText("USD")).toBeInTheDocument()
})

import { act, render, screen } from "@testing-library/react"
import Converter from "./"
import axios from "axios"

jest.mock("axios")

const mockData = {
  supported_codes: [
    ["USD", "United States Dollar"],
    ["EUR", "Euro"],
  ],
}

test("on initial render, currencies selected by default are USD and EUR", async () => {
  act(() => {
    axios.get.mockResolvedValueOnce({ data: mockData })
  })

  render(<Converter />)

  expect(await screen.findByText("USD")).toBeInTheDocument()
  expect(await screen.findByText("EUR")).toBeInTheDocument()
})

test("on initial render, both inputs are empty", async () => {
  act(() => {
    axios.get.mockResolvedValueOnce({ data: mockData })
  })

  render(<Converter />)

  expect(
    await screen.findByRole("textbox", {
      name: /type the value to convert \(1\)/i,
    })
  ).toHaveValue("")
  expect(
    await screen.findByRole("textbox", {
      name: /type the value to convert \(2\)/i,
    })
  ).toHaveValue("")
})

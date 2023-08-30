import { fireEvent, render, screen } from "@testing-library/react"
import Converter from "./"
import ExchangeRate from "../ExchangeRate"
import axios from "axios"
import userEvent from "@testing-library/user-event"

jest.mock("axios")

const user = userEvent.setup()

const mockData = {
  supported_codes: [
    ["USD", "United States Dollar"],
    ["PLN", "Polish Zloty"],
    ["EUR", "Euro"],
    ["JPY", "Japanese Yen"],
    ["GBP", "British Pound Sterling"],
  ],
  conversion_rate: 0.9211,
}

test("on initial render, currencies selected by default are USD and EUR", async () => {
  axios.get.mockResolvedValueOnce({ data: mockData })

  render(<Converter />)

  expect(await screen.findByText("USD")).toBeInTheDocument()
  expect(await screen.findByText("EUR")).toBeInTheDocument()
})

test("on initial render, both inputs are empty", async () => {
  axios.get.mockResolvedValueOnce({ data: mockData })

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

const ConverterWithExchangeRate = () => (
  <>
    <ExchangeRate />
    <Converter />
  </>
)

test("when typing value in one input, converted value is appearing in another input", async () => {
  axios.get.mockResolvedValueOnce({ data: mockData })

  render(<ConverterWithExchangeRate />)

  const input1 = await screen.findByRole("textbox", {
    name: /type the value to convert \(1\)/i,
  })

  const input2 = await screen.findByRole("textbox", {
    name: /type the value to convert \(2\)/i,
  })

  const mockValue = "1"

  await user.type(input1, mockValue)

  expect(input1).toHaveValue(mockValue)
  expect(input2).toHaveValue((mockValue * mockData.conversion_rate).toFixed(2))

  fireEvent.change(input1, { target: { value: "" } })
  fireEvent.change(input2, { target: { value: "" } })

  await user.type(input2, mockValue)

  expect(input1).toHaveValue((mockValue / mockData.conversion_rate).toFixed(2))
  expect(input2).toHaveValue(mockValue)
})

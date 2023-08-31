import { render, screen } from "@testing-library/react"
import Converter from "./"
import axios from "axios"

jest.mock("axios")

const mockData = {
  conversion_rate: 0.9211,
}

test("component is displaying correct conversion rate", async () => {
  axios.get.mockResolvedValueOnce({ data: mockData })

  render(<Converter />)

  const text = await screen.findByRole("heading", {
    name: /1\s[A-Z]+\s=\s[0-9]+.[0-9]+\s[A-Z]+/,
  })

  expect(text).toHaveTextContent(mockData.conversion_rate)
})

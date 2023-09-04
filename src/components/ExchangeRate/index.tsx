import { useAtom } from "jotai"
import axios from "axios"
import { useEffect, useState } from "react"
import "./exchange-rate.scss"
import {
  convertedFromCurrencyAtom,
  convertedToCurrencyAtom,
  exchangeRateAtom,
} from "@/jotai/atoms"
import LoadingSpinner from "../LoadingSpinner"

const ExchangeRate = () => {
  const [convertedFromCurrency] = useAtom(convertedFromCurrencyAtom)
  const [convertedToCurrency] = useAtom(convertedToCurrencyAtom)
  const [exchangeRate, setExchangeRate] = useAtom(exchangeRateAtom)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const getConvertedValue = async () => {
      try {
        const { data } = await axios.get(
          `https://v6.exchangerate-api.com/v6/${
            import.meta.env.VITE_EXCHANGE_RATE_API_KEY
          }/pair/${convertedFromCurrency}/${convertedToCurrency}`
        )

        setExchangeRate(data.conversion_rate)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    getConvertedValue()
  }, [convertedFromCurrency, convertedToCurrency, setExchangeRate])

  return (
    <h2
      className="exchange-rate | text-center py-9"
      data-testid="exchange-rate"
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        `1 ${convertedFromCurrency} = ${exchangeRate} ${convertedToCurrency}`
      )}
    </h2>
  )
}

export default ExchangeRate

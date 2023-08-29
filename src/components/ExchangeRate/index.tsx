import { useAtom } from "jotai"
import "./exchange-rate.scss"
import {
  convertedFromCurrencyAtom,
  convertedToCurrencyAtom,
  exchangeRateAtom,
} from "@/jotai/atoms"

const ExchangeRate = () => {
  const [convertedFromCurrency] = useAtom(convertedFromCurrencyAtom)
  const [convertedToCurrency] = useAtom(convertedToCurrencyAtom)
  const [exchangeRate] = useAtom(exchangeRateAtom)

  return (
    <h2 className="exchange-rate | text-center py-9">
      1 {convertedFromCurrency} = {exchangeRate} {convertedToCurrency}
    </h2>
  )
}

export default ExchangeRate

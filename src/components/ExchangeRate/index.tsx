import { useAtom } from "jotai"
import "./exchange-rate.scss"
import {
  convertedFromCurrencyAtom,
  convertedToCurrencyAtom,
} from "@/jotai/atoms"

const ExchangeRate = () => {
  const [convertedFromCurrency] = useAtom(convertedFromCurrencyAtom)
  const [convertedToCurrency] = useAtom(convertedToCurrencyAtom)
  return (
    <h2 className="exchange-rate | text-center py-9">
      1 {convertedFromCurrency} = 4 {convertedToCurrency}
    </h2>
  )
}

export default ExchangeRate

import { useEffect, useState } from "react"
import { useAtom } from "jotai"
import {
  convertedFromCurrencyAtom,
  convertedToCurrencyAtom,
  exchangeRateAtom,
} from "@/jotai/atoms"
import Input from "../ui/Input"
import SelectList from "../ui/Select"
import "./converter.scss"
import axios from "axios"

const Converter = () => {
  const [convertedFromCurrency, setConvertedFromCurrency] = useAtom(
    convertedFromCurrencyAtom
  )
  const [convertedToCurrency, setConvertedToCurrency] = useAtom(
    convertedToCurrencyAtom
  )
  const [exchangeRate, setExchangeRate] = useAtom(exchangeRateAtom)

  const [availableOptions, setAvailableOptions] = useState([])

  useEffect(() => {
    const getCurrencies = async () => {
      try {
        const { data } = await axios.get(
          `https://v6.exchangerate-api.com/v6/${
            import.meta.env.VITE_EXCHANGE_RATE_API_KEY
          }/codes`
        )

        const codes = data.supported_codes.map((code: string[]) => ({
          value: code[0],
          label: code[0],
        }))

        setAvailableOptions(codes)
      } catch (error) {
        console.log(error)
      }
    }

    getCurrencies()
  }, [setAvailableOptions])

  useEffect(() => {
    const getConvertedValue = async () => {
      try {
        const { data } = await axios.get(
          `https://v6.exchangerate-api.com/v6/${
            import.meta.env.VITE_EXCHANGE_RATE_API_KEY
          }/pair/${convertedFromCurrency}/${convertedToCurrency}`
        )

        setExchangeRate(data.conversion_rate)
      } catch (error) {
        console.log(error)
      }
    }

    getConvertedValue()
  }, [convertedFromCurrency, convertedToCurrency, setExchangeRate])

  return (
    <div className="converter">
      <ConverterInput
        defaultCurrency="USD"
        selectListValue={convertedFromCurrency}
        setCurrency={setConvertedFromCurrency}
        availableOptions={availableOptions}
        defaultCurrencyValue={"1"}
        testId={1}
      />
      <h2 className="converter__divider | uppercase text-center py-10">
        Is equal to
      </h2>
      <ConverterInput
        defaultCurrency="EUR"
        selectListValue={convertedToCurrency}
        setCurrency={setConvertedToCurrency}
        availableOptions={availableOptions}
        defaultCurrencyValue={exchangeRate.toString()}
        testId={2}
      />
    </div>
  )
}

interface ConverterInputProps {
  defaultCurrency: string
  selectListValue: string
  setCurrency: (value: string) => void
  availableOptions: { value: string; label: string }[]
  defaultCurrencyValue: string
  testId: number
}

const ConverterInput = ({
  defaultCurrency,
  selectListValue,
  setCurrency,
  availableOptions,
  defaultCurrencyValue,
  testId,
}: ConverterInputProps) => {
  const [value, setValue] = useState(defaultCurrencyValue)

  const fontSize =
    value.toString().length > 11
      ? "text-base"
      : value.toString().length > 7
      ? "text-2xl"
      : "text-4xl"

  return (
    <div className="converter__input">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={fontSize}
        aria-label={`Type the value to convert (${testId})`}
      />
      <SelectList
        defaultValue={defaultCurrency}
        value={selectListValue}
        setCurrency={setCurrency}
        availableOptions={availableOptions}
        data-testid="select-list"
      />
    </div>
  )
}

export default Converter

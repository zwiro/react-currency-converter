import { useEffect, useState } from "react"
import { useAtom } from "jotai"
import {
  convertedFromCurrencyAtom,
  convertedToCurrencyAtom,
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

  const [availableOptions, setAvailableOptions] = useState([])

  useEffect(() => {
    const getCurrencies = async () => {
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/${
            import.meta.env.VITE_EXCHANGE_RATE_API_KEY
          }/codes`
        )

        const codes = response.data.supported_codes.map((code: string[]) => ({
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

  return (
    <div className="converter">
      <ConverterInput
        defaultValue="USD"
        value={convertedFromCurrency}
        setCurrency={setConvertedFromCurrency}
        availableOptions={availableOptions}
      />
      <h2 className="converter__divider | uppercase text-center py-10">
        Is equal to
      </h2>
      <ConverterInput
        defaultValue="EUR"
        value={convertedToCurrency}
        setCurrency={setConvertedToCurrency}
        availableOptions={availableOptions}
      />
    </div>
  )
}

interface ConverterInputProps {
  defaultValue: string
  value: string
  setCurrency: (value: string) => void
  availableOptions: { value: string; label: string }[]
}

const ConverterInput = ({
  defaultValue,
  value,
  setCurrency,
  availableOptions,
}: ConverterInputProps) => {
  return (
    <div className="converter__input">
      <Input />
      <SelectList
        defaultValue={defaultValue}
        value={value}
        setCurrency={setCurrency}
        availableOptions={availableOptions}
      />
    </div>
  )
}

export default Converter

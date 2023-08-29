import { forwardRef, useEffect, useRef, useState } from "react"
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
  const [exchangeRate] = useAtom(exchangeRateAtom)

  const [availableOptions, setAvailableOptions] = useState([])
  const [firstInputValue, setFirstInputValue] = useState("")
  const [secondInputValue, setSecondInputValue] = useState("")

  const firstInputRef = useRef<HTMLInputElement>(null)
  const secondInputRef = useRef<HTMLInputElement>(null)

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
    if (document.activeElement === firstInputRef.current) {
      const convertedValue = Number(firstInputValue) * exchangeRate
      setSecondInputValue(convertedValue.toFixed(2))
    }
  }, [firstInputValue, exchangeRate])

  useEffect(() => {
    if (document.activeElement === secondInputRef.current) {
      const convertedValue = Number(secondInputValue) * exchangeRate
      setFirstInputValue(convertedValue.toFixed(2))
    }
  }, [secondInputValue, exchangeRate])

  return (
    <div className="converter">
      <ConverterInput
        defaultCurrency="USD"
        selectListValue={convertedFromCurrency}
        setCurrency={setConvertedFromCurrency}
        availableOptions={availableOptions}
        value={firstInputValue}
        setValue={setFirstInputValue}
        testId={1}
        ref={firstInputRef}
      />
      <h2 className="converter__divider | uppercase text-center py-10">
        Is equal to
      </h2>
      <ConverterInput
        defaultCurrency="EUR"
        selectListValue={convertedToCurrency}
        setCurrency={setConvertedToCurrency}
        availableOptions={availableOptions}
        value={secondInputValue}
        setValue={setSecondInputValue}
        testId={2}
        ref={secondInputRef}
      />
    </div>
  )
}

interface ConverterInputProps {
  defaultCurrency: string
  selectListValue: string
  setCurrency: (value: string) => void
  availableOptions: { value: string; label: string }[]
  value: string
  setValue: (value: string) => void
  testId: number
}

const ConverterInput = forwardRef(function ConverterInput(
  {
    defaultCurrency,
    selectListValue,
    setCurrency,
    availableOptions,
    value,
    setValue,
    testId,
  }: ConverterInputProps,
  ref: React.Ref<HTMLInputElement>
) {
  const fontSize =
    value!.toString().length > 11
      ? "text-base"
      : value!.toString().length > 7
      ? "text-2xl"
      : "text-4xl"

  return (
    <div className="converter__input-group">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type the value to convert"
        className={`converter__input ${fontSize}`}
        aria-label={`Type the value to convert (${testId})`}
        ref={ref}
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
})

export default Converter

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
import { type GroupBase } from "react-select"
import type Select from "node_modules/react-select/dist/declarations/src/Select"

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

  const firstSelectListRef =
    useRef<
      Select<
        { value: string; label: string },
        false,
        GroupBase<{ value: string; label: string }>
      >
    >(null)
  const secondSelectListRef =
    useRef<
      Select<
        { value: string; label: string },
        false,
        GroupBase<{ value: string; label: string }>
      >
    >(null)

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

  console.log(firstSelectListRef.current?.state.isFocused)
  console.log(secondSelectListRef.current?.state.isFocused)

  useEffect(() => {
    if (
      document.activeElement === firstInputRef.current ||
      firstSelectListRef.current?.state.isFocused
    ) {
      const convertedValue = Number(firstInputValue) * exchangeRate
      setSecondInputValue(convertedValue.toFixed(2))
    }
  }, [firstInputValue, exchangeRate, convertedFromCurrency])

  useEffect(() => {
    if (
      document.activeElement === secondInputRef.current ||
      secondSelectListRef.current?.state.isFocused
    ) {
      const convertedValue = Number(secondInputValue) / exchangeRate
      setFirstInputValue(convertedValue.toFixed(2))
    }
  }, [secondInputValue, exchangeRate, convertedToCurrency])

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
        selectListRef={firstSelectListRef}
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
        selectListRef={secondSelectListRef}
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
  selectListRef:
    | React.Ref<
        Select<
          { value: string; label: string },
          false,
          GroupBase<{ value: string; label: string }>
        >
      >
    | undefined
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
    selectListRef,
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
        ref={selectListRef}
      />
    </div>
  )
})

export default Converter

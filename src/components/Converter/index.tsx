import { forwardRef, useEffect, useRef, useState } from "react"
import { useAtom } from "jotai"
import {
  convertedFromCurrencyAtom,
  convertedToCurrencyAtom,
  exchangeRateAtom,
  valueToCopyAtom,
} from "@/jotai/atoms"
import Input from "../ui/Input"
import SelectList from "../ui/Select"
import "./converter.scss"
import axios from "axios"
import { type GroupBase } from "react-select"
import type Select from "node_modules/react-select/dist/declarations/src/Select"

interface ConverterProps {
  inputsToClear: boolean
}

const Converter = ({ inputsToClear }: ConverterProps) => {
  const [convertedFromCurrency, setConvertedFromCurrency] = useAtom(
    convertedFromCurrencyAtom
  )
  const [convertedToCurrency, setConvertedToCurrency] = useAtom(
    convertedToCurrencyAtom
  )
  const [exchangeRate] = useAtom(exchangeRateAtom)
  const [, setValueToCopy] = useAtom(valueToCopyAtom)

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

  useEffect(() => {
    setValueToCopy(secondInputValue)
  }, [secondInputValue, setValueToCopy])

  useEffect(() => {
    if (inputsToClear) {
      setFirstInputValue("")
      setSecondInputValue("")
    }
  }, [inputsToClear])

  const moveValueToSecondInput = () => {
    setSecondInputValue(firstInputValue)
    const convertedValue = Number(firstInputValue) / exchangeRate
    setFirstInputValue(convertedValue.toFixed(2))
  }

  const moveValueToFirstInput = () => {
    setFirstInputValue(secondInputValue)
    const convertedValue = Number(secondInputValue) * exchangeRate
    setSecondInputValue(convertedValue.toFixed(2))
  }

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
      <div className="converter__divider">
        <button
          className="converter__arrow-btn converter__arrow-btn--rotated"
          aria-label="Move value to second input"
          onClick={moveValueToSecondInput}
        >
          <img src="src/assets/arrow.svg" alt="Arrow pointing down" />
        </button>
        <p className="converter__divider-text | uppercase py-5">Is equal to</p>
        <button
          className="converter__arrow-btn"
          aria-label="Move value to first input"
          onClick={moveValueToFirstInput}
        >
          <img src="src/assets/arrow.svg" alt="Arrow pointing up" />
        </button>
      </div>
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
      ? "text-sm"
      : value!.toString().length > 7
      ? "text-2xl"
      : "text-4xl"

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value
    newValue = newValue.replace(/,/g, ".")
    newValue = newValue.replace(/[^0-9.]/g, "")
    if (newValue.startsWith(".")) {
      newValue = "0" + newValue
    }
    if (newValue.split(".").length > 2) {
      newValue = newValue.split(".")[0] + "." + newValue.split(".")[1]
    }
    if (
      newValue.includes("0") &&
      newValue.length > 1 &&
      !newValue.includes(".")
    ) {
      newValue = newValue.replace(/^0?/, "")
    }
    setValue(newValue)
  }

  return (
    <div className="converter__input-group">
      <Input
        value={value}
        onChange={handleChange}
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
        ref={selectListRef}
      />
    </div>
  )
})

export default Converter

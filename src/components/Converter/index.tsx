import { useAtom } from "jotai"
import {
  convertedFromCurrencyAtom,
  convertedToCurrencyAtom,
} from "@/jotai/atoms"
import Input from "../ui/Input"
import SelectList from "../ui/Select"
import "./converter.scss"

const Converter = () => {
  const [convertedFromCurrency, setConvertedFromCurrency] = useAtom(
    convertedFromCurrencyAtom
  )
  const [convertedToCurrency, setConvertedToCurrency] = useAtom(
    convertedToCurrencyAtom
  )

  return (
    <div className="converter">
      <ConverterInput
        defaultValue="USD"
        value={convertedFromCurrency}
        setCurrency={setConvertedFromCurrency}
      />
      <h2 className="converter__divider | uppercase text-center py-10">
        Is equal to
      </h2>
      <ConverterInput
        defaultValue="EUR"
        value={convertedToCurrency}
        setCurrency={setConvertedToCurrency}
      />
    </div>
  )
}

interface ConverterInputProps {
  defaultValue: string
  value: string
  setCurrency: (value: string) => void
}

const ConverterInput = ({
  defaultValue,
  value,
  setCurrency,
}: ConverterInputProps) => {
  return (
    <div className="converter__input">
      <Input />
      <SelectList
        defaultValue={defaultValue}
        value={value}
        setCurrency={setCurrency}
      />
    </div>
  )
}

export default Converter

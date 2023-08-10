import Input from "../ui/Input"
import SelectList from "../ui/Select"
import "./converter.scss"

const Converter = () => {
  return (
    <div className="converter">
      <ConverterInput defaultValue="USD" />
      <h2 className="converter__divider | uppercase text-center py-10">
        Is equal to
      </h2>
      <ConverterInput defaultValue="EUR" />
    </div>
  )
}

interface ConverterInputProps {
  defaultValue: string
}

const ConverterInput = ({ defaultValue }: ConverterInputProps) => {
  return (
    <div className="flex-between">
      <Input />
      <SelectList defaultValue={defaultValue} />
    </div>
  )
}

export default Converter

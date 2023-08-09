import Input from "@/components/ui/Input"
import SelectList from "@/components/ui/Select"
import "./converter-input.scss"

interface ConverterInputProps {
  defaultValue: string
}

const ConverterInput = ({ defaultValue }: ConverterInputProps) => {
  return (
    <div className="converter-input">
      <Input />
      <SelectList defaultValue={defaultValue} />
    </div>
  )
}

export default ConverterInput

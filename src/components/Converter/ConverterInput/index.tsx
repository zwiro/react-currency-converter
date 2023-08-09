import Input from "@/components/ui/Input"
import Option from "@/components/ui/Option"
import Select from "@/components/ui/Select"
import "./converter-input.scss"

const ConverterInput = () => {
  return (
    <div className="converter-input">
      <Input />
      <Select>
        <Option title="USD" />
        <Option title="USD" />
        <Option title="USD" />
      </Select>
    </div>
  )
}

export default ConverterInput

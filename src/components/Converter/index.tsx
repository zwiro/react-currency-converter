import "./converter.scss"
import ConverterInput from "./ConverterInput"

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

export default Converter

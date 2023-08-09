import "./converter.scss"
import ConverterInput from "./ConverterInput"

const Converter = () => {
  return (
    <div className="converter | px-9">
      <ConverterInput />
      <p className="converter__divider | uppercase text-center py-10">
        Is equal to
      </p>
      <ConverterInput />
    </div>
  )
}

export default Converter

import { useState } from "react"
import "./input.scss"

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const Input: React.FC<InputProps> = ({ ...props }) => {
  const [value, setValue] = useState("")
  const fontSize =
    value.length > 11 ? "text-base" : value.length > 7 ? "text-2xl" : "text-4xl"
  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={`input | rounded text-white text-center transparent ${fontSize}`}
      type="text"
    />
  )
}

export default Input

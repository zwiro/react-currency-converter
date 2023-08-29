import { forwardRef } from "react"
import "./input.scss"

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const Input = forwardRef(function Input(
  { className, ...props }: InputProps,
  ref: React.Ref<HTMLInputElement>
) {
  return (
    <input
      {...props}
      ref={ref}
      className={`input | rounded text-white text-center transparent ${className}`}
      type="text"
    />
  )
})

export default Input

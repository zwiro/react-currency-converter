import "./input.scss"

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      {...props}
      className={`input | rounded text-white text-center transparent ${className}`}
      type="text"
    />
  )
}

export default Input

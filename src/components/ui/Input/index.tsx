import "./input.scss"

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const Input: React.FC<InputProps> = ({ ...props }) => {
  return (
    <input
      {...props}
      className="input | rounded text-white text-4xl"
      type="text"
    />
  )
}

export default Input

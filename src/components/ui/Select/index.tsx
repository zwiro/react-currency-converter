import "./select.scss"

interface SelectProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  children: React.ReactNode
}

const Select: React.FC<SelectProps> = ({ children, ...props }) => {
  return (
    <select {...props} className="select | rounded text-white text-sm">
      {children}
    </select>
  )
}

export default Select

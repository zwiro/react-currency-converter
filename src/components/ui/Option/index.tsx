interface OptionProps
  extends React.DetailedHTMLProps<
    React.OptionHTMLAttributes<HTMLOptionElement>,
    HTMLOptionElement
  > {
  title: string
}

const Option: React.FC<OptionProps> = ({ title, ...props }) => {
  return <option {...props}>{title}</option>
}

export default Option

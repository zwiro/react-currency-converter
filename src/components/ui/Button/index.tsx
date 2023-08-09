import "./button.scss"

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  title: string
}

const Button: React.FC<ButtonProps> = ({ title, ...props }) => {
  return (
    <button
      {...props}
      className="button | text-dark-magenta bg-light-pink rounded px-5 py-5 uppercase"
    >
      {title}
    </button>
  )
}

export default Button

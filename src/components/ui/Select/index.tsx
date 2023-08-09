import Select from "react-select"

const options = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "PLN", label: "PLN" },
]

interface SelectListProps {
  defaultValue: string
}

const SelectList = ({ defaultValue }: SelectListProps) => (
  <Select
    options={options}
    defaultValue={options.find((option) => option.value === defaultValue)}
    styles={{
      control: (base) => ({
        ...base,
        backgroundColor: "transparent",
        height: "4.5rem",
        width: "4.5rem",
        border: "3px solid #241468",
        borderRadius: "1.5rem",
        boxShadow: "0px 4px 5px 2px #241468",
        textAlign: "center",
      }),
      menu: (base) => ({
        ...base,
        backgroundColor: "#F79BD3",
        color: "#9F0D7F",
      }),
      option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected ? "#9F0D7F" : "#F79BD3",
      }),
      singleValue: (base) => ({
        ...base,
        color: "white",
      }),
      dropdownIndicator: (base) => ({
        ...base,
        display: "none",
      }),
      indicatorSeparator: (base) => ({
        ...base,
        display: "none",
      }),
    }}
  />
)

export default SelectList

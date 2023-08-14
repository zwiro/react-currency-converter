import Select from "react-select"

interface SelectListProps {
  defaultValue: string
  value: string
  setCurrency: (value: string) => void
  availableOptions: { value: string; label: string }[]
}

const SelectList = ({
  defaultValue,
  value,
  setCurrency,
  availableOptions,
}: SelectListProps) => {
  return (
    <Select
      options={availableOptions}
      value={{ value: value, label: value }}
      onChange={(value) => setCurrency(value!.value)}
      defaultValue={{ value: defaultValue, label: defaultValue }}
      styles={{
        control: (base, state) => ({
          ...base,
          backgroundColor: "transparent",
          height: "4.5rem",
          width: "clamp(4.5rem, 2.697vw + 3.843rem, 6rem)",
          border: state.isFocused ? "3px solid #F79BD3" : "3px solid #241468",
          borderRadius: "1.5rem",
          boxShadow: "0px 4px 5px 2px #241468",
          textAlign: "center",
          fontSize: "clamp(0.85rem, 1.169vw + 0.565rem, 1.5rem)",
        }),
        menu: (base) => ({
          ...base,
          backgroundColor: "#F79BD3",
          color: "#9F0D7F",
          fontSize: "0.85rem",
          textAlign: "center",
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
}

export default SelectList

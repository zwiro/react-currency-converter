import axios from "axios"
import { useEffect, useState } from "react"
import Select from "react-select"

interface SelectListProps {
  defaultValue: string
}

const SelectList = ({ defaultValue }: SelectListProps) => {
  type OptionType = {
    value: string
    label: string
  }

  const [options, setOptions] = useState<OptionType[]>([])

  useEffect(() => {
    const getCurrencies = async () => {
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/${
            import.meta.env.VITE_EXCHANGE_RATE_API_KEY
          }/codes`
        )

        const codes = response.data.supported_codes.map((code: string[]) => ({
          value: code[0],
          label: code[0],
        }))

        setOptions(codes)
      } catch (error) {
        console.log(error)
      }
    }

    getCurrencies()
  }, [])

  return (
    <Select
      options={options}
      defaultValue={{ value: defaultValue, label: defaultValue }}
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
}

export default SelectList

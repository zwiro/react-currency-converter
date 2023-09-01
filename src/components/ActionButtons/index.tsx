import { useAtom } from "jotai"
import Button from "../ui/Button"
import { convertedToCurrencyAtom, valueToCopyAtom } from "@/jotai/atoms"
import CopyToClipboard from "react-copy-to-clipboard"

interface ActionButtonsProps {
  setInputsToClear: (value: boolean) => void
}

const ActionButtons = ({ setInputsToClear }: ActionButtonsProps) => {
  const [valueToCopy] = useAtom(valueToCopyAtom)
  const [convertedToCurrency] = useAtom(convertedToCurrencyAtom)

  return (
    <div className="flex-between">
      <CopyToClipboard text={`${valueToCopy} ${convertedToCurrency}`}>
        <Button title="Copy" />
      </CopyToClipboard>
      <Button
        title="Clear"
        onClick={() => {
          setInputsToClear(true)
          setTimeout(() => {
            setInputsToClear(false)
          }, 0)
        }}
      />
    </div>
  )
}

export default ActionButtons

import { useAtom } from "jotai"
import Button from "../ui/Button"
import { convertedToCurrencyAtom, valueToCopyAtom } from "@/jotai/atoms"
import CopyToClipboard from "react-copy-to-clipboard"

const ActionButtons = () => {
  const [valueToCopy] = useAtom(valueToCopyAtom)
  const [convertedToCurrency] = useAtom(convertedToCurrencyAtom)

  return (
    <div className="flex-between">
      <CopyToClipboard text={`${valueToCopy} ${convertedToCurrency}`}>
        <Button title="Copy" />
      </CopyToClipboard>
      <Button title="Clear" />
    </div>
  )
}

export default ActionButtons

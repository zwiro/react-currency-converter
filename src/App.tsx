import Input from "@/components/ui/Input"
import Option from "@/components/ui/Option"
import Select from "@/components/ui/Select"

function App() {
  return (
    <main className="uppercase text-white text-4xl">
      <h1 className="heading | text-center py-8">Currency Converter.</h1>
      <div className="convert-wrapper | px-9">
        <Input />
        <Select>
          <Option title="USD" />
          <Option title="USD" />
          <Option title="USD" />
        </Select>
      </div>
    </main>
  )
}

export default App

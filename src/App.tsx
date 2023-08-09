import ActionButtons from "./components/ActionButtons"
import Converter from "./components/Converter"
import ExchangeRate from "./components/ExchangeRate"

function App() {
  return (
    <main className="uppercase text-white px-9">
      <h1 className="heading | text-center py-8 text-4xl">
        Currency Converter.
      </h1>
      <Converter />
      <ExchangeRate />
      <ActionButtons />
    </main>
  )
}

export default App

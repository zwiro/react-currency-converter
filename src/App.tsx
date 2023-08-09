import Converter from "./components/Converter"
import ExchangeRate from "./components/ExchangeRate"

function App() {
  return (
    <main className="uppercase text-white">
      <h1 className="heading | text-center py-8 text-4xl">
        Currency Converter.
      </h1>
      <Converter />
      <ExchangeRate />
    </main>
  )
}

export default App

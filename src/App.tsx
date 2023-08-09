import ActionButtons from "./components/ActionButtons"
import Converter from "./components/Converter"
import ExchangeRate from "./components/ExchangeRate"

function App() {
  return (
    <>
      <header className="uppercase text-white">
        <h1 className="heading | text-center py-8 text-4xl">
          Currency Converter.
        </h1>
      </header>
      <main>
        <Converter />
        <ExchangeRate />
        <ActionButtons />
      </main>
    </>
  )
}

export default App

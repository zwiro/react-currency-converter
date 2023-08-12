import ActionButtons from "./components/ActionButtons"
import Converter from "./components/Converter"
import ExchangeRate from "./components/ExchangeRate"

function App() {
  return (
    <>
      <header className="heading | uppercase text-white text-center pt-8">
        <h1>Currency Converter.</h1>
      </header>
      <main className="main">
        <Converter />
        <ExchangeRate />
        <ActionButtons />
      </main>
    </>
  )
}

export default App

import ActionButtons from "./components/ActionButtons"
import Converter from "./components/Converter"
import ExchangeRate from "./components/ExchangeRate"
import githubLogo from "./assets/github-mark-white.svg"

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
      <footer className="footer">
        <a
          href="https://github.com/zwiro"
          target="_blank"
          className="footer__link | text-white"
        >
          <img src={githubLogo} className="footer__logo" alt="" />
          zwiro
        </a>
      </footer>
    </>
  )
}

export default App

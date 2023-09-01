import { atom } from "jotai"

export const convertedFromCurrencyAtom = atom("USD")
export const convertedToCurrencyAtom = atom("EUR")
export const exchangeRateAtom = atom(0)
export const valueToCopyAtom = atom("")

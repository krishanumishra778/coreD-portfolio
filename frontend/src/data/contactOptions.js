import { countries } from "countries-list";
import { currencies } from "countries-list/currencies";

export const phoneCountries = Object.entries(countries)
  .flatMap(([code, country]) => country.phone.map((dial) => ({ id: code + "-" + dial, code, name: country.name, dial: String(dial) })))
  .sort((a, b) => a.name.localeCompare(b.name));

const countryCurrencyCodes = new Set(Object.values(countries).flatMap(({ currency }) => currency));
export const budgetCurrencies = Object.entries(currencies)
  .filter(([code]) => countryCurrencyCodes.has(code))
  .map(([code, currency]) => ({ code, name: currency.name }))
  .sort((a, b) => a.code.localeCompare(b.code));

export const generalEmail = "info@coredhristi.com";
export const supportEmail = "support@coredhristi.com";

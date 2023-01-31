import { CountryCode } from "~/data";

export const getFlagUrl = (code: CountryCode) =>
    `https://flagcdn.com/48x36/${code}.png`;
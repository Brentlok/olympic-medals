import { CountryData } from "~/data";

export const getTotalMedalsCount = (country: CountryData) =>
    country.medals.gold + country.medals.silver + country.medals.bronze;
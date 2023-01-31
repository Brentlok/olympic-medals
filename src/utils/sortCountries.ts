import { CountryData } from "~/data";
import { getTotalMedalsCount } from "./getTotalMedalsCount";

export type By = 'name' | 'gold' | 'silver' | 'bronze' | 'total';
export type Order = 'asc' | 'desc';

const extractValue = (data: CountryData, by: By) => {
    switch (by) {
        case "name":
            return data.name;
        case "gold":
            return data.medals.gold;
        case "silver":
            return data.medals.silver;
        case "bronze":
            return data.medals.bronze;
        case "total":
        default:
            return getTotalMedalsCount(data);
    }
}

const compare = (by: By, order: -1 | 1) => (a: CountryData, b: CountryData) => {
    const aValue = extractValue(a, by);
    const bValue = extractValue(b, by);

    if (aValue === bValue) {
        return 0;
    }

    const res = aValue > bValue ? 1 : -1;

    return res * order;
}

export const sortCountries = (data: CountryData[], by: By, ord: Order) => {
    const order = ord === 'asc' ? 1 : -1;

    const countries = Array.from(data).sort(compare(by, order));

    return countries;
}
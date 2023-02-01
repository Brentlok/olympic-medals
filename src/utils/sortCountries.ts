import { CountryData } from "~/data";
import { getTotalMedalsCount } from "./getTotalMedalsCount";

const sortBy = ['total', 'name', 'gold', 'silver', 'bronze'] as const;
export type By = typeof sortBy[number];
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

const compare = (by: By, order: -1 | 1, sortLeft: By[]) => (a: CountryData, b: CountryData): number => {
    const aValue = extractValue(a, by);
    const bValue = extractValue(b, by);

    if (aValue === bValue) {
        const nextBy = sortLeft.find(() => true);

        if (!nextBy) {
            return 0;
        }

        return compare(nextBy, order, sortLeft.filter(x => x !== nextBy))(a, b);
    }

    const res = aValue > bValue ? 1 : -1;
    return res * order;
}

export const sortCountries = (data: CountryData[], by: By, ord: Order) => {
    const order = ord === 'asc' ? 1 : -1;
    const sortLeft = sortBy.filter(x => x !== by);

    const countries = Array.from(data).sort(compare(by, order, sortLeft));

    return countries;
}
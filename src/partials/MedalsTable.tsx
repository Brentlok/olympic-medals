import { useEffect, useState } from "react";
import { Col, Table } from "~/bits";
import { CountryData } from "~/data";
import { By, Order, getFlagUrl, getTotalMedalsCount, printMedalCount, sortCountries } from "~/utils";

type Props = {
    data: CountryData[];
}

export const MedalsTable = (props: Props) => {
    const [sortDir, setSortDir] = useState<Order>('desc');
    const [sortBy, setSortBy] = useState<By>('total');
    const [countries, setCountries] = useState<CountryData[]>([]);

    useEffect(() => {
        setCountries(sortCountries(props.data, sortBy, sortDir));
    }, [sortBy, sortDir, props.data]);

    const changeSortBy = (by: By) => () => {
        if (by === sortBy) {
            setSortDir(dir => dir === 'asc' ? 'desc' : 'asc');
            return;
        }

        setSortBy(by);
        setSortDir('desc');
    }

    const cols: Col<By>[] = [
        {
            name: 'Team',
            width: 40,
            sortKey: 'name',
            onClick: changeSortBy('name'),
        },
        {
            name: 'Gold',
            width: 15,
            sortKey: 'gold',
            onClick: changeSortBy('gold'),
        },
        {
            name: 'Silver',
            width: 15,
            sortKey: 'silver',
            onClick: changeSortBy('silver'),
        },
        {
            name: 'Bronze',
            width: 15,
            sortKey: 'bronze',
            onClick: changeSortBy('bronze'),
        },
        {
            name: 'Total',
            width: 15,
            sortKey: 'total',
            onClick: changeSortBy('total'),
        },
    ];

    const rows = countries.map(country => [
        (
            <div className="flex items-center gap-2">
                <img src={getFlagUrl(country.code)} alt={country.name} />
                <span>
                    {country.name}
                </span>
            </div>
        ),
        (
            <div className="bg-yellow-400 p-3 rounded-full w-10 h-10 md:w-14 md:h-14 flex justify-center items-center">
                {printMedalCount(country.medals.gold)}
            </div>
        ),
        (
            <div className="bg-gray-400 p-3 rounded-full w-10 h-10 md:w-14 md:h-14 flex justify-center items-center">
                {printMedalCount(country.medals.silver)}
            </div>
        ),
        (
            <div className="bg-amber-700 p-3 rounded-full w-10 h-10 md:w-14 md:h-14 flex justify-center items-center">
                {printMedalCount(country.medals.bronze)}
            </div>
        ),
        (
            <div className="bg-slate-500 p-3 rounded-full w-10 h-10 md:w-14 md:h-14 flex justify-center items-center">
                {getTotalMedalsCount(country)}
            </div>
        ),
    ]);

    return (
        <Table
            rows={rows}
            cols={cols}
            sortDir={sortDir}
            sortKey={sortBy}
        />
    );
}
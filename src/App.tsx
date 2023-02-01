import { useState } from "react";
import { CountryData } from "~/data";
import { MedalInput, MedalsTable } from "~/partials";

const App = () => {
    const [countries, setCountries] = useState<CountryData[]>([]);

    const addCountry = (country: CountryData) => {
        setCountries(state => [...state, country]);
    }

    const addedCodes = countries.map(country => country.code);

    return (
        <main className="px-4 py-16 flex flex-col items-center gap-10">
            <h1 className="text-4xl">Olympic Medals</h1>
            <MedalsTable data={countries} />
            <MedalInput alreadyAdded={addedCodes} submit={addCountry} />
        </main>
    );
};

export default App;

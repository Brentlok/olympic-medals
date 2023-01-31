import { useState } from "react";
import { CountryData } from "~/data";
import { MedalsTable } from "~/partials";

const mock: CountryData[] = [
    { medals: { bronze: 1, gold: 2, silver: 1 }, name: 'Germany', code: 'de' },
    { medals: { bronze: 1, gold: 0, silver: 3 }, name: 'Poland', code: 'pl' },
];

const App = () => {
    const [countries, setCountries] = useState<CountryData[]>(mock);

    return (
        <main className="px-4 py-16 flex flex-col items-center gap-10">
            <h1 className="text-4xl">Olympic Medals</h1>
            <MedalsTable data={countries} />
            <div>
                form
            </div>
        </main>
    );
};

export default App;

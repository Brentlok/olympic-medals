import { Key, useState } from "react";
import { CountryData } from "~/data";
import { MedalInput, MedalsTable } from "~/partials";

const App = () => {
    const [countries, setCountries] = useState<CountryData[]>([]);
    const [edited, setEdited] = useState<CountryData>();

    const addCountry = (country: CountryData) => {
        setCountries(state => [...state, country]);
    }

    const removeCountry = (name: Key) => {
        setCountries(state => state.filter(country => country.name !== name));
    }

    const editCountry = (name: Key) => {
        setEdited(countries.find(x => x.name === name));
    }

    const submitCountryEdit = (country: CountryData) => {
        setEdited(undefined);
        setCountries(state => state.map(x => x.name !== country.name ? x : country));
    }

    const cancelEdit = () => {
        setEdited(undefined);
    }

    const addedCodes = countries.map(country => country.code);
    const submit = edited ? submitCountryEdit : addCountry;

    return (
        <main className="px-4 py-16 flex flex-col items-center gap-10">
            <h1 className="text-4xl">Olympic Medals</h1>
            <MedalsTable
                data={countries}
                editCountry={editCountry}
                removeCountry={removeCountry}
            />
            <MedalInput
                cancelEdit={cancelEdit}
                data={edited}
                alreadyAdded={addedCodes}
                submit={submit}
            />
        </main>
    );
};

export default App;

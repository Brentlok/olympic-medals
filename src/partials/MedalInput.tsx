import { useEffect, useState } from "react";
import { Button, Input } from "~/bits";
import { Value } from "~/bits/Input";
import { Country, CountryCode, CountryData, countries as countriesData } from "~/data";
import { getFlagUrl } from "~/utils";

type Props = {
    alreadyAdded: CountryCode[];
    data?: CountryData;
    submit: (country: CountryData) => void;
}

const codes = Object.keys(countriesData) as CountryCode[];

export const MedalInput = (props: Props) => {
    const [name, setName] = useState<Country | undefined>();
    const [code, setCode] = useState<CountryCode | undefined>();
    const [gold, setGold] = useState(0);
    const [silver, setSilver] = useState(0);
    const [bronze, setBronze] = useState(0);

    useEffect(() => {
        if (!props.data) {
            return;
        }

        setName(props.data.name);
        setCode(props.data.code);
        setGold(props.data.medals.gold);
        setSilver(props.data.medals.silver);
        setBronze(props.data.medals.bronze);
    }, [props.data]);

    const countries: Value<Country, CountryCode>[] = codes
        .filter(code => !props.alreadyAdded.includes(code))
        .map(code => ({
            label: countriesData[code],
            value: code,
        }));

    const handleAddCountry = (value: Value<Country, CountryCode>) => {
        setName(value.label);
        setCode(value.value);
    }

    const clear = () => {
        setName(undefined);
        setCode(undefined);
        setGold(0);
        setSilver(0);
        setBronze(0);
    }

    const submit = () => {
        if (!name || !code) {
            return;
        }

        props.submit({
            name,
            code,
            medals: {
                gold,
                silver,
                bronze,
            }
        });
        clear();
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="flex gap-2">
                <div>
                    <p className="text-center mb-2">Team</p>
                    <div className="flex gap-2 relative">
                        {code && <img className="absolute -left-14 top-1/2 -translate-y-1/2" src={getFlagUrl(code)} alt={name} />}
                        <Input.Select
                            value={name}
                            values={countries}
                            onSelect={handleAddCountry}
                            onChange={clear}
                            className="w-48 text-xs py-3 md:py-2 md:w-72 md:text-base"
                        />
                    </div>
                </div>
                <div>
                    <p className="text-center mb-2 text-yellow-400">Gold</p>
                    <Input.Number
                        className="w-12 text-center"
                        value={gold}
                        onChange={val => setGold(val)}
                    />
                </div>
                <div>
                    <p className="text-center mb-2 text-gray-400">Silver</p>
                    <Input.Number
                        className="w-12 text-center"
                        value={silver}
                        onChange={val => setSilver(val)}
                    />
                </div>
                <div>
                    <p className="text-center mb-2 text-amber-700">Bronze</p>
                    <Input.Number
                        className="w-12 text-center"
                        value={bronze}
                        onChange={val => setBronze(val)}
                    />
                </div>
            </div>
            <Button
                disabled={!name || !code}
                name={props.data ? 'Edit' : 'Add'}
                onClick={submit}
            />
        </div>
    )
}
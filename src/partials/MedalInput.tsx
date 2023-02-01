import { useState } from "react";
import { Input } from "~/bits";
import { Value } from "~/bits/Input";
import { Country, CountryCode, CountryData, countries as countriesData } from "~/data";
import { getFlagUrl } from "~/utils";

type Props = {
    data?: CountryData;
}

const codes = Object.keys(countriesData) as CountryCode[];

export const MedalInput = (props: Props) => {
    const [name, setName] = useState<Country | undefined>(props.data?.name);
    const [code, setCode] = useState<CountryCode | undefined>(props.data?.code);
    const [gold, setGold] = useState(props.data?.medals.gold ?? 0);
    const [silver, setSilver] = useState(props.data?.medals.silver ?? 0);
    const [bronze, setBronze] = useState(props.data?.medals.bronze ?? 0);

    const countries: Value<Country, CountryCode>[] = codes.map(code => ({
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
    }

    return (
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
    )
}
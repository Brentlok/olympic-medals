import { useEffect, useState } from "react";

export type Value<L extends string, V extends string> = { label: L; value: V };

type Props<L extends string, V extends string> = {
    value?: string;
    values: Value<L, V>[];
    onSelect: (value: Value<L, V>) => void;
    onChange?: (value: string) => void;
    className?: string;
}

const getValues = <L extends string, V extends string>(search: string, data: Value<L, V>[]) => {
    const values: Value<L, V>[] = [];

    if (search.replaceAll(/\s+/g, '') === '') {
        return values;
    }

    for (const val of data) {
        const lowerLabel = val.label.toLowerCase();
        const lowerSearch = search.toLowerCase();

        if (values.length === 5) {
            break;
        }

        if (lowerLabel.startsWith(lowerSearch)) {
            values.push(val);
        }
    }

    return values;
}

export const Select = <L extends string, V extends string>(props: Props<L, V>) => {
    const [value, setValue] = useState(props.value ?? '');

    const handleClick = (value: Value<L, V>) => {
        setValue(value.label);
        props.onSelect(value);
    }

    const handleChange = (value: string) => {
        setValue(value);
        props.onChange?.(value);
    }

    const values = getValues(value, props.values).map(x => (
        <div
            key={x.label}
            onClick={() => handleClick(x)}
            className="text-black p-2 w-full cursor-pointer rounded-xl hover:bg-slate-500 hover:text-white transition-colors"
        >
            {x.label}
        </div>
    ));

    return (
        <div className="relative">
            <input
                className={`text-black border-2 border-slate-500 p-2 rounded-xl ${props.className}`}
                type='text'
                value={value}
                onChange={e => handleChange(e.target.value)}
            />
            {values.length > 0 && value !== props.value && (
                <div className="absolute flex flex-col bg-white w-full p-2 top-12 border-2 border-slate-500 rounded-xl">
                    {values}
                </div>
            )}
        </div>
    );
}
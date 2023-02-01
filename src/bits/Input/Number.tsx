type Props = {
    value: number;
    onChange?: (val: number) => void;
    min?: number;
    max?: number;
    className?: string;
}

export const Number = (props: Props) => {
    const handleChange = (val: string) => {
        if (val === '') {
            props.onChange?.(props.min ?? 0);
            return;
        }

        if (!/[0-9]/g.test(val)) {
            return;
        }

        const num = parseInt(val);

        if (isNaN(num)) {
            return;
        }

        if (num > (props.max ?? 99)) {
            props.onChange?.(props.max ?? 99);
            return;
        }

        if (num < (props.min ?? 0)) {
            props.onChange?.(props.min ?? 0);
            return;
        }

        props.onChange?.(num);
    }

    return (
        <input
            className={`text-black border-2 border-slate-500 p-2 rounded-xl ${props.className ?? ''}`}
            type='text'
            value={props.value}
            onChange={e => handleChange(e.target.value)}
        />
    )
}
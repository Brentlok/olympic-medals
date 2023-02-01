type Props = {
    name: string;
    onClick: () => void;
    disabled?: boolean;
}

export const Button = (props: Props) => (
    <button
        disabled={props.disabled}
        onClick={props.onClick}
        data-is-disabled={props.disabled}
        className="bg-slate-500 py-3 px-5 rounded-xl hover:bg-slate-400 transition-colors"
    >
        {props.name}
    </button>
)
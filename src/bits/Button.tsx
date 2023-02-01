type Props = {
    name: string;
    onClick: () => void;
}

export const Button = (props: Props) => (
    <button onClick={props.onClick} className="bg-slate-500 py-3 px-5 rounded-xl hover:bg-slate-400 transition-colors">
        {props.name}
    </button>
)
import { Key } from "react";
import { Order } from "~/utils";

export type Col<SortKey extends string> = {
    name: string;
    width: number;
    sortKey: SortKey;
    onClick?: () => void;
}

export type Row = {
    key: Key;
    items: JSX.Element[];
}

type Props<SortKey extends string> = {
    cols: Col<SortKey>[];
    rows: Row[];
    sortDir: Order;
    sortKey: SortKey;
}

export const Table = <SortKey extends string>(props: Props<SortKey>) => {
    const header = props.cols.map((row, i) => {
        const isSortedBy = row.sortKey === props.sortKey;

        return (
            <div
                key={row.name}
                style={{ width: `${row.width}%` }}
                className={`py-4 ${i > 0 ? 'flex justify-center' : ''}`}
            >
                <span
                    data-is-sort={isSortedBy ? true : undefined}
                    data-sort-dir={isSortedBy ? props.sortDir : undefined}
                    className={row.onClick ? 'cursor-pointer sorter' : undefined}
                    onClick={row.onClick}
                >
                    {row.name}
                </span>
            </div>
        )
    });

    const rows = props.rows.map(row => {
        const items = row.items.map((item, j) => (
            <div
                key={`item-${j}`}
                style={{ width: `${props.cols[j].width}%` }}
                className={j > 0 ? "flex justify-center" : undefined}
            >
                {item}
            </div>
        ));

        return (
            <div key={row.key} className="flex py-4 border-b-2 border-slate-500">
                {items}
            </div>
        );
    });

    return (
        <div className='grid w-full'>
            <div className="flex">
                {header}
            </div>
            {rows}
        </div>
    );
}
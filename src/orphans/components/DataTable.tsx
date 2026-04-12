import { cn } from "@/lib/utils";
import React from "react";

/**
 * DataTable Component
 * 
 * @template T - The type of the data
 * @param {Column<T>[]} columns - The columns to display
 * @param {T[]} data - The data to display
 * @param {string} className - The class name to apply to the component 
 */
interface Column<T> {
    header: string;
    accessor: keyof T | ((item: T) => React.ReactNode);
    width?: string;
    align?: "left" | "center" | "right";
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    className?: string;
}

export function DataTable<T extends Record<string, any>>({
    columns,
    data,
    className,
}: DataTableProps<T>) {
    return (
        <div className={cn("glass-panel rounded-lg overflow-hidden", className)}>
            <table className="w-full">
                <thead>
                    <tr className="border-b border-border/40">
                        {columns.map((column, idx) => (
                            <th
                                key={idx}
                                className={cn(
                                    "px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider",
                                    column.align === "center" && "text-center",
                                    column.align === "right" && "text-right"
                                )}
                                style={{ width: column.width }}
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, rowIdx) => (
                        <tr
                            key={rowIdx}
                            className="border-b border-border/20 hover:bg-muted/30 transition-colors"
                        >
                            {columns.map((column, colIdx) => {
                                const value =
                                    typeof column.accessor === "function"
                                        ? column.accessor(item)
                                        : item[column.accessor];

                                return (
                                    <td
                                        key={colIdx}
                                        className={cn(
                                            "px-6 py-4 text-sm text-foreground",
                                            column.align === "center" && "text-center",
                                            column.align === "right" && "text-right"
                                        )}
                                        style={{ width: column.width }}
                                    >
                                        {value}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
            {data.length === 0 && (
                <div className="px-6 py-12 text-center text-muted-foreground">
                    No data available
                </div>
            )}
        </div>
    );
}

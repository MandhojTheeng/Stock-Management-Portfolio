import { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper
} from '@tanstack/react-table';
import type { PortfolioStock } from '../types';

type Props = {
  data: PortfolioStock[];
  onEdit?: (stock: PortfolioStock) => void;
  onDelete?: (id: string) => void;
};

export default function PortfolioTable({ data, onEdit, onDelete }: Props) {
  const columnHelper = createColumnHelper<PortfolioStock>();

  const columns = useMemo(() => [
    columnHelper.accessor('ticker', { header: 'Ticker' }),
    columnHelper.accessor('company', { header: 'Company' }),
    columnHelper.accessor('quantity', { header: 'Quantity' }),
    columnHelper.accessor('purchasePrice', { header: 'Purchase Price' }),
    columnHelper.accessor('currentPrice', { header: 'Current Price' }),
    columnHelper.accessor('purchaseDate', { header: 'Purchase Date' }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: info => (
        <div className="flex gap-2">
          {onEdit && (
            <button
              onClick={() => onEdit(info.row.original)}
              className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(info.row.original.id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          )}
        </div>
      ),
    })
  ], [columnHelper, onEdit, onDelete]);

  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="text-left px-4 py-2 font-medium text-gray-700"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="border-b last:border-b-0">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-4 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

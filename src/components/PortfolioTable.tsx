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
  onSelect?: (ticker: string) => void; 
};

export default function PortfolioTable({ data, onEdit, onDelete, onSelect }: Props) {
  const columnHelper = createColumnHelper<PortfolioStock>();

  // Remove duplicates based on ID
  const uniqueData = useMemo(() => {
    const map = new Map<string, PortfolioStock>();
    data.forEach(stock => map.set(stock.id, stock));
    return Array.from(map.values());
  }, [data]);

  const columns = useMemo(() => [
    columnHelper.accessor('ticker', {
      header: 'Ticker',
      cell: info => (
        <span
          className="font-bold text-black cursor-pointer"
          onClick={() => onSelect?.(info.getValue())} 
        >
          {info.getValue()}
        </span>
      )
    }),
    columnHelper.accessor('company', { 
      header: 'Company',
      cell: info => <span className="text-gray-800">{info.getValue()}</span>
    }),
    columnHelper.accessor('quantity', { 
      header: 'Quantity',
      cell: info => <span className="text-gray-700">{info.getValue()}</span>
    }),
    columnHelper.accessor('purchasePrice', { 
      header: 'Purchase Price',
      cell: info => <span className="text-gray-700">${info.getValue()}</span>
    }),
    columnHelper.accessor('currentPrice', { 
      header: 'Current Price',
      cell: info => <span className="text-gray-700">${info.getValue()}</span>
    }),
    columnHelper.accessor('purchaseDate', { 
      header: 'Purchase Date',
      cell: info => <span className="text-gray-600">{info.getValue()}</span>
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: info => (
        <div className="flex gap-2 justify-start items-center h-full">
          {onEdit && (
            <button
              onClick={() => onEdit(info.row.original)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(info.row.original.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
            >
              Delete
            </button>
          )}
        </div>
      ),
    })
  ], [columnHelper, onEdit, onDelete, onSelect]);

  const table = useReactTable({ data: uniqueData, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-md">
      <table className="min-w-full bg-white rounded-lg">
        <thead className="bg-gray-50 border-b border-gray-200">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="text-left px-6 py-3 font-semibold text-gray-700 tracking-wide"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr
              key={row.id}
              className="border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
              onClick={() => onSelect?.(row.original.ticker)} 
            >
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-6 py-3 align-middle whitespace-nowrap">
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

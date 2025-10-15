import { useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper
} from '@tanstack/react-table'
import type { PortfolioStock } from '../types'

type Props = {
  data: PortfolioStock[]
  onEdit?: (stock: PortfolioStock) => void
  onDelete?: (id: string) => void
}

export default function PortfolioTable({ data, onEdit, onDelete }: Props) {
  const columnHelper = createColumnHelper<PortfolioStock>()

  const columns = useMemo(() => [
    columnHelper.accessor('ticker', { header: 'Ticker' }),
    columnHelper.accessor('company', { header: 'Company' }),
    columnHelper.accessor('quantity', { header: 'Quantity' }),
    columnHelper.accessor('purchasePrice', { header: 'Purchase Price' }),
    columnHelper.accessor('currentPrice', { header: 'Current Price' }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: info => (
        <>
          {onEdit && <button onClick={() => onEdit(info.row.original)}>Edit</button>}
          {onDelete && <button onClick={() => onDelete(info.row.original.id)} className="danger">Delete</button>}
        </>
      )
    })
  ], [columnHelper, onEdit, onDelete])

  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() })

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import { ChevronUp } from "lucide-react"


import { Button } from "@/components/ui/button"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { type TableIntegrationsProps } from "./TableIntegrations.types"
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Progress } from "@/components/ui/progress"
import { formatPrice } from "@/lib/formatPrice"


const data: TableIntegrationsProps[] = [
  {
    app: "Stripe",
    icon: "/images/logoipsum-383.svg",
    type: "Finance",
    rate: 60,
    profit: 420,
  },
  {
    app: "Zapier",
    icon: "/images/logoipsum-383.svg",
    type: "CRM",
    rate: 20,
    profit: 123.5,
  },
  {
    app: "Shopify",
    icon: "/images/logoipsum-383.svg",
    type: "Marketplace",
    rate: 80,
    profit: 829.69,
  },
]

export const columns: ColumnDef<TableIntegrationsProps>[] = [
  {
    accessorKey: "icon",
    header: "LOGO",
    cell: ({ row }) => (
      <div className="capitalize">
        <LazyLoadImage src={row.getValue('icon')} alt="Logo" width={20} height={20} />
      </div>
    ),
  },
  {
    accessorKey: "app",
    header: "APPLICATION",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("app")}</div>
    ),
  },
  {
    accessorKey: "type",
    header: () => <div>TYPE</div>,
    cell: ({ row }) => <div className="capitalize">{row.getValue("type")}</div>,
  },
  {
    accessorKey: "rate",
    header: () => <div className="text-right">RATE</div>,
    cell: ({ row }) => (
      <div className="font-medium text-right flex gap-1 items-center">
        <Progress value={row.getValue("rate")} className="h-2" />
      </div>
    )
  },
  {
    accessorKey: "profit",
    header: ({ column }) => {
      return (
        <Button 
          variant="ghost" 
          className="float-end px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          PROFIT
          <ChevronUp className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("profit"))
      return (
        <div className="text-right font-medium">{formatPrice(amount)}</div>
      )
    },
  },
]

export function TableIntegrations() {
  const [sorting, setSorting] = React.useState < SortingState > ([])
  const [columnFilters, setColumnFilters] = React.useState < ColumnFiltersState > ([])
  const [columnVisibility, setColumnVisibility] =
    React.useState < VisibilityState > ({})
  const [rowSelection, setRowSelection] = React.useState({})
	
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full mt-5 rounded-lg" >
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
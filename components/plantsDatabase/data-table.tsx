"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "../ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { plants } from "../plantsDatabase/plants";

import { Fragment, useState } from "react"
import { cn } from "@/lib/utils"
import { CropTooltip } from "./CropTooltip"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [expandedRowIds, setExpandedRowIds] = useState<Set<string>>(new Set());
    const expandedRowDescription = (rowId: string) => {
      const plant = plants.find((plant) => (plant.id-1).toString() === rowId);
      return plant ? `Détails supplémentaires pour ${plant.name}.` : '';
    }

    const table = useReactTable({
      data,
      columns,
      getPaginationRowModel: getPaginationRowModel(),
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      onColumnFiltersChange: setColumnFilters,
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      state: {
        sorting,
        columnFilters,
        columnVisibility,
      },
      getCoreRowModel: getCoreRowModel(),
    })

    const toggleRowExpansion = (rowId: string) => {
      setExpandedRowIds((prev) => {
        const newExpanded = new Set<string>();
        // Vérifier si la ligne est déjà ouverte
        if (prev.has(rowId)) {
          // Si oui, ne rien ajouter (fermer la ligne)
        } else {
          // Sinon, ouvrir uniquement la ligne sélectionnée
          newExpanded.add(rowId);
        }
        return newExpanded;
      });
    };

    const cropPeriod = (rowId: string) => {
      const plant = plants.find((plant) => (plant.id-1).toString() === rowId);
      return plant ? plant.cropPeriod : null;
    }

    return (
      <>
        <div className="flex items-center py-4">
          <Input
            placeholder="Rechercher une plante..."
            value={(table.getColumn("Plante")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("Plante")?.setFilterValue(event.target.value)
            }
            className="max-w-sm bg-slate-50 rounded-lg"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Informations
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-lg border bg-slate-50 max-h-[500px] w-full overflow-y-auto">
          <Table className="rounded-lg relative">
            <TableHeader className="sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="bg-indigo-100">
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
            <TableBody className="h-fit">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <Fragment key={row.id}>
                    <TableRow
                      data-state={row.getIsSelected() && "selected"}
                      onClick={() => toggleRowExpansion(row.id)}
                      className={cn("cursor-pointer transition-all duration-300 ease-in-out hover:shadow-sm",
                        expandedRowIds.has(row.id) && "bg-green-500/20 hover:bg-green-500/40"
                )}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                    {expandedRowIds.has(row.id) && (
                      /* Add a smooth transition effect when expanding the row */
                      <TableRow className="transition-all duration-300 ease-in-out">
                        <TableCell colSpan={columns.length}>
                          {/* Contenu supplémentaire à afficher lors de l'expansion */}
                          <div className="p-4 bg-slate-100 rounded-lg shadow-sm h-[300px]">
                            {/* Remplacez ceci par le contenu que vous souhaitez afficher */}
                            <p>Détails supplémentaires pour {row.getValue('Plante')}</p>
                            <p>{expandedRowDescription(row.id)}</p>
                            <CropTooltip plantName={plants.find((plant) => (plant.id-1).toString() === row.id)?.name ?? ""} cropPeriod={cropPeriod(row.id)} />
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Précédent
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Suivant
          </Button>
        </div>
      
      </>
    )
}
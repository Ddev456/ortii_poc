"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Plant } from "./plants"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import { ArrowUpDown, Carrot, Crop, Eye, MoreHorizontal, Sheet, Star } from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import Image from "next/image"
import { CropTooltip } from "./CropTooltip"

export const columns: ColumnDef<Plant>[] = [
  {
    id: "Plante",
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Plante
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({row}) => {
        return (
            <div className="flex flex-col items-center gap-2 ml-4">
              <Image src={row.original.image} alt="plant" className="w-20 h-16 rounded-[.6rem] relative" width={80} height={80} />
              <span className="w-20 text-sm font-semibold text-white bg-indigo-300/65 rounded-lg px-2 py-1 absolute">{row.original.name}</span>
            </div>
        )
    }
  },
  {
    id: "Catégorie",
    accessorKey: "category",
    header: "Catégorie",
  },
  {
    id: "Sous-type",
    accessorKey: "subType",
    header: "Sous-type",
  },
  {
    id: "Indice de rentabilité",
    accessorKey: "EfficiencyIndex",
    header: "Indice de rentabilité",
    cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            {row.original.efficiency && row.original.timeToHarvest ? (
              Math.round(row.original.efficiency / row.original.timeToHarvest) + "%"
            ) : (
              "Données non connues"
            )}
          </div>
        )
      }
  },
  {
    id: "Difficulté",
    accessorKey: "level",
    header: "Difficulté",
    cell: ({ row }) => {
        return (
            <div className="flex items-center gap-2">
                { row.original.level === 1 && (
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 stroke-green-500" />
                    </div>
                )}
                { row.original.level === 2 && (
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 stroke-orange-500" />
                      <Star className="h-4 w-4 stroke-orange-500" />
                    </div>
                )}
                { row.original.level === 3 && (
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 stroke-red-500" />
                      <Star className="h-4 w-4 stroke-red-500" />
                      <Star className="h-4 w-4 stroke-red-500" />
                    </div>
                )}
            </div>
        )
    }
  },
  {
    id: "Actions",
    header: "Actions",
    cell: ({ row }) => {
      const plant = row.original
 
      return (
        <div className="flex gap-2 items-center">
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild><Button variant="outline" className="flex items-center gap-2 bg-slate-50 hover:bg-slate-200"><Carrot className="h-4 w-4" /></Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Ajouter au potager</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild><Button variant="outline" className="flex items-center gap-2 bg-slate-50 hover:bg-slate-200"><Star className="h-4 w-4" /></Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Ajouter aux favoris</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
        </div>
      )
    },
  },
]

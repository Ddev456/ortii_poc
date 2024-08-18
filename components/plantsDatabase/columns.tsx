"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Plant } from "./plants"

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
            <div className="flex items-center gap-2">
                <Image src={row.original.image} alt="plant" className="w-8 h-8 rounded-[.6rem]" width={80} height={80} />
                <span>{row.original.name}</span>
            </div>
        )
    }
  },
  {
    id: "Période de Culture",
    accessorKey: "period",
    header: "Période de Culture",
    cell: ({ row }) => {
        return (
            <CropTooltip cropPeriod={row.original.cropPeriod} plantName={row.original.name} />
        )
    }
  },
  {
    id: "Catégorie",
    accessorKey: "category",
    header: "Catégorie",
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
                <TooltipTrigger asChild><Button variant="outline" className="flex items-center gap-2 bg-slate-50 hover:bg-slate-200"><Eye className="h-4 w-4" /></Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Voir la fiche infos</p>
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

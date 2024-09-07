import Image from "next/image"
import { Badge } from "./ui/badge"
import { cn } from "@/lib/utils"
import { Note } from "./NotesDiary"

export const NoteList = ({ notes }: { notes: Note[] }) => {
    
    return (
            <div className="flex-1">
                {notes.map((note, index) => (
                    <NoteItem key={index} note={note} />
                ))}
            </div>
    )
}

export const NoteItem = ({ note }: { note: Note }) => {
  return (
    <div className="">
      { note.plants && note.plants.length > 0 ? (
        <>
          <div className="relative flex">
            {note.plants.map((plant: string, index: number) => (
              <Image 
                key={plant}
                src={`/${plant.toLowerCase()}.jpg`}
                alt={plant}
                width={50} 
                height={25} 
                className={cn(
                  "rounded-lg w-18 h-10 border-green-600 border-2",
                  index > 0 ? "ml-[-1.5rem]" : "",
                  index === 1 ? "z-10" : "",
                )}
              />
            ))}
          </div>
          <Badge className={cn("bg-green-600 absolute top-[-0.5rem] right-[-0.5rem] rounded-full")}>
            {note.plants.length}
          </Badge>
          <div className="flex flex-col items-start">
            <span className="font-bold">{note.content}</span>
            <span className="text-sm font-normal">{note.tags.join(', ')}</span>
            <span className="text-xs text-gray-500">{note.date.toLocaleDateString('fr-FR')}</span>
          </div>
        </>
      ) : (
        <span>Aucune plante à afficher</span>
      )}
    </div>
  )
}
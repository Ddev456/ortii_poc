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
  console.log("Contenu de note.plants:", note); // Log pour débogage

  return (
    <div className="">
      { note.plants && note.plants.length > 0 ? ( // Vérification de la longueur
        <>
          {note.plants.map((plant: string) => (
            <Image 
              key={plant}
              src={`/${plant.toLowerCase()}.jpg`}
              alt={plant}
              width={120} 
              height={80} 
              className={cn(
                "rounded-lg",
                "opacity-50"
              )} 
            />
          ))}
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
        <span>Aucune plante à afficher</span> // Message de débogage
      )}
    </div>
  )
}
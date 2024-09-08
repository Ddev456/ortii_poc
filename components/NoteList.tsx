import Image from "next/image"
import { Badge } from "./ui/badge"
import { cn } from "@/lib/utils"
import { Note } from "./NotesDiary"
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { SearchBar } from "./SearchBar";
import { NotesSearchBar } from "./NotesSearchBar";
import { useState } from "react";

const getWeekPeriod = (date: Date) => {
  const startOfWeek = new Date(date);
  const endOfWeek = new Date(date);
  
  // Ajuster pour obtenir le début de la semaine (lundi)
  startOfWeek.setDate(date.getDate() - date.getDay() + 1); // 1 pour lundi
  endOfWeek.setDate(startOfWeek.getDate() + 6); // 6 jours plus tard

  return {
      start: startOfWeek.toLocaleDateString('fr-FR'),
      end: endOfWeek.toLocaleDateString('fr-FR'),
  };
};

export const NoteList = ({ notes }: { notes: Note[] }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNotes = notes.filter(note => 
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="flex-1 flex flex-col gap-2">
        <NotesSearchBar notes={notes} setSearchTerm={setSearchTerm} />
        {filteredNotes.length > 0 && (
            <h3>Notes du {getWeekPeriod(filteredNotes[0].date).start} au {getWeekPeriod(filteredNotes[0].date).end}</h3>
        )}
        <div className="flex flex-col gap-4">
            {filteredNotes.map((note, index) => (
                <NoteItem key={index} note={note} />
            ))}
        </div>
        <Badge className={cn("bg-green-600 absolute top-[-0.5rem] right-[-0.5rem] rounded-full")}>
            {filteredNotes.length}
        </Badge>
    </div>
);
}

export const NoteItem = ({ note }: { note: Note }) => {
  return (
    <>
      { note.plants && note.plants.length > 0 ? (
        <div className="flex items-center justify-between gap-2">
          <div className="relative flex gap-1">
            {note.plants.slice(0, 1).map((plant: string, index: number) => (
              <Badge className="bg-slate-600">{plant}</Badge>
            ))}
            {note.plants.length > 1 && (
                <Badge className={cn("bg-slate-600 rounded-full")}>
                  +{note.plants.length-1}
                </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 flex-1">
            <span className="font-medium text-xs flex-grow">{note.content}</span>
          </div>
          <div className="flex items-start gap-2">
              { note.tags.slice(0, 2).map((tag: string, index: number) => (
              <Badge key={index} className={`text-black bg-${['green-300', 'indigo-300', 'orange-300', 'slate-300', 'blue-300'][index % 5]}
              hover:bg-${['green-300', 'indigo-300', 'orange-300', 'slate-300', 'blue-300'][index % 5]}`}>  
              {tag}
              </Badge>
              ))}
              {note.tags.length > 2 && (
                <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger>
                <Badge className={cn("bg-slate-600 rounded-full")}>
                  +{note.tags.length-2}
                </Badge>
                </TooltipTrigger>
                  <TooltipContent>
                    <div className="flex flex-col">
                    {note.tags.slice(2).map((tag: string, index: number) => (
                      <Badge key={index} className={`text-black bg-${['green-300', 'indigo-300', 'orange-300', 'slate-300', 'blue-300'][index % 5]}
                      hover:bg-${['green-300', 'indigo-300', 'orange-300', 'slate-300', 'blue-300'][index % 5]}`}>
                      {tag}
                      </Badge>
                    ))}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              )}

            <span className="text-xs text-gray-500">{note.date.toLocaleDateString('fr-FR')}</span>
          </div>
        </div>
      ) : (
        <span>Aucune plante à afficher</span>
      )}
    </>
  )
}
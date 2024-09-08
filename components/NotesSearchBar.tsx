import { Search, X } from "lucide-react";
import { useState } from "react";
import { type Note } from "./NotesDiary";

export const NotesSearchBar = ({ notes, setSearchTerm }: { notes: Note[], setSearchTerm: (term: string) => void }) => {
    const [inputValue, setInputValue] = useState("");

    const handleSearch = (value: string) => {
        setInputValue(value);
        setSearchTerm(value); // Met à jour le terme de recherche dans le composant parent
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="relative w-72 flex items-center gap-4">
                <input 
                    type="text" 
                    className="w-full rounded-lg border border-border p-2 pl-10 pr-10 text-md" 
                    placeholder="Rechercher une note" 
                    value={inputValue} 
                    onChange={(e) => handleSearch(e.target.value)} 
                />
                <span className="absolute left-3 top-3">
                    <Search className="size-4 text-muted-foreground" />
                </span>
                <button 
                    className="absolute right-3 top-3.5" 
                    onClick={() => handleSearch("")}
                >
                    <X className="size-4 text-muted-foreground" />
                </button>
            </div>
        </div>
    );
}
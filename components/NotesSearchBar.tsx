import { Search, X } from "lucide-react";
import { useState } from "react";
import type { Note } from "./NotesDiary";
import { Input } from "./ui/input";

export const NotesSearchBar = ({
	notes,
	setSearchTerm,
}: { notes: Note[]; setSearchTerm: (term: string) => void }) => {
	const [inputValue, setInputValue] = useState("");

	const handleSearch = (value: string) => {
		setInputValue(value);
		setSearchTerm(value); // Met à jour le terme de recherche dans le composant parent
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="relative flex-1 md:grow-0 w-64 md:w-96 lg:w-[400px]">
				<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
				<Input
					type="search"
					placeholder="Rechercher une note"
					className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
					value={inputValue || ""}
					onChange={(e) => handleSearch(e.target.value.trim())}
				/>
			</div>
		</div>
	);
};

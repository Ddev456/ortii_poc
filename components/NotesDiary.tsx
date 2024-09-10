"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { PenLine } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { NoteList } from "./NoteList";
import { NotesForm } from "@/app/carnet/notes/NotesForm";

export interface Note {
	content: string;
	plants: string[];
	tags: string[];
	date: Date;
}

export function NotesDiary() {
	const [notes, setNotes] = useState<Note[]>([]);
	const { toast } = useToast();

	return (
		<main className="flex gap-2 md:p-4">
			<div
				className="relative hidden flex-col items-start gap-8 md:flex"
				x-chunk="dashboard-03-chunk-0"
			>
				<NotesForm notes={notes} setNotes={setNotes} />
			</div>

			<div className="w-full relative flex h-full min-h-[80vh] md:min-h-[70vh] md:mt-4 flex-col rounded-xl bg-muted/50 p-4">
				<Badge variant="outline" className="absolute right-3 top-3">
					Journal
				</Badge>
				<div className="flex-1">
					<Drawer>
						<DrawerTrigger asChild className="md:hidden flex mb-2">
							<Button variant="default" className="flex gap-1 items-center">
								<PenLine className="size-4" />
								<span className="text-white text-xs text-muted-foreground">
									Ajouter une note
								</span>
							</Button>
						</DrawerTrigger>
						<DrawerContent>
							<DrawerHeader>
								<DrawerTitle>Ajouter une note</DrawerTitle>
								<DrawerDescription>
									Remplissez les détails de votre note.
								</DrawerDescription>
							</DrawerHeader>

							<NotesForm notes={notes} setNotes={setNotes} />
						</DrawerContent>
					</Drawer>
					<NoteList notes={notes} />
				</div>
			</div>
		</main>
	);
}

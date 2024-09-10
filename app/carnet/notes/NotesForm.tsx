import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { MultiSelect } from "@/components/ui/multi-select";
import { plants } from "@/app/wiki/plants";
import { DatePicker } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";
import { SquarePlus } from "lucide-react";

export interface Note {
	content: string;
	plants: string[];
	tags: string[];
	date: Date;
}

const availableTags = [
	"Potager",
	"Plantation",
	"Culture",
	"Récolte",
	"Semis",
	"Observations",
	"Ravageurs & maladies",
];

export const NotesForm = ({
	notes,
	setNotes,
}: { notes: Note[]; setNotes: (notes: Note[]) => void }) => {
	const formSchema = z.object({
		content: z
			.string()
			.min(1, {
				message: "La note doit contenir au moins un caractère",
			})
			.max(700, {
				message: "La note ne doit pas dépasser 700 caractères",
			}),
		plants: z.array(z.string()),
		tags: z.array(z.string()).min(1, {
			message: "Au moins un mot-clé est requis",
		}),
		date: z.date(),
	});
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			content: "",
			plants: [],
			tags: [],
			date: new Date(),
		},
	});
	const handleAddNote = (note: Note) => {
		setNotes((prevNotes) => [...prevNotes, note]);
	};
	function handleSubmit(data: z.infer<typeof formSchema>) {
		handleAddNote(data);
		form.reset();
	}
	return (
		<Form {...form}>
			<form
				className="grid w-full items-start gap-6"
				onSubmit={form.handleSubmit(handleSubmit)}
			>
				<fieldset className="grid gap-6 rounded-lg border p-4">
					<legend className="-ml-1 px-1 text-sm font-medium">Paramètres</legend>
					<div className="grid gap-3">
						<FormField
							control={form.control}
							name="plants"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Plantes</FormLabel>
									<FormControl>
										<>
											<MultiSelect
												value={field.value}
												onValueChange={(value) => field.onChange(value)}
												options={plants.map((plant) => ({
													value: plant.name,
													label: plant.name,
												}))}
												defaultValue={field.value}
												placeholder="Sélectionner une ou plusieurs plantes"
												variant="inverted"
												animation={2}
												maxCount={3}
											/>
										</>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="grid gap-3">
						<FormField
							control={form.control}
							name="tags"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tags / Mots-clés</FormLabel>
									<FormControl>
										<MultiSelect
											value={field.value}
											onValueChange={(value) => field.onChange(value)}
											options={availableTags.map((tag) => ({
												value: tag,
												label: tag,
											}))}
											defaultValue={field.value}
											placeholder="Sélectionner des mots-clés"
											variant="inverted"
											animation={2}
											maxCount={3}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="grid gap-3">
							<FormField
								control={form.control}
								name="date"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Date</FormLabel>
										<FormControl>
											<DatePicker
												selected={field.value}
												onChange={(date) => field.onChange(date)}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
				</fieldset>
				<fieldset className="grid gap-6 rounded-lg border p-4">
					<legend className="-ml-1 px-1 text-sm font-medium">Note</legend>
					<div className="grid gap-3">
						<FormField
							control={form.control}
							name="content"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Contenu (max: 700 caractères par note)</FormLabel>
									<FormControl>
										<Textarea
											maxLength={700}
											{...field}
											placeholder="Note et observations du jardin .."
											className="min-h-[7rem]"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="grid gap-3">
						<Button
							variant="outline"
							className="flex items-center gap-2 bg-slate-50 hover:bg-slate-200"
						>
							<SquarePlus className="size-4" />
							Ajouter
						</Button>
					</div>
				</fieldset>
			</form>
		</Form>
	);
};

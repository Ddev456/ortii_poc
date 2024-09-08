"use client";

import { ChevronRight, Cross, Search, X } from "lucide-react";
import { useState } from "react";
import { Card, CardTitle } from "./ui/card";
import { MostPopularPlants } from "./MostPopularPlants";
import Image from "next/image";
import Link from "next/link";
import { plants } from "@/app/wiki/plants";

export const SearchBar = () => {
	const [inputValue, setInputValue] = useState("");
	const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

	const filteredPlants = plants.filter((plant) =>
		plant.name.toLowerCase().includes(inputValue.toLowerCase()),
	);

	return (
		<div className="flex flex-col gap-4">
			<h2 className="text-2xl font-bold">Rechercher une plante</h2>
			<div className="relative w-full flex items-center gap-4">
				<input
					type="text"
					className="w-full rounded-lg border border-border p-2 pl-10 pr-10 bg-muted"
					placeholder="Rechercher une plante"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
				/>
				<span className="absolute left-3 top-3">
					<Search className="size-4" />
				</span>
				<button
					type="button"
					className="absolute right-3 top-3.5"
					onClick={() => setInputValue("")}
				>
					<X className="size-4" />
				</button>
			</div>

			{inputValue && (
				<div className="flex flex-col gap-2 items-center">
					<span className="text-lg font-bold">
						Résultats pour "{inputValue}"
					</span>

					<div className="grid lg:grid-cols-6 sm:grid-cols-4 grid-cols-2 gap-2">
						{filteredPlants.map((plant, index) => (
							<Card
								key={plant.id}
								className="group bg-transparent border-0 shadow-none flex gap-2 items-center col-span-1 p-1"
							>
								<Link
									href={`/wiki/${plant.name}`}
									className="flex gap-1 font-medium items-center"
								>
									<Image
										src={plant.image}
										width={100}
										height={100}
										alt="thumbnail"
										className="rounded-xl w-14 h-14 object-cover"
									/>
									<div className="flex flex-col gap-1">
										<span className="text-sm group-hover:underline">
											{plant.name.length > 14
												? `${plant.name.substring(0, 14)}...`
												: plant.name}
										</span>
										<span className="text-muted-foreground text-xs">
											Cucucmis cucurbita
										</span>
									</div>
									<ChevronRight className="size-4" />
								</Link>
							</Card>
						))}
					</div>
				</div>
			)}
			{!inputValue && <MostPopularPlants />}
		</div>
	);
};

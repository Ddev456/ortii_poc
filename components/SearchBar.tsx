"use client";

import { ChevronRight, Cross, GraduationCap, Search, X } from "lucide-react";
import { useState } from "react";
import { Card, CardTitle } from "./ui/card";
import { MostPopularPlants } from "./MostPopularPlants";
import Image from "next/image";
import Link from "next/link";
import { plants } from "@/app/wiki/plants";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export const SearchBar = () => {
	const [inputValue, setInputValue] = useState("");
	const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

	const filteredPlants = plants.filter((plant) =>
		plant.name.toLowerCase().includes(inputValue.toLowerCase()),
	);

	return (
		<div className="flex flex-col gap-4 mt-4">
			<div className="flex gap-1 items-center">
				<div className="relative flex-1 md:grow-0 w-64 md:w-96 lg:w-[800px]">
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						type="search"
						placeholder="Rechercher une plante"
						className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
						value={inputValue || ""}
						onChange={(e) => setInputValue(e.target.value.trim())}
					/>
				</div>
				<Button>
					<GraduationCap className="size-4" />
					<span>Tutoriels</span>
				</Button>
			</div>
			<MostPopularPlants />

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
			{!inputValue && (
				<>
					<div className="grid lg:grid-cols-6 sm:grid-cols-4 grid-cols-2 gap-2">
						{plants.map((plant, index) => (
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
				</>
			)}
		</div>
	);
};

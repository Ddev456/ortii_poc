import Image from "next/image";
import { plants } from "@/app/wiki/plants";
import { CropTooltip } from "./CropTooltip";
import { Button } from "./ui/button";
import { Paperclip, Shovel, Sprout, Users } from "lucide-react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const cardsIcons = [
	{ icon: Users, title: "Subscriptions" },
	{ icon: Users, title: "Subscriptions" },
	{ icon: Users, title: "Subscriptions" },
	{ icon: Users, title: "Subscriptions" },
];

export const WikiSheet = ({ plant }: { plant: string }) => {
	const selectedPlant = plants.find(
		(item) => item.name.toLowerCase() === plant.toLowerCase(),
	);
	const level = (difficulty: number) => {
		if (difficulty === 1) {
			return "Culture Facile";
		}
		if (difficulty === 2) {
			return "Entretien modéré";
		}
		return "Culture avancée";
	};
	const levelRender = level(selectedPlant?.level || 1);
	return (
		<>
			{selectedPlant ? (
				<div className="flex flex-col gap-8">
					<div className="flex flex-col md:flex-row gap-2">
						<Card>
							<CardContent className="py-4">
								<Image
									src={selectedPlant?.image}
									className="rounded-xl w-full h-60"
									alt="thumbnail"
									width="100"
									height="100"
								/>
							</CardContent>
							<CardFooter className="text-lg font-medium">
								<Button variant="default" className="w-full">
									Ajouter
								</Button>
							</CardFooter>
						</Card>
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-lg font-medium">
									{selectedPlant?.name}
								</CardTitle>
								<Paperclip className="size-8 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<p className="text-md text-muted-foreground">
									{selectedPlant?.description}
								</p>
								<p className="text-md text-muted-foreground">
									Difficulté: {levelRender}
								</p>
								{selectedPlant.efficiency && selectedPlant.density && (
									<p className="text-md text-muted-foreground">
										Indice de rentabilité:{" "}
										{`${Math.round(
											selectedPlant?.efficiency / selectedPlant?.timeToHarvest,
										)} %`}
									</p>
								)}
								<p className="text-md text-muted-foreground">
									Valeur nutritionnelle: {selectedPlant?.nutritionalValue}
								</p>
								<p className="text-md text-muted-foreground">
									Temps de levée des graines: {selectedPlant?.growingTime} jours
								</p>
								<p className="text-md text-muted-foreground">
									Temps avant la récolte: {selectedPlant?.timeToHarvest} jours
								</p>
							</CardContent>
						</Card>
					</div>
					<div className="flex flex-col md:flex-row p-2 gap-4">
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-lg font-medium">
									Etapes de culture
								</CardTitle>
								<Shovel className="size-8 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<CropTooltip
									cropPeriod={selectedPlant?.cropPeriod}
									plantName={selectedPlant?.name}
								/>
								<p className="text-md text-muted-foreground">
									{selectedPlant?.cropPeriod.length} étapes
								</p>
							</CardContent>
						</Card>

						<Card className="flex-1">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-lg font-medium">
									Entretien de la plante
								</CardTitle>
								<Sprout className="size-8 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<p className="text-md text-muted-foreground">
									{selectedPlant?.exposition}
								</p>
								<p className="text-md text-muted-foreground">
									{selectedPlant?.hardiness}
								</p>
								<p className="text-md text-muted-foreground">
									{selectedPlant?.density} Kg/m²
								</p>
								<p className="text-md text-muted-foreground">
									Temps avant la récolte: {selectedPlant?.timeToHarvest} jours
								</p>
								<p className="text-md text-muted-foreground">
									Arrosage: {selectedPlant?.timeToHarvest}
								</p>
								<p className="text-md text-muted-foreground">
									{selectedPlant?.space} m²
								</p>
								<p className="text-md text-muted-foreground">
									{selectedPlant?.growingTime} jours
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			) : (
				<p className="text-sm">
					Cette plante n'existe pas dans la base de données du wiki.
				</p>
			)}
		</>
	);
};

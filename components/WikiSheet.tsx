import Image from "next/image";
import { plants } from "@/app/wiki/plants";
import { CropTooltip } from "./CropTooltip";

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
					<div className="flex gap-4">
						<Image
							src={selectedPlant?.image}
							className="rounded-xl w-60 h-60"
							alt="thumbnail"
							width="100"
							height="100"
						/>
						<div className="flex flex-col gap-2">
							<h2 className="text-xl font-bold">{selectedPlant?.name}</h2>
							<p className="text-sm">{selectedPlant?.description}</p>
							<p className="text-sm">Difficulté: {levelRender}</p>
							{selectedPlant.efficiency && selectedPlant.density && (
								<p className="text-sm">
									Indice de rentabilité:{" "}
									{`${Math.round(selectedPlant?.efficiency / selectedPlant?.timeToHarvest)} %`}
								</p>
							)}
							<p className="text-sm">
								Valeur nutritionnelle: {selectedPlant?.nutritionalValue}
							</p>
							<p className="text-sm">
								Temps de levée des graines: {selectedPlant?.growingTime} jours
							</p>
							<p className="text-sm">
								Temps avant la récolte: {selectedPlant?.timeToHarvest} jours
							</p>
						</div>
					</div>
					<div className="flex">
						<h3>Etapes de culture</h3>
						<CropTooltip
							cropPeriod={selectedPlant?.cropPeriod}
							plantName={selectedPlant?.name}
						/>
					</div>
					<div className="flex">
						<h3>Entretien de la plante</h3>
						<p className="text-sm">Exposition: {selectedPlant?.exposition}</p>
						<p className="text-sm">Arrosage :</p>
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

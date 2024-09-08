import Image from "next/image";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Carrot, ChevronRight, Heart } from "lucide-react";
import Link from "next/link";

const popularPlants = [
	{
		id: 1,
		name: "Tomate",
		image: "/tomate.jpg",
		likes: 344,
	},
	{
		id: 2,
		name: "Ail",
		image: "/ail.jpg",
		likes: 502,
	},
	{
		id: 3,
		name: "Laitue",
		image: "/laitue.jpg",
		likes: 207,
	},
	{
		id: 4,
		name: "Courgette",
		image: "/courgette.jpg",
		likes: 299,
	},
];

export const MostPopularPlants = () => {
	return (
		<div className="flex flex-col gap-1">
			<h3 className="text-xl font-bold">Plantes les plus populaires</h3>
			<div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-1 pt-6">
				{popularPlants.map((plant, index) => (
					<Link href={`/wiki/${plant.name}`} key={plant.id}>
						<Card className="group max-h-48 flex flex-col rounded-xl border-2 border-slate-300 bg-slate-100 relative overflow-hidden">
							<Image
								src={plant.image}
								className="max-h-20 w-full rounded-xl object-cover transition-transform duration-300 group-hover:scale-110"
								width="150"
								height="150"
								alt="ail"
							/>
							<div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-75 p-1 rounded-b-xl">
								<div className="flex justify-between items-center gap-2">
									<span className="text-md font-medium">{plant.name}</span>
									<div className="flex">
										<span>(</span>
										<span className="text-red-500">
											<Heart className="size-4 stroke-red-500 fill-red-200" />
										</span>
										<span>{plant.likes}</span>
										<span>)</span>
									</div>
								</div>
							</div>
						</Card>
					</Link>
				))}
			</div>
		</div>
	);
};

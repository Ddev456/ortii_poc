import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<div className="flex flex-col gap-4 items-center justify-center">
			<h3 className="text-xl font-bold">Accueil</h3>
			<Image src="/france-departments.svg" alt="map" width={400} height={400} />
		</div>
	);
}

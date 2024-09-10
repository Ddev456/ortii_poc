import { Drifter } from "@/components/ui/drifter";
import {
	Calendar,
	Home,
	MessagesSquareIcon,
	Settings,
	Sprout,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Wizard } from "./Wizard";

const navLinks = [
	{
		href: "/",
		label: "Accueil",
		icon: <Image src="/home.svg" alt="ortii" width={25} height={25} />,
		disable: false,
	},
	{
		href: "/wiki",
		label: "Plantes",
		icon: <Image src="/wikiIcon.svg" alt="ortii" width={25} height={25} />,
		disable: false,
	},
	{
		href: "/carnet",
		label: "Carnet",
		icon: <Image src="/calendarIcon.svg" alt="ortii" width={25} height={25} />,
		disable: false,
	},
	{
		href: "#",
		label: "Partage",
		icon: <Image src="/shareIcon.svg" alt="ortii" width={25} height={25} />,
		disable: true,
	},
];

export function MobileNavigationTabs() {
	return (
		<div className="block md:hidden fixed bottom-0 w-full z-10 shadow-sm border-t border-border">
			<div className="flex justify-between w-full space-x-2 rounded-xl border  bg-white p-2">
				<Drifter
					defaultValue={navLinks[0].label}
					className="rounded-lg bg-zinc-200"
					transition={{
						type: "spring",
						bounce: 0.2,
						duration: 0.3,
					}}
				>
					<>
						{navLinks.map((tab) => (
							<Link
								href={tab.href}
								key={tab.label}
								data-id={tab.label}
								type="button"
								className="inline-flex size-9 items-center justify-center text-zinc-500 transition-colors duration-100 focus-visible:outline-2 data-[checked=true]:text-zinc-950"
							>
								{tab.icon}
							</Link>
						))}
						<Wizard />
					</>
				</Drifter>
			</div>
		</div>
	);
}

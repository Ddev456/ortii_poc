import { Drifter } from "@/components/ui/drifter";
import {
	Calendar,
	Home,
	MessagesSquareIcon,
	Settings,
	Sprout,
} from "lucide-react";
import Link from "next/link";

const TABS = [
	{ href: "/", label: "Accueil", icon: <Home className="size-6" /> },
	{ href: "/wiki", label: "Plantes", icon: <Sprout className="size-6" /> },
	{ href: "/carnet", label: "Carnet", icon: <Calendar className="size-6" /> },
	{
		href: "/share",
		label: "Partage",
		icon: <MessagesSquareIcon className="size-6" />,
	},
	{
		href: "/settings",
		label: "Préférences",
		icon: <Settings className="size-6" />,
	},
];

export function MobileNavigationTabs() {
	return (
		<div className="block md:hidden fixed bottom-0 w-full z-10 shadow-sm border-t border-border">
			<div className="flex justify-between w-full space-x-2 rounded-xl border  bg-white p-2">
				<Drifter
					defaultValue={TABS[0].label}
					className="rounded-lg bg-zinc-200"
					transition={{
						type: "spring",
						bounce: 0.2,
						duration: 0.3,
					}}
				>
					{TABS.map((tab) => (
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
				</Drifter>
			</div>
		</div>
	);
}

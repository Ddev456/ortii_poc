import Image from "next/image";
import Link from "next/link";

const navLinks = [
	{
		href: "/",
		label: "Accueil",
		icon: <Image src="/home.svg" alt="ortii" width={25} height={25} />,
	},
	{
		href: "/wiki",
		label: "Plantes",
		icon: <Image src="/wikiIcon.svg" alt="ortii" width={25} height={25} />,
	},
	{
		href: "/carnet",
		label: "Carnet",
		icon: <Image src="/calendarIcon.svg" alt="ortii" width={25} height={25} />,
	},
	{
		href: "/share",
		label: "Partage",
		icon: <Image src="/shareIcon.svg" alt="ortii" width={25} height={25} />,
	},
	{
		href: "/settings",
		label: "Préférences",
		icon: <Image src="/settings.svg" alt="settings" width={25} height={25} />,
	},
];

export const NavigationTabs = () => {
	return (
		<nav className="hidden md:flex bg-background fixed bottom-0 shadow-sm z-10 w-full justify-around gap-4 items-center border-t border-border">
			{navLinks.map((link) => (
				<Link
					key={link.href}
					href={link.href}
					className="flex flex-col items-center gap-1 text-sm font-normal text-foreground px-2 py-4"
				>
					{link.icon}
					<span>{link.label}</span>
				</Link>
			))}
		</nav>
	);
};

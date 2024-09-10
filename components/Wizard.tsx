"use client";

import * as React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Fence, Megaphone, Zap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

const USDAZones = [{ value: "Aisne", label: "Zone 1 - Aisne" }];

export const GardenWizard = () => {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-2 items-center">
				<Fence className="size-6" />
				<span>Mes paramètres</span>
				<p>
					Choisissez votre zone de rusticité / climat pour déterminer les étapes
					de culture et l'entretien des plantes pour votre potager.
				</p>
			</div>
		</div>
	);
};

export const FeedbackWizard = () => {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex gap-2 items-center">
				<Megaphone className="size-6" />
				<span>Feedback</span>
			</div>
		</div>
	);
};

const TABS = [
	{
		label: "Mes paramètres",
		icon: <Fence className="size-6" />,
		content: <GardenWizard />,
	},
	{
		label: "Feedback",
		icon: <Megaphone className="size-6" />,
		content: <FeedbackWizard />,
	},
];

export const Wizard = () => {
	const [open, setOpen] = React.useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger>
					<div className="flex flex-col items-center gap-1 text-sm font-normal text-foreground px-2 py-4">
						<Image src="/settings.svg" alt="settings" width={25} height={25} />{" "}
						<span className="">Préférences</span>
					</div>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Préférences</DialogTitle>
					</DialogHeader>
					<WizardTabs />
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<div className="flex flex-col items-center gap-1 text-sm font-normal text-foreground py-1 pr-2">
					<Image
						className="size-6"
						src="/settings.svg"
						alt="settings"
						width={25}
						height={25}
					/>
				</div>
			</DrawerTrigger>
			<DrawerContent className="sm:min-w-[425px]">
				<DrawerHeader className="text-left">
					<DrawerTitle>Préférences</DrawerTitle>
				</DrawerHeader>
				<WizardTabs className="px-4" />
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">Fermer</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

function WizardTabs({ className }: React.ComponentProps<"form">) {
	return (
		<div className="flex items-center mx-auto">
			<Tabs defaultValue="garden" className="w-[400px]">
				<TabsList>
					{TABS.map((tab) => (
						<TabsTrigger
							key={tab.label}
							value={tab.label}
							className="flex items-center gap-2"
						>
							{tab.icon}
							<span>{tab.label}</span>
						</TabsTrigger>
					))}
				</TabsList>
				<div className="min-h-[500px]">
					{TABS.map((tab) => (
						<TabsContent key={tab.label} value={tab.label}>
							{tab.content}
						</TabsContent>
					))}
				</div>
			</Tabs>
		</div>
	);
}

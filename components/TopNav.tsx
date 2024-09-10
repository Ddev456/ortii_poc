"use client";

import { Zap } from "lucide-react";
import { Button } from "./ui/button";

import Image from "next/image";
import { Wizard } from "./Wizard";
import React from "react";
import { useTour } from "@reactour/tour";

export const TopNav = () => {
	const { setIsOpen } = useTour();
	return (
		<header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4 flex justify-between">
			<h1 className="tour-step-1 flex items-center gap-2 text-xl font-semibold">
				<Image src="/__logo.svg" alt="ortii" width={40} height={40} />
			</h1>
			<Button
				variant="ghost"
				className="text-white p-2 rounded"
				onClick={() => setIsOpen(true)}
			>
				<Zap className="size-4 stroke-orange-600 fill-orange-200" />
				<span className="text-foreground">Assistant</span>
			</Button>
		</header>
	);
};

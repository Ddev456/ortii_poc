"use client";

import { TourProvider, useTour } from "@reactour/tour";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const wikiSteps = [
	{
		selector: ".wikiStep1",
		content: "Ceci est la première étape du wiki.",
	},
	{
		selector: ".wikiStep2",
		content: "Ceci est la deuxième étape wiki.",
	},
	{
		selector: ".wikiStep3",
		content: "Ceci est la troisième étape.",
	},
	{
		selector: ".wikiStep4",
		content: "Ceci est la quatrième étape.",
	},
];

export const StepTourWrapper = ({
	children,
}: { children: React.ReactNode }) => {
	const { isOpen, currentStep, steps, setIsOpen, setCurrentStep, setSteps } =
		useTour();

	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		if (currentStep === 2 && isOpen && pathname === "/wiki") {
			console.log("test");

			router.push("/carnet/calendar");
		} else if (currentStep > 2 && isOpen && pathname !== "/wiki") {
			router.push("/wiki");
		}
	}, [currentStep, router, isOpen, pathname]);
	return <>{children}</>;
};

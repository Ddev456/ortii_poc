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

export const ReactourWrapper = ({
	children,
}: { children: React.ReactNode }) => {
	return <TourProvider steps={wikiSteps}>{children}</TourProvider>;
};

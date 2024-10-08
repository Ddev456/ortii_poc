import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavigationTabs } from "@/components/NavigationTabs";
import { Toaster } from "@/components/ui/toaster";
import { TopNav } from "@/components/TopNav";
import { MobileNavigationTabs } from "@/components/MobileNavigationTabs";

import { TourProvider } from "@reactour/tour";
import { ReactourWrapper } from "@/components/ReactourWrapper";
import { StepTourWrapper } from "@/components/StepTourWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className}`}>
				<ReactourWrapper>
					<StepTourWrapper>
						<NavigationTabs />
						<MobileNavigationTabs />
						<TopNav />
						<div className="min-h-[50vh] py-6 px-[2rem] lg:px-[6rem] md:mb-[150px]">
							{children}
						</div>
						<Toaster />
					</StepTourWrapper>
				</ReactourWrapper>
			</body>
		</html>
	);
}

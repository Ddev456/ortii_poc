import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function CarnetPage() {
	return (
		<div className="flex flex-col gap-4">
			<Link
				href="/carnet/calendar"
				className={cn(buttonVariants({ variant: "outline" }))}
			>
				Calendrier
			</Link>
			<Link
				href="/carnet/notes"
				className={cn(buttonVariants({ variant: "outline" }))}
			>
				Notes
			</Link>
		</div>
	);
}

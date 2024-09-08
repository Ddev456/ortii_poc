import { Bird, Bold, Rabbit, Settings, Share, Turtle, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { DatePicker } from "./ui/date-picker";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "./ui/drawer";
import Image from "next/image";

export const TopNav = () => {
	return (
		<header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
			<h1 className="flex items-center gap-2 text-xl font-semibold">
				<Image src="/__logo.svg" alt="ortii" width={40} height={40} />
			</h1>

			<Button variant="outline" size="sm" className="ml-auto gap-1.5 text-sm">
				<Zap className="size-4 stroke-orange-600 fill-orange-200" />
				<span className="text-sm text-muted-foreground">Assistant</span>
			</Button>
		</header>
	);
};

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex gap-4 items-center justify-center">
      <Link href="/calendar" className={cn(buttonVariants({variant: "default"}))}>Calendrier</Link>
      <Link href="/database" className={cn(buttonVariants({variant: "default"}))}>Base de données</Link>
      <Link href="/threads" className={cn(buttonVariants({variant: "default"}))}>Fils de discussion</Link>
    </div>
  );
}

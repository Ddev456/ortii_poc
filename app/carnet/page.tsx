import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function CarnetPage() {
    return (
        <>
        <div>Carnet</div>
        <Link href="/carnet/calendar" className={cn(buttonVariants({variant: "outline"}))}>Calendrier</Link> 
        <Link href="/carnet/notes" className={cn(buttonVariants({variant: "outline"}))}>Notes</Link> 
        </>
    )
}
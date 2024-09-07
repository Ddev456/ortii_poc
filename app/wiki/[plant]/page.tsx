import { WikiSheet } from "@/components/WikiSheet"

export default function WikiPlantPage({ params }: { params: { plant: string } })  {
    return (
        <WikiSheet plant={params.plant} />
    )   
}
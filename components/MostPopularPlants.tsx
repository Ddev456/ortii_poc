export const MostPopularPlants = () => {
    return (
        <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold">Plantes les plus populaires</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-1 pt-6">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1 items-center">
                        <img src="/ail.jpg" className="w-36 h-36 rounded-[22px]" alt="ail" />
                        <span className="text-md font-medium">Ail</span>
                        <span>♥️ (502)</span>
                    </div>
                </div>
                
                {/* Second plant */}
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1 items-center">
                        <img src="/tomate.jpg" className="w-36 h-36 rounded-[22px]" alt="tomate" />
                        <span className="text-md font-medium">Tomate</span>
                        <span>♥️ (344)</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
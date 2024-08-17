'use client'

import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { calendarData } from "./calendar-data";
import { Badge } from "./ui/badge";
import Image from "next/image";

const weekDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", 
    "Octobre", "Novembre", "Décembre"];

const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 0
    );

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowWidth;
};

export const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const windowWidth = useWindowWidth();
    const isSmallScreen = windowWidth < 640; // Ajustez ce seuil selon vos besoins

    const handleNavigation = (direction: "left" | "right") => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            if (isSmallScreen) {
                newDate.setDate(newDate.getDate() + (direction === "left" ? -1 : 1));
            } else {
                newDate.setDate(newDate.getDate() + (direction === "left" ? -7 : 7));
            }
            return newDate;
        });
    }

    const getDaysToDisplay = useMemo(() => {
        if (isSmallScreen) {
            return [
                new Date(currentDate.getTime() - 86400000),
                currentDate,
                new Date(currentDate.getTime() + 86400000)
            ];
        } else {
            const startOfWeek = new Date(currentDate);
            startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1));
            return Array.from({ length: 7 }, (_, i) => {
                const day = new Date(startOfWeek);
                day.setDate(startOfWeek.getDate() + i);
                return day;
            });
        }
    }, [currentDate, isSmallScreen]);

    const eventsForDay = (day: Date) => {
        const formattedDate = day.toISOString().split('T')[0];
        
        return calendarData.filter(event => {
            const eventDate = new Date(event.date);
            const eventDateFormatted = eventDate.toISOString().split('T')[0];
            return eventDateFormatted === formattedDate;
        });
    };

    const currentEvents = eventsForDay(currentDate);

    const getDateRangeString = () => {
        const days = getDaysToDisplay;
        const startDate = days[0];
        const endDate = days[days.length - 1];

        if (startDate.getMonth() === endDate.getMonth()) {
            return `Du ${startDate.getDate()} au ${endDate.getDate()} ${months[startDate.getMonth()]}`;
        } else {
            return `Du ${startDate.getDate()} ${months[startDate.getMonth()]} au ${endDate.getDate()} ${months[endDate.getMonth()]}`;
        }
    };

    return (
        <div className="h-screen w-screen p-4 sm:p-10 rounded-lg bg-slate-200 flex flex-col gap-4">
            <div className="flex gap-2 items-center justify-center">
            <button onClick={() => handleNavigation("left")} className="bg-slate-50 rounded-lg p-2 flex-shrink-0">
                    <ArrowLeft className="w-4 sm:w-6 h-4 sm:h-6" />
                </button>
            <div className="flex flex-col items-center">
            <h2 className="text-xl sm:text-2xl font-bold">
                {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <span className="text-sm sm:text-base mt-1">{getDateRangeString()}</span>
            </div>
            <button onClick={() => handleNavigation("right")} className="bg-slate-50 rounded-lg p-2 flex-shrink-0">
                    <ArrowRight className="w-4 sm:w-6 h-4 sm:h-6" />
            </button>
            </div>
            <div className="flex gap-2 sm:gap-4 items-center overflow-x-auto p-4 justify-center">
                
                {getDaysToDisplay.map((day) => (
                    <div key={day.toISOString()} 
                         className={cn("relative w-16 sm:w-20 h-16 sm:h-20 bg-slate-50 shadow-md rounded-lg flex flex-col items-center justify-start p-2 font-bold text-center flex-shrink-0", {
                             "bg-green-600 text-white": day.toDateString() === currentDate.toDateString(),
                         })}
                         onClick={() => setCurrentDate(day)}>
                        
                           { eventsForDay(day).length > 0 && (
                               <Badge className={cn("bg-green-600 absolute top-[-0.5rem] right-[-0.5rem] rounded-full",
                                {"hidden": day.toDateString() === currentDate.toDateString(),}
                                )}>
                                   {eventsForDay(day).length}
                               </Badge>
                           )}
                        
                        <span className="text-sm sm:text-base font-normal">{weekDays[day.getDay()]}</span>
                        <span>{day.getDate()}</span>
                        
                    </div>
                ))}
               
            </div>
            <div className="flex-grow flex flex-col overflow-hidden">
                <h3 className="text-lg sm:text-xl font-bold mb-4">Événements du {currentDate.toLocaleDateString('fr-FR')}</h3>
                <div className="flex-grow overflow-y-auto">
                    {currentEvents.length > 0 ? (
                        currentEvents.map((event, index) => (
                            <div key={index} className="my-3 shadow-md flex items-center gap-2 bg-slate-50 text-slate-800 p-2 mb-2 rounded h-24 ">
                                <div className="relative">
                                    <Image 
                                        src="/event.jpg" 
                                        alt="event" 
                                        width={120} 
                                        height={80} 
                                        className={cn(
                                            "rounded-lg",
                                            event.checked && "opacity-50"
                                        )} 
                                    />
                                    {event.checked && (
                                        <div className="absolute inset-0 bg-green-500 bg-opacity-30 rounded-lg flex items-center justify-center">
                                            <Check className="w-10 h-10 stroke-white" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className="font-bold">{event.title}</span>
                                    <span className="text-sm font-normal">{event.category}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Aucun événement pour cette date.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
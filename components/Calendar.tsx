'use client'

import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Check, Maximize2, Minimize2 } from "lucide-react";
import { useState, useMemo, useEffect, useRef } from "react";
import { calendarData } from "./calendar-data";
import { Badge } from "./ui/badge";
import Image from "next/image";

const weekDays = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
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

const createUTCDate = (date: Date | string) => {
    const d = new Date(date);
    return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
};

export const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(createUTCDate(new Date()));
    const [isWeekView, setIsWeekView] = useState(false);
    const windowWidth = useWindowWidth();
    const isSmallScreen = windowWidth < 640;
    const eventRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
    
    const toggleView = () => {
        setIsWeekView(!isWeekView);
    };

    const handleNavigation = (direction: "left" | "right") => {
        if (isWeekView) {
            setCurrentDate(prevDate => {
                const newDate = new Date(prevDate);
                newDate.setDate(newDate.getDate() + (direction === "left" ? -7 : 7));
                return newDate;
            });
        } else {
            setCurrentDate(prevDate => {
                const newDate = new Date(prevDate);
                newDate.setMonth(newDate.getMonth() + (direction === "left" ? -1 : 1));
                return newDate;
            });
        }
    };
        
    const getDaysToDisplay = useMemo(() => {
        const year = currentDate.getUTCFullYear();
        const month = currentDate.getUTCMonth();
        const firstDayOfMonth = new Date(Date.UTC(year, month, 1));
        const lastDayOfMonth = new Date(Date.UTC(year, month + 1, 0));

        if (isWeekView) {
            const startOfWeek = new Date(currentDate);
            startOfWeek.setUTCDate(currentDate.getUTCDate() - currentDate.getUTCDay());
            const days = [];
            for (let i = 0; i < 7; i++) {
                const day = new Date(startOfWeek);
                day.setUTCDate(startOfWeek.getUTCDate() + i);
                days.push(day);
            }
            return days;
        } else {

        const startDate = new Date(firstDayOfMonth);
        startDate.setUTCDate(startDate.getUTCDate() - startDate.getUTCDay());

        const endDate = new Date(lastDayOfMonth);
        endDate.setUTCDate(endDate.getUTCDate() + (6 - endDate.getUTCDay()));

        const days = [];
        let day = new Date(startDate);
        while (day <= endDate) {
            days.push(new Date(day));
            day.setUTCDate(day.getUTCDate() + 1);
        }

        return days;
        }
    }, [currentDate, isWeekView]);

    const eventsForRange = useMemo(() => {
        const days = getDaysToDisplay;
        const startDate = days[0];
        const endDate = days[days.length - 1];
        
        return calendarData.filter(event => {
            const eventDate = createUTCDate(event.date);
            return eventDate >= startDate && eventDate <= endDate;
        }).sort((a, b) => createUTCDate(a.date).getTime() - createUTCDate(b.date).getTime());
    }, [getDaysToDisplay]);

    const groupedEvents = useMemo(() => {
        const grouped = eventsForRange.reduce((acc, event) => {
            const eventDate = createUTCDate(event.date);
            const dateString = eventDate.toISOString().split('T')[0];
            if (!acc[dateString]) {
                acc[dateString] = [];
            }
            acc[dateString].push(event);
            return acc;
        }, {} as Record<string, typeof eventsForRange>);

        return Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));
    }, [eventsForRange]);


    useEffect(() => {
        const currentDateString = currentDate.toISOString().split('T')[0];
        const element = eventRefs.current[currentDateString];
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [currentDate]);

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
            
                    <button onClick={toggleView} className="bg-slate-50 rounded-lg p-2 ml-4">
                        {isWeekView ? <Maximize2 className="w-6 h-6" /> : <Minimize2 className="w-6 h-6" />}
                    </button>
            
            </div>

            <div className="w-[350px] sm:hidden flex gap-2 sm:gap-4 items-center overflow-x-auto p-4">    
                {getDaysToDisplay.map((day) => {
                                    const dayString = day.toISOString().split('T')[0];
                                    return (
                    <div key={dayString}
                         className={cn("relative w-16 sm:w-20 h-16 sm:h-20 bg-slate-50 shadow-md rounded-lg flex flex-col items-center justify-start p-2 font-bold text-center flex-shrink-0", {
                             "bg-green-600 text-white": day.toDateString() === currentDate.toDateString(),
                         })}
                         onClick={() => setCurrentDate(day)}>
                        
                           { eventsForRange.filter(event => {
                                const eventDate = new Date(event.date);
                                return eventDate.toDateString() === day.toDateString();
                            }).length > 0 && (
                               <Badge className={cn("bg-green-600 absolute top-[-0.5rem] right-[-0.5rem] rounded-full",
                                {"hidden": day.toDateString() === currentDate.toDateString(),}
                                )}>
                                   {eventsForRange.filter(event => {
                                        const eventDate = new Date(event.date);
                                        return eventDate.toDateString() === day.toDateString();
                                    }).length}
                               </Badge>
                           )}
                        
                        <span className="text-sm sm:text-base font-normal">{weekDays[day.getDay()]}</span>
                        <span>{day.getDate()}</span>
                        
                    </div>
                )})}
            </div>

            <div className={cn("w-[600px] mx-auto hidden sm:block overflow-x-auto sm:overflow-x-visible", {
                "sm:h-32": isWeekView
            })}>
                <div className="grid grid-cols-7 gap-1 sm:gap-2 min-w-[640px] sm:min-w-full">
                    {weekDays.map((day) => (
                        <div key={day} className="max-w-[80px] text-center font-bold text-xs sm:text-sm">
                            {day}
                        </div>
                    ))}
                    {getDaysToDisplay.map((day) => {
                        const dayString = day.toISOString().split('T')[0];
                        return (
                            <div 
                                key={dayString}
                                className={cn(
                                    "max-w-[80px] relative aspect-square bg-slate-50 shadow-md rounded-lg flex flex-col items-center justify-start p-1 sm:p-2 font-bold text-center",
                                    {
                                        "bg-green-600 text-white": day.toDateString() === currentDate.toDateString(),
                                        "opacity-50": day.getUTCMonth() !== currentDate.getUTCMonth()
                                    }
                                )}
                                onClick={() => setCurrentDate(day)}
                            >
           
                                <span className="text-xs sm:text-sm">{day.getUTCDate()}</span>
                                { eventsForRange.filter(event => createUTCDate(event.date).toDateString() === day.toDateString()).length > 0 && (
                                    <Badge className={cn(
                                        "bg-green-600 absolute bottom-1 right-1 text-[0.5rem] sm:text-xs",
                                        {"hidden": day.toDateString() === currentDate.toDateString()}
                                    )}>
                                        {eventsForRange.filter(event => createUTCDate(event.date).toDateString() === day.toDateString()).length}
                                    </Badge>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="flex-grow flex flex-col overflow-hidden">
            <h3 className="text-lg sm:text-xl font-bold mb-4">Événements du {getDateRangeString()}</h3>
            <div className="flex-grow overflow-y-auto">
                {groupedEvents.length > 0 ? (
                    groupedEvents.map(([dateString, events]) => (
                        <div key={dateString}>
                            <h3 className="text-md font-semibold mt-4 mb-2">
                                {new Date(dateString).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                            </h3>
                            {events.map((event, index) => {
                                    const eventDate = createUTCDate(event.date);
                                    return (
                                        <div 
                                            key={index} 
                                            ref={(el) => {
                                                if (el) eventRefs.current[dateString] = el;
                                            }}
                                            className={cn(
                                                "my-3 flex items-center gap-2 bg-slate-50 text-slate-800 p-2 mb-2 rounded h-24",
                                                {"border-l-4 border-green-600": dateString === currentDate.toISOString().split('T')[0]},
                                                {"shadow-md": dateString === currentDate.toISOString().split('T')[0]}
                                            )}
                                        >
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
                                        <span className="text-xs text-gray-500">{eventDate.toLocaleDateString('fr-FR')}</span>
                                    </div>
                                </div>
                                    );
                                })}
                            </div>
                        ))
                    ) : (
                        <p>Aucun événement pour cette période.</p>
                    )}

                                    </div>
                                </div>
                            
                            </div>
                        )}

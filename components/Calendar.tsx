"use client";

import { ChevronRight, ChevronLeft, Plus } from "lucide-react";
import React, { useState } from "react";

const events = [
	{
		id: 1,
		title: "Tomate",
		date: new Date(Date.now() + 1000 * 60 * 60 * 24),
		color: "bg-green-300",
	},
	{
		id: 2,
		title: "Tournesol",
		date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
		color: "bg-orange-300",
	},
	{
		id: 3,
		title: "Courgette",
		date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4),
		color: "bg-indigo-300",
	},
	{
		id: 4,
		title: "Framboise",
		date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4),
		color: "bg-red-300",
	},
	{
		id: 5,
		title: "Tomate",
		date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
		color: "bg-green-300",
	},
	{
		id: 6,
		title: "Tournesol",
		date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 6),
		color: "bg-orange-300",
	},
	{
		id: 7,
		title: "Courgette",
		date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4),
		color: "bg-indigo-300",
	},
	{
		id: 8,
		title: "Framboise",
		date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4),
		color: "bg-red-300",
	},
];

const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const getDaysInMonth = (year: number, month: number) => {
	return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
	return new Date(year, month, 1).getDay();
};

const getStartOfWeek = (date: Date) => {
	const day = date.getDay();
	const diff = (day === 0 ? -6 : 1) - day; // Ajuste pour que la semaine commence le lundi
	return new Date(date.setDate(date.getDate() + diff));
};

export function Calendar() {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [view, setView] = useState("month"); // 'month' or 'week'

	const handlePrev = () => {
		if (view === "month") {
			setCurrentDate(
				new Date(currentDate.getFullYear(), currentDate.getMonth() - 1),
			);
		} else {
			setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)));
		}
	};

	const handleNext = () => {
		if (view === "month") {
			setCurrentDate(
				new Date(currentDate.getFullYear(), currentDate.getMonth() + 1),
			);
		} else {
			setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)));
		}
	};

	const handleToday = () => {
		setCurrentDate(new Date());
	};

	const year = currentDate.getFullYear();
	const month = currentDate.getMonth();
	const daysInMonth = getDaysInMonth(year, month);
	const firstDay = getFirstDayOfMonth(year, month);
	const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

	const startOfWeek = getStartOfWeek(new Date(currentDate));

	return (
		<div className="flex flex-col">
			<div className="flex justify-center items-center mb-4">
				<button type="button" onClick={handlePrev} className="px-2 py-1">
					<ChevronLeft className="size-8" />
				</button>
				<h1 className="text-xl font-bold">
					{view === "month"
						? `${currentDate.toLocaleString("fr-FR", { month: "long" })} ${year}`
						: `Semaine du ${startOfWeek.toLocaleDateString("fr-FR")}`}
				</h1>
				<button type="button" onClick={handleNext} className="px-2 py-1">
					<ChevronRight className="size-8" />
				</button>
			</div>
			<div className="flex justify-between mb-4">
				<button
					type="button"
					onClick={handleToday}
					className="px-4 py-2 bg-gray-200 rounded"
				>
					Aujourd'hui
				</button>
				<div>
					<button
						type="button"
						onClick={() => setView("month")}
						className={`px-4 py-2 ${view === "month" ? "bg-blue-500 text-white" : "bg-gray-200"} rounded`}
					>
						Mois
					</button>
					<button
						type="button"
						onClick={() => setView("week")}
						className={`px-4 py-2 ${view === "week" ? "bg-blue-500 text-white" : "bg-gray-200"} rounded`}
					>
						Semaine
					</button>
				</div>
			</div>
			{view === "month" ? (
				<div className="grid grid-cols-7 md:gap-4">
					{days.map((day) => (
						<div
							key={day}
							className="text-center font-normal text-xs text-gray-500"
						>
							{day}
						</div>
					))}
					{Array.from({ length: adjustedFirstDay }).map((_, index) => (
						<div
							key={`adjustedFirstDay-${_}-${index}`}
							className="md:rounded-xl border border-gray-300 h-32 bg-gray-200"
						/>
					))}
					{Array.from({ length: daysInMonth }).map((_, index) => {
						const dayEvents = events
							.filter((event) => event.date.getDate() === index + 1)
							.slice(0, 4);
						return (
							<div
								key={`daysInMonth-${_}-${index}`}
								className="md:rounded-xl relative group border border-gray-300 h-32 text-center font-normal text-gray-500 hover:bg-gray-100 cursor-pointer"
							>
								<span className="text-sm">{index + 1}</span>
								{dayEvents.map((event, eventIndex) => (
									<div
										key={event.id}
										className="flex gap-1 w-full h-6 mt-0.5 shadow-md md:rounded-lg p-1"
									>
										<div
											className={`w-1 p-0.5 text-[10px] md:text-sm md:w-8 md:p-1 md:rounded-full ${event.color}`}
										/>
										<span className="block truncate">{event.title}</span>
									</div>
								))}
								{dayEvents.length > 4 && (
									<div className="absolute bottom-0 left-0 w-full text-xs text-gray-500">
										+{dayEvents.length - 4}
									</div>
								)}
								<Plus className="size-8 hidden group-hover:flex bottom-2 mx-auto w-full absolute" />
							</div>
						);
					})}
					{Array.from({ length: 42 - daysInMonth - adjustedFirstDay }).map(
						(_, index) => (
							<div
								key={`daysInMonth-adjustedFirstDay-${index}`}
								className="md:rounded-xl border border-gray-300 h-32 bg-gray-200"
							/>
						),
					)}
				</div>
			) : (
				<div className="grid grid-cols-7 md:gap-4">
					{days.map((day) => (
						<div
							key={day}
							className="text-center font-normal text-xs text-gray-500"
						>
							{day}
						</div>
					))}
					{Array.from({ length: 7 }).map((_, index) => {
						const date = new Date(startOfWeek);
						const dayEvents = events
							.filter(
								(event) =>
									event.date.getDate() === startOfWeek.getDate() + index,
							)
							.slice(0, 4);
						date.setDate(startOfWeek.getDate() + index);
						return (
							<div
								key={`week-${index}`}
								className="md:rounded-xl relative group hover:bg-gray-100 cursor-pointer border border-gray-300 h-96 text-center font-normal text-xs text-gray-500"
							>
								{date.getDate()}
								{dayEvents.map((event, eventIndex) => (
									<div
										key={event.id}
										className="flex gap-1 w-full h-6 mt-0.5 shadow-md md:rounded-lg p-1"
									>
										<div className={`w-8 p-1 md:rounded-full ${event.color}`} />
										<span>{event.title}</span>
									</div>
								))}
								<Plus className="size-8 hidden group-hover:flex bottom-2 mx-auto w-full absolute" />
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}

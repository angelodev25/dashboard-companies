import { type CalendarProps } from "./Calendar.types";
import { useEffect, useState } from "react";
import { FormatDate } from "@/lib/formatDate";

import multiMonthPlugin from '@fullcalendar/multimonth/index.js'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid/index.js'
import timeGridPlugin from '@fullcalendar/timegrid/index.js'
import interactionPlugin from '@fullcalendar/interaction/index.js'
import listPlugin from '@fullcalendar/list/index.js'
import type { DateSelectArg, EventContentArg } from "@fullcalendar/core/index.js"
import { ModalAddEvent } from "../ModalAddEvent";
import axios from "axios";
import { toast } from "sonner";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";


export function Calendar(props: CalendarProps) {
	const { companies, events, setOnSaveNewEvent, onSaveNewEvent } = props
	const API_URL = import.meta.env.VITE_API_URL
	const [open, setOpen] = useState(false)
	
	const [selectedItem, setSelectedItem] = useState < DateSelectArg > ()
	const navigate = useNavigate()
	const { userId } = useAuth()
	const [newEvent, setNewEvent] = useState({
		eventName: "",
		companySelected: {
			name: "",
			id: ""
		}
	})

	if (!userId) {
		toast.warning("Unauthorized")
		return <Navigate to="/sign-in" />
	}

	useEffect(() => {
		if (onSaveNewEvent && selectedItem?.view.calendar) {
			const calendarApi = selectedItem.view.calendar
			calendarApi.unselect()

			const newEventPrisma = {
				companyId: newEvent.companySelected.id,
				title: newEvent.eventName,
				start: new Date(selectedItem.start),
				allDay: false,
				timeFormat: 'H(:mm)'
			}

			axios.post(`${API_URL}/event/${newEvent.companySelected.id}`, { newEventPrisma, userId })
				.then(() => {
					toast.success("Event created")
				})
				.catch((error) => {
					toast.error("Error", { description: error.message })
				})

			setNewEvent({
				eventName: "",
				companySelected: {
					name: "",
					id: ""
				}
			})
			setOnSaveNewEvent(false)
		}
	}, [onSaveNewEvent, selectedItem, events])

	const handleDateClick = (selected: DateSelectArg) => {
		setOpen(true)
		setSelectedItem(selected)
	}

	const handleEventClick = async (selected: { event: { _def: { title: string; publicId: string; }; }; }) => {
		if (window.confirm(`Are you sure you want to delete this event ${selected.event._def.title}?`)) {
			try {
				await axios.delete(`${API_URL}/event/${selected.event._def.publicId}`, {
					params: { userId: userId }
				});
				toast.success("Event Deleted")
				navigate(0)
			} catch (e: any) {
				toast.error("Something went wrong", { description: e.message })
				console.log(e);
			}
		}
	}

	return (
		<div>
			<div className="md:flex gap-x-3">
				<div className="w-[200px] relative">
					<div className="overflow-auto absolute left-0 top-0 h-full w-full">
						<p className="mb-3 text-xl" >Tasks list</p>
						{events.map((currentEvent) => (
							<div key={currentEvent.id} className="p-4 rounded-lg shadow-md mb-2 bg-slate-200 dark:bg-background">
								<p className="font-bold">{currentEvent.title}</p>
								<p>{FormatDate(currentEvent.start)}</p>
							</div>
						))}
					</div>
				</div>
				<div className="flex-1 calendar-container">
					<FullCalendar
						plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin, multiMonthPlugin]}
						headerToolbar={{
							left: "prev,next today",
							center: "title",
							"right": "timeGridDay,timeGridWeek,dayGridMonth,multiMonthYear,listMonth"
						}}
						height="80vh"
						initialView="dayGridMonth"
						weekends={false}
						events={events}
						eventContent={renderEventContent}
						editable={true}
						selectable={true}
						selectMirror={true}
						select={handleDateClick}
						eventClick={handleEventClick}
					/>
				</div>
			</div>
			<ModalAddEvent 
				open={open}
				setOpen={setOpen}
				setOnSaveNewEvent={setOnSaveNewEvent}
				companies={companies}
				setNewEvent={setNewEvent}
			/>
		</div>
	)
}

function renderEventContent(eventInfo: EventContentArg) {
	return (
		<div className="bg-slate-200 dark:bg-background w-full p-1">
			<i>{eventInfo.event.title}</i>
		</div>
	)
}
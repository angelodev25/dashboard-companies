import type { CompanyType, Event } from "@/types/Company"
import type { Dispatch, SetStateAction } from "react"

export type CalendarProps = { 
	companies: CompanyType[],
	events: Event[],
	setOnSaveNewEvent: Dispatch<SetStateAction<boolean>>,
	onSaveNewEvent: boolean
}
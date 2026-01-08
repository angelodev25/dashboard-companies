import type { CompanyType, Event } from "@/types/Company"

export type CalendarProps = { 
	companies: CompanyType[],
	events: Event[]
}
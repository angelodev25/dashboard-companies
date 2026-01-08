import type { CompanyType, Event } from "@/types/Company"

export type CompaniesChartProps = {
	companies: CompanyType[],
	events: Event[]
}